---
# Copy this file to content/posts/<your-slug>.md — the filename becomes the URL (/blog/<your-slug>).
# Files starting with "_" are ignored.
title: "One-line title of the thing you learned"
date: 2026-10-11
summary: "A sentence shown in the blog list and RSS feed."
tags: [kernel, kvm]
draft: true   # visible in `npm run dev`, hidden on the live site. Delete this line to publish.
---

Lead with the takeaway in a sentence or two.

## Context

What were you doing when you ran into this?

## The interesting bit

Code blocks get syntax highlighting. Add a language after the backticks:

```c
static inline u64 native_read_msr(u32 msr)
{
	u32 low, high;

	asm volatile("rdmsr" : "=a" (low), "=d" (high) : "c" (msr));
	return ((u64)high << 32) | low;
}
```

```bash
perf stat -e cycles,instructions,cache-misses ./bench
```

Tables, `inline code`, **bold**, > quotes and [links](https://kernel.org) all work.
