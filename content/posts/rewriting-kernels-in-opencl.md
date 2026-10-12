---
title: "Rewriting my CUDA kernels in OpenCL"
date: 2026-07-18
summary: "Porting vecadd, reduce, transpose and matmul from CUDA to OpenCL: what maps over one to one, and what doesn't."
tags: [opencl, cuda, gpu, benchmarking]
---

CUDA only runs on NVIDIA. OpenCL runs on pretty much anything: NVIDIA, AMD, Intel GPUs, even CPUs. I wanted to know two things. How much of what I learned writing [my CUDA kernels](https://github.com/shreshth28/cuda-perf-lab) carries over, and what do you give up for the portability? So I rewrote the same programs in OpenCL. They're in [cuda-perf-lab](https://github.com/shreshth28/cuda-perf-lab) under `opencl/`, with the same args and the same output line as the CUDA ones.

## Most of it is renaming

The execution model is the same idea with different words:

| CUDA | OpenCL |
|---|---|
| thread | work-item |
| block | work-group |
| grid | NDRange |
| `threadIdx.x` | `get_local_id(0)` |
| `blockIdx.x` | `get_group_id(0)` |
| `blockIdx.x * blockDim.x + threadIdx.x` | `get_global_id(0)` |
| `__shared__` | `__local` |
| `__syncthreads()` | `barrier(CLK_LOCAL_MEM_FENCE)` |

So the kernels themselves mostly ported line by line. The 2D register-blocked matmul, the most fiddly one, kept exactly the same index math. Same 128x128 tile per work-group, same 8x8 per work-item.

## The host side is where it gets verbose

CUDA lets you write `kernel<<<grid, block>>>(args)` right in your C++. OpenCL doesn't. You pick a platform and a device, make a context and a command queue, compile the kernel **at runtime** from a string, look the kernel up by name, set every argument one at a time with `clSetKernelArg`, and then enqueue it. I ended up with a small `cl_common.h` that hides most of that, plus a variadic `set_args(k, a, b, c, n)` so I'd stop getting argument indices wrong.

Compiling at runtime has one nasty side effect: a typo in a kernel isn't a compile error anymore, it's `clBuildProgram` returning an error code at runtime. You have to ask for the build log yourself to see what went wrong, so the helper does that now.

## Timing

Same rule as with CUDA: don't time the process, time the kernel. OpenCL's version of CUDA events is profiling events. You create the queue with `CL_QUEUE_PROFILING_ENABLE` and every enqueue gives you an event with GPU-side start and end timestamps. For kernels that run in two passes I time from the start of the first to the end of the last.

The output line is identical to the CUDA programs, so the `cl_` versions just went into the existing [ansibench](https://github.com/shreshth28/ansibench) specs as more variants:

```yaml
variants:
  tiled:    './bin/matmul --kernel tiled --n {{ n }}'
  reg2d:    './bin/matmul --kernel reg2d --n {{ n }}'
  cublas:   './bin/matmul --kernel cublas --n {{ n }}'
  cl_tiled: {build: make bin/cl_matmul, run: './bin/cl_matmul --kernel tiled --n {{ n }}'}
  cl_reg2d: {build: make bin/cl_matmul, run: './bin/cl_matmul --kernel reg2d --n {{ n }}'}
```

One run, CUDA vs OpenCL vs cuBLAS in the same table.

## What didn't port

**No float atomics.** My CUDA reductions finish with `atomicAdd` on a float: every block adds its partial sum into one result. OpenCL 1.2 has no float atomics. So the OpenCL reduce runs in two passes: each work-group writes its partial sum to a buffer, then a second tiny kernel with one work-group adds those up.

**No warp shuffles.** The fastest CUDA reduce uses `__shfl_down_sync`, which is NVIDIA-specific. OpenCL has sub-groups, but support is all over the place, so I left that version out. The OpenCL reduce is the shared-memory tree plus the "each work-item sums a long stretch first" version.

**No cuBLAS.** Nothing to compare against on the OpenCL side, so the cuBLAS numbers from the CUDA build stay the baseline for both.

What ported *nicer* than CUDA: `float4` is a real vector type in OpenCL C, so `c[i] = a[i] + b[i]` just works on `float4`s without writing out `.x .y .z .w` by hand.

## Testing without the GPU

A nice thing about OpenCL running everywhere: I could check correctness on my Mac using [PoCL](http://portablecl.org), an OpenCL implementation that runs on the CPU, inside Docker. Every OpenCL kernel matched the CPU reference there before it ever touched the GPU. The timings from that are meaningless, but the correctness carries over.

## So, was it worth it?

The kernel code was the easy part, the concepts map almost one to one. The cost of OpenCL is all on the host side, plus losing the NVIDIA-specific tools (shuffles, cuBLAS, a decent profiler) that you only notice once they're gone.
