// src/lib/projects.ts
export type Company = "Arm" | "Qualcomm" | "Deloitte" | "Personal";

export type Project = {
  company: Company;
  slug: string;
  title: string;
  valueLine: string; // one-liner (no placeholders)
  bullets: string[]; // Problem / Approach / Result (optional to display)
  tags: string[];
  links?: { code?: string; demo?: string };
};

/**
 * Projects pulled from your resume + work experience (no placeholder numbers).
 * You can reorder items for priority; slugs power the /projects/[slug] pages.
 */
export const projects: Project[] = [
  // ───────────────────────── ARM ─────────────────────────
  {
    company: "Arm",
    slug: "arm-snortml-integration-benchmarking",
    title: "SnortML Integration for Snort3 Benchmarking",
    valueLine:
      "Integrated SnortML into Arm’s Snort3 benchmarking pipeline across ARM64/x86 to enable ML-based IDS evaluation.",
    bullets: [
      "Problem: ML-based IDS comparisons across platforms lacked consistency.",
      "Approach: Integrated SnortML into Snort3 pipelines and CI flows.",
      "Result: Reproducible, comparable ML IDS evaluations on ARM64/x86.",
    ],
    tags: ["arm64", "ml", "ids", "snort3", "infra"],
  },
  {
    company: "Arm",
    slug: "arm-snortml-build-ansible-pcap-benchmarking",
    title: "SnortML Build & Dynamic Benchmarking (Ansible + PCAP)",
    valueLine:
      "Extended Ansible roles for SnortML builds, custom rule injection, and dynamic benchmarking with PCAP inputs.",
    bullets: [
      "Problem: Manual ML plugin builds and rule management slowed testing.",
      "Approach: Automated Ansible roles; parameterized rules and PCAP inputs.",
      "Result: One-command builds and dynamic benchmarks for ML IDS.",
    ],
    tags: ["ansible", "pcap", "ml", "ids", "automation"],
  },
  {
    company: "Arm",
    slug: "arm-http-intrusion-classifiers-pytorch",
    title: "HTTP Intrusion Classifiers (PyTorch)",
    valueLine:
      "Developed PyTorch classifiers for HTTP intrusion detection, reducing reliance on handcrafted rules with multi-class models.",
    bullets: [
      "Problem: Rule-based detection lacked generalization.",
      "Approach: Trained PyTorch multi-class classifiers on HTTP datasets.",
      "Result: ML-first evaluations alongside traditional rules.",
    ],
    tags: ["pytorch", "ml", "ids", "http"],
  },

  // ─────────────────────── QUALCOMM ───────────────────────
  {
    company: "Qualcomm",
    slug: "qualcomm-gnss-accuracy-edgnss-rtk",
    title: "GNSS Accuracy (EDGNSS/RTK)",
    valueLine:
      "Enhanced GPS accuracy using EDGNSS and RTK, improving precision tenfold.",
    bullets: [
      "Problem: Inconsistent high-precision GNSS behavior.",
      "Approach: Evaluated EDGNSS/RTK; added diagnostics and perf logging.",
      "Result: Demonstrated 10× precision improvement in field conditions.",
    ],
    tags: ["gnss", "android", "rtk", "edgnss"],
  },
  {
    company: "Qualcomm",
    slug: "qualcomm-android-sdk-showcase-apps",
    title: "Android SDK Showcase Apps",
    valueLine:
      "Built sample Android apps showcasing Snapdragon SDK features used by vendors/OEMs (Meta, Microsoft, Vivo, Xiaomi).",
    bullets: [
      "Problem: Need reference apps for vendor integrations.",
      "Approach: Authored Kotlin/Java samples for Snapdragon SDK features.",
      "Result: Reusable showcases for OEMs and partners.",
    ],
    tags: ["android", "kotlin", "java", "snapdragon"],
  },
  {
    company: "Qualcomm",
    slug: "qualcomm-x86-to-arm64-porting",
    title: "x86 → ARM64 Porting (OBS, Chromium, GIMP)",
    valueLine:
      "Ported major applications from x86 to ARM64 for Snapdragon platforms, optimizing performance and compatibility.",
    bullets: [
      "Problem: x86 builds suffered emulation overhead on ARM.",
      "Approach: Toolchain updates and ARM64-native fixes.",
      "Result: Native ARM64 builds with improved throughput.",
    ],
    tags: ["arm64", "porting", "toolchain"],
  },
  {
    company: "Qualcomm",
    slug: "qualcomm-ble-dcf-firebase-tracking",
    title: "BLE + Distributed Context Fabric (DCF)",
    valueLine:
      "Enhanced BLE protocols with DCF + Firebase for low-latency accessory tracking at ~1% battery impact.",
    bullets: [
      "Problem: Accessory tracking required low-latency with minimal power draw.",
      "Approach: BLE + DCF integration; cloud sync via Firebase.",
      "Result: Real-time tracking with ~1% battery impact.",
    ],
    tags: ["ble", "dcf", "firebase", "android"],
  },
  {
    company: "Qualcomm",
    slug: "qualcomm-aosp-customizations",
    title: "AOSP Customizations",
    valueLine:
      "Customized AOSP builds by integrating cherry-picked features for different hardware platforms and use cases.",
    bullets: [
      "Problem: Platform-specific needs across devices.",
      "Approach: Cherry-picked patches and feature gating for AOSP.",
      "Result: Tailored AOSP builds per hardware target.",
    ],
    tags: ["aosp", "android", "customization"],
  },

  // ─────────────────────── DELOITTE ───────────────────────
  {
    company: "Deloitte",
    slug: "deloitte-server-diagnostics-automation",
    title: "Server Diagnostics Automation (JSch, CyberArk, Shell)",
    valueLine:
      "Built an automation framework for secure remote server checks; improved monitoring efficiency by 11%.",
    bullets: [
      "Problem: Manual server checks and access flows slowed ops.",
      "Approach: JSch + CyberArk with shell scripts for checks.",
      "Result: Monitoring efficiency improved by 11%.",
    ],
    tags: ["automation", "security", "jsch", "cyberark", "linux"],
  },
  {
    company: "Deloitte",
    slug: "deloitte-cloud-migration-sso",
    title: "Cloud Migration + SSO (AWS, SAML 2.0, OAuth 2.0)",
    valueLine:
      "Migrated on-prem applications to AWS with SAML/OAuth; reduced costs and improved scalability.",
    bullets: [
      "Problem: On-prem maintenance overhead and fragmented auth.",
      "Approach: AWS lift-and-shift plus SAML/OAuth federation.",
      "Result: Better scalability and lower operating costs.",
    ],
    tags: ["aws", "saml", "oauth2", "sso", "cloud"],
  },
  {
    company: "Deloitte",
    slug: "deloitte-jvm-tuning-load-balancing",
    title: "JVM Tuning & Load Balancing",
    valueLine:
      "Optimized JVM and implemented load balancing, improving server response times by ~50% (AppDynamics).",
    bullets: [
      "Problem: Slow response times under load.",
      "Approach: JVM tuning and load balancer configuration.",
      "Result: ~50% faster response times (AppDynamics).",
    ],
    tags: ["jvm", "performance", "load-balancing"],
  },

  // ─────────────────────── PERSONAL ───────────────────────
  {
    company: "Personal",
    slug: "ebpf-kernel-encryption-service",
    title: "eBPF Kernel-Level Encryption Service",
    valueLine:
      "Implemented an in-kernel encryption service using eBPF; secure data path with minimal overhead and improved throughput on ARM64.",
    bullets: [
      "Problem: User-space encryption added context-switch latency and copies.",
      "Approach: eBPF hooks for in-kernel crypto; ring-buffer IPC to userspace.",
      "Result: Encrypted data path with negligible overhead on ARM64.",
    ],
    tags: ["ebpf", "kernel", "encryption", "security", "cpp"],
  },
  {
    company: "Personal",
    slug: "opengl-water-particle-sim",
    title: "3D OpenGL Simulation",
    valueLine:
      "Realistic water rendering (Fresnel, normal mapping) with a CPU-based particle system.",
    bullets: [
      "Problem: Convincing water on constrained hardware.",
      "Approach: Fresnel term + normal mapping; tuned particle loop.",
      "Result: Stable visuals and predictable frame times.",
    ],
    tags: ["opengl", "graphics", "cpp"],
  },
  {
    company: "Personal",
    slug: "design-patterns-benchmarking-java",
    title: "Design Patterns Benchmarking (Java)",
    valueLine:
      "Online quiz system analyzing the performance impact of various design patterns with benchmarking.",
    bullets: [
      "Problem: Pattern choices affected runtime behavior.",
      "Approach: Implemented variants and benchmarked impact.",
      "Result: Clear trade-offs documented by pattern.",
    ],
    tags: ["java", "benchmarks", "design-patterns"],
  },
  {
    company: "Personal",
    slug: "cova-android-app",
    title: "Cova App (Android)",
    valueLine:
      "Android app for real-time COVID-19 news (Newscatcher/NewsData), chat room, notifications; MVVM with ROOM.",
    bullets: [
      "Problem: Need consolidated COVID-19 info & community features.",
      "Approach: MVVM + Room with news aggregation and chat.",
      "Result: Real-time updates with in-app social features.",
    ],
    tags: ["android", "mvvm", "room"],
  },
];