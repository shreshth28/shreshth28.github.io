---
title: "Understanding CUDA, and finding LeetGPU"
date: 2026-03-02
summary: "The mental model that finally made CUDA make sense to me, and the site I used to practice it."
tags: [cuda, gpu]
---

I've spent a lot of time making CPU code fast, mostly staring at `perf` output. GPUs always felt like a different world. This semester I finally sat down and learned CUDA properly, and it turned out most of it comes down to a handful of ideas. This is the version I wish someone had given me on day one.

## You write one thread, the GPU runs thousands

A CUDA kernel is a function that runs once per thread. You don't write the loop, you write the body of the loop and say how many copies to launch:

```cpp
__global__ void add(const float *a, const float *b, float *c, long n)
{
	long i = blockIdx.x * (long)blockDim.x + threadIdx.x;
	if (i < n)
		c[i] = a[i] + b[i];
}

add<<<(n + 255) / 256, 256>>>(a, b, c, n);
```

Threads are grouped into **blocks** (here 256 threads each), and blocks make up the **grid**. Each thread works out which element is its own from its block and thread index. The `if (i < n)` is there because the last block usually runs past the end of the array.

## Warps are the real unit

The hardware doesn't actually run threads one at a time. It runs them in groups of 32 called **warps**, all doing the same instruction at the same time. Two things follow from that:

- If threads in a warp take different sides of an `if`, the warp runs both sides one after the other, with half the threads switched off each time. That's **divergence**, and it's why branchy GPU code is slow.
- When the 32 threads of a warp read memory, the hardware tries to combine them into as few transactions as possible. If thread 0 reads `x[0]`, thread 1 reads `x[1]` and so on, that's one nice wide read. If they read `x[0]`, `x[1024]`, `x[2048]`..., it's 32 separate ones. That's **coalescing**, and it ends up mattering more than almost anything else.

## The memory hierarchy is the whole game

Roughly from fastest to slowest:

| what | who can see it | notes |
|---|---|---|
| registers | one thread | where you want your hot values |
| shared memory | one block | small, fast, you manage it by hand |
| L2 cache | everyone | |
| global memory | everyone | big and slow, what `cudaMalloc` gives you |

Most GPU optimization I've seen so far is some version of "stop going to global memory so often": load a tile into shared memory once and let the whole block reuse it, or keep partial results in registers instead of writing them out.

## Kernel launches are asynchronous

`add<<<...>>>(...)` returns right away. The CPU just queued work. So if you time a kernel with a normal CPU timer you mostly measure how long it took to queue it. You either sync first, or (better) use **CUDA events**, which get timestamped on the GPU itself:

```cpp
cudaEventRecord(start);
add<<<grid, 256>>>(a, b, c, n);
cudaEventRecord(stop);
cudaEventSynchronize(stop);
cudaEventElapsedTime(&ms, start, stop);
```

That one will come back to bite me later, I'm sure.

## LeetGPU

Reading about this stuff only got me so far. What helped was [LeetGPU](https://leetgpu.com), which is basically LeetCode for GPU programming. You get a problem (vector add, reductions, matrix multiply, softmax and so on), write the kernel in the browser, and it runs on a real GPU and tells you if you got it right. No GPU needed on your side, no driver setup.

It's a good way to get the indexing into your fingers. Most of the early bugs are an off-by-something in `blockIdx * blockDim + threadIdx`, or a missing bounds check that only shows up when `n` isn't a multiple of the block size.
