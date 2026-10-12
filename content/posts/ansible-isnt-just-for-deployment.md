---
title: "Ansible isn't just for deployment"
date: 2025-08-30
summary: "What benchmarking Snort3 at ARM taught me about Ansible, and the small tool I built afterwards."
tags: [ansible, benchmarking, performance]
---

This summer at ARM a lot of my time went into benchmarking Snort3 (the intrusion detection engine) across different CPU architectures. ARM64 boxes, x86 boxes, a few generations of each. The actual benchmark was the easy part. The annoying part was everything around it.

Every machine had to be set up the same way. Same build of Snort, same rules, same input traffic, same compiler flags. Then you run it, run it again, run it a few more times because one run means nothing, collect the output from every box, and line it all up. Do that by hand across a handful of machines and you make mistakes. Somebody forgets to set the CPU governor on one box, and now that box looks slower and nobody knows why.

We used Ansible for this, and that's when it clicked for me. I'd only ever thought of Ansible as a deployment tool: push config, install packages, restart services. But a benchmark run is just a very specific kind of deployment. Get this exact code onto these machines, put them in this exact state, run this, bring the results back. Ansible is already good at all of that, and it gives you the same steps on every machine for free.

## So I built a small version for myself

After the internship I wanted the same setup for my own projects, without any of the work-specific stuff. So I wrote [ansibench](https://github.com/shreshth28/ansibench). The idea is that you describe a benchmark once in a YAML file:

```yaml
name: sorter
hosts: gpu
source:
  repo: https://github.com/me/sorter
variants:
  baseline: {build: make baseline, run: './bin/baseline {{ size }}'}
  simd:     {build: make simd,     run: './bin/simd {{ size }}'}
matrix:
  size: [1000000, 10000000]
metrics:
  throughput: 'items_per_s=([0-9.]+)'
repeat: 10
warmup: 2
```

and it handles the rest: clone the repo on the target, build every variant, run every variant at every size with warmups and repeats, and pull the results back as a CSV and a summary table. For a one-off there's `ansibench exec`, which is just "clone this, build it, time this command, ten times".

A few things I cared about, mostly because of stuff that bit me before.

**Time on the target, not over ssh.** A small Python runner gets copied to the box and does the actual timing with `wait4`, so you get wall time, user/sys time and peak memory for exactly that process. SSH latency never ends up in the numbers.

**Record what the machine looked like.** Every run saves a snapshot: CPU model, kernel, governor, turbo and SMT state, compiler versions, GPU and driver. Half the "why is this number different" questions get answered by diffing two of those.

**Put the machine in a known state, then put it back.** You can ask for the performance governor, turbo off, SMT off, pinned cores, dropped caches, locked GPU clocks. All of it gets recorded before the run and restored after, in an Ansible `always` block, so it happens even if the benchmark crashes. Leaving a shared box with turbo turned off is a great way to make enemies.

**Tell me when the numbers are noise.** If runs vary by more than 5% the summary flags it. Usually that means not enough repeats, or something else running on the box.

**Skip what the box can't do.** A VM has no cpufreq, a laptop might not let you lock GPU clocks. Those get skipped and listed in the summary instead of failing the whole run.

## Testing it without a lab

I don't have a rack of machines at home, so the tests run against a Docker container with sshd in it. Every test goes through real Ansible over real SSH. The machine-tuning parts can't really be tested in a container (no cpufreq), so those run against a fake `/sys` tree and a fake `nvidia-smi` that just logs what it was asked to do. The test I like most crashes the benchmark on purpose halfway through and then checks that the box got put back anyway.
