// src/lib/resume.ts
// Source of truth for the /resume page and the home page "Work" list.
// Keep in sync with public/resume.pdf.

export type Role = {
  title: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
};

export type Education = {
  school: string;
  degree: string;
  period: string;
  detail?: string;
  coursework: string;
};

export type ResumeProject = {
  name: string;
  stack: string;
  bullets: string[];
};

export const about =
  "Linux Kernel Developer at Intel, contributing to the Linux x86 subsystem (MSR interfaces, KVM/nested virtualization, FRED). Background spans Android platform software at Qualcomm and CPU/GPU performance engineering (ARM internship, CUDA kernel optimization).";

export const experience: Role[] = [
  {
    title: "Linux Kernel Developer",
    company: "Intel",
    location: "Hillsboro, OR",
    period: "Jul 2026 – Present",
    bullets: [
      "Designed and built a three-level nested-KVM (L0→L1→L2) validation stack for Intel FRED (Flexible Return and Event Delivery), including a custom FRED-enabled kernel and QEMU; used ftrace to confirm correct FRED event-delivery behavior across all three virtualization layers.",
      "Took over a stalled x86 MSR header-consolidation series and delivered a v3, 5-patch revision submitted for upstream review, resolving naming objections raised by three separate reviewers.",
      "Root-caused an x86 NMI-source reporting bug by building a custom virtualization test environment and authoring a kernel selftest series to isolate and reproduce the failure.",
      "Contributed x86 kernel documentation fixes upstream, and independently verified correctness of an MSR interface series through binary-level regression analysis across the kernel build.",
    ],
  },
  {
    title: "Network/ML Performance Engineer (Intern)",
    company: "ARM",
    location: "Austin, TX",
    period: "May 2025 – Aug 2025",
    bullets: [
      "Profiled compute workloads using Linux perf and hardware performance counters (IPC/CPI, LLC misses, branch mispredictions, TLB pressure) to diagnose CPU microarchitecture behavior including pipeline stalls, cache contention, and memory bandwidth saturation across ARM64 and x86 platforms.",
      "Evaluated compiler auto-vectorization (ARM NEON / x86 AVX), -O3/-march=native build flags, and thread affinity to optimize parallel execution on multi-core systems; improved compute throughput by 15% and packet processing by 12%.",
      "Built distributed benchmarking infrastructure using Python, Terraform, and Ansible to deploy and validate compute-intensive workloads across heterogeneous ARM64 and x86 platforms, enabling reproducible regression and performance testing.",
      "Benchmarked across NVIDIA Ampere Altra, Intel Xeon, AMD EPYC, and ARM Neoverse; analyzed per-platform memory bandwidth, pipeline efficiency, and microarchitecture behavior to guide architecture-specific optimization.",
    ],
  },
  {
    title: "Software Engineer",
    company: "Qualcomm",
    location: "India",
    period: "Jul 2022 – Aug 2024",
    bullets: [
      "Cross-compiled and ported performance-critical C++ applications (OBS Studio, Chromium, GIMP) from x86 to ARM64 for Snapdragon targets, adapting build toolchains (Clang/GCC, CMake); tuned compiler flags reducing CPU utilization by 10–15%.",
      "Built Android and C# reference applications for Qualcomm Enterprise SDK (QESDK) APIs (Precise Positioning, CPU/GPU Boost, Low Latency Mode); debugged underlying Android/Linux services QESDK depends on (e.g., modem service) to support Low Latency Mode. Served as official integration reference for OEM partners including Meta, Microsoft, Vivo, and Xiaomi.",
      "Built a proof-of-concept peer-to-peer file-sharing application on Qualcomm’s Distributed Context Fabric (DCF) for proximity-based device discovery; evaluated signal response time and detection latency for newly discovered devices.",
    ],
  },
  {
    title: "Solution Delivery Analyst",
    company: "Deloitte",
    location: "India",
    period: "Jul 2021 – May 2022",
    bullets: [
      "Built a Java/Shell server monitoring and automation framework for remote diagnostics across 80+ production Linux servers.",
      "Tuned JVM configurations (garbage collection, heap sizing) to reduce service response times, validating improvements via AppDynamics; reduced latency by 50%.",
      "Migrated on-premises applications to AWS.",
      "Resolved user authentication issues integrating PingID, SAML, and OAuth across enterprise applications.",
    ],
  },
];

export const education: Education[] = [
  {
    school: "University of Colorado Boulder",
    degree: "M.S. in Computer Science",
    period: "Aug 2024 – Apr 2026",
    detail: "GTA: Principles of Programming Languages (CSCI 3155)",
    coursework:
      "Computer Graphics, Design & Analysis of Algorithms, Network Systems, Neural Networks, Foundations of Software Engineering",
  },
  {
    school: "Vellore Institute of Technology (VIT), India",
    degree: "B.Tech in Electronics and Communication Engineering",
    period: "Jun 2017 – Jun 2021",
    detail: "GPA: 8.58/10",
    coursework:
      "Data Structures & Algorithms, Operating Systems, Digital Logic Design, Microprocessors & Embedded Systems, Network Security",
  },
];

export const projects: ResumeProject[] = [
  {
    name: "CUDA GPU Kernel Performance Lab",
    stack: "CUDA C, C++, RTX 3070 Ti, Nsight Compute",
    bullets: [
      "Implemented and benchmarked CUDA matrix multiplication kernels on an RTX 3070 Ti: naive global memory baseline, shared memory tiling, register-level optimization, and loop unrolling; measured throughput gains at each stage against a cuBLAS baseline.",
      "Profiled kernels with Nsight Compute (SM occupancy, warp scheduling, memory coalescing, shared memory bank conflicts, L1/L2 hit rates) and roofline analysis to locate and fix memory-bound bottlenecks.",
    ],
  },
  {
    name: "Encrypted Packet Filtering with eBPF",
    stack: "C, Linux Kernel, XDP/TC",
    bullets: [
      "Implemented XDP/TC-based eBPF programs that encrypt outgoing packet payloads in-kernel and decrypt them on ingress between two machines on the same LAN, so a passive observer running tcpdump on the shared network segment cannot recover the plaintext traffic.",
      "Built C++ user-space utilities to load the eBPF programs, manage keys, and retrieve telemetry via BPF maps; profiled kernel-space vs. user-space filtering/encryption overhead.",
    ],
  },
];

export const skills: { group: string; items: string }[] = [
  { group: "Languages", items: "C, C++17/20, CUDA C, Python, Bash, Rust, Java" },
  {
    group: "GPU & Parallel",
    items:
      "CUDA Programming Model, Thread/Block/Grid Hierarchy, Shared Memory, Memory Coalescing, Warp Scheduling, Nsight Compute, cuBLAS",
  },
  {
    group: "Kernel & OS",
    items:
      "Linux Kernel Development, KVM/Nested Virtualization, FRED, Xen, Kernel Debugging (GDB/kgdb/ftrace), Virtual Memory, Process Scheduling",
  },
  {
    group: "Performance",
    items:
      "Linux perf, Hardware Performance Counters (IPC/CPI, LLC, TLB, NUMA), Microbenchmarking, SIMD (AVX/NEON), Compiler Optimization (-O2/-O3/-march), Roofline Model Analysis",
  },
  { group: "Architecture", items: "ARM64 (Snapdragon/Neoverse), x86 (Intel Xeon), GPU Architecture" },
  { group: "Tooling", items: "GDB, CMake, Git, QEMU, Terraform, Ansible, Docker" },
];
