import type { LearningTopic } from "../types";

export const phaseScanning: LearningTopic = {
  slug: "scanning",
  kind: "phase",
  title: "Scanning",
  tagline: "Actively probe the target to discover live hosts, ports, and services.",
  difficulty: "Beginner",
  estimatedMinutes: 50,
  order: 2,
  next: { slug: "enumeration", title: "Enumeration", kind: "phase" },
  overview: `Scanning is the first *active* phase. You interact with the target directly to discover which hosts are up, which ports are open, and which services are listening. The goal is a map of the attack surface — accurate, complete, and defensible.`,
  whyItMatters: `Every exploit needs an entry point. Scanning finds those entry points. Sloppy scanning misses ports (missed findings), or generates so much noise it gets blocked (failed engagement). Doing this well is a core skill.`,
  realWorldScenario: `Recon gave you 42 subdomains and a /24 netblock. Scanning tells you 8 hosts are alive, one runs an ancient JBoss on 8080, another exposes SMB on 445, and a third has SSH on a non-standard port 2222 with an outdated OpenSSH banner. Three attack paths — none visible before the scan.`,
  objectives: [
    "Distinguish host discovery from port scanning from service scanning",
    "Use TCP SYN, TCP Connect, and UDP scans appropriately",
    "Detect service versions and OS with confidence",
    "Tune timing and stealth to avoid detection or firewall blocks",
    "Interpret and record scan output for the enumeration phase",
  ],
  theory: `## The three scanning layers

1. **Host discovery** — is the box alive? ICMP echo, TCP SYN to common ports, ARP on local network.
2. **Port scanning** — which TCP/UDP ports are open? SYN scan (-sS), Connect scan (-sT), UDP scan (-sU).
3. **Service & version detection** — what software is listening? Banner grabbing (-sV), NSE scripts (-sC).

## Scan types

| Type | Flag | Behavior |
|------|------|----------|
| SYN "half-open" | \`-sS\` | Fast, stealthy, needs root |
| TCP connect | \`-sT\` | Completes handshake, no root needed |
| UDP | \`-sU\` | Slow, unreliable, but critical for DNS/SNMP/NTP |
| Version | \`-sV\` | Grabs banners, fingerprints services |
| Scripts | \`-sC\` | Runs default NSE scripts (safe) |
| Aggressive | \`-A\` | Version + OS + scripts + traceroute |

## Timing templates

\`-T0\` paranoid → \`-T5\` insane. Default \`-T3\`. Use \`-T4\` on modern networks; drop to \`-T2\` for stealth engagements.`,
  workflow: [
    "Load target list from recon phase",
    "Host discovery pass (`nmap -sn` or `fping -a`)",
    "Fast top-1000 TCP scan on live hosts",
    "Full 65535 TCP SYN scan on high-value hosts",
    "Targeted UDP scan for DNS/SNMP/NTP/DHCP",
    "Service/version detection + safe NSE scripts",
    "OS detection where allowed",
    "Save output in `-oA` format for later phases",
  ],
  commands: [
    { cmd: "nmap -sn 10.0.0.0/24", desc: "Host discovery (no port scan)" },
    { cmd: "nmap --top-ports 1000 -T4 10.0.0.5", desc: "Fast top-1000 TCP" },
    { cmd: "nmap -sS -p- -T4 10.0.0.5 -oA fullscan", desc: "Full TCP SYN scan, save all formats" },
    { cmd: "nmap -sU --top-ports 100 10.0.0.5", desc: "Top 100 UDP" },
    { cmd: "nmap -sV -sC -p 22,80,443 10.0.0.5", desc: "Version + default scripts on selected ports" },
    { cmd: "nmap -A -T4 10.0.0.5", desc: "Aggressive: version + OS + scripts + traceroute" },
    { cmd: "masscan -p1-65535 10.0.0.0/24 --rate=1000", desc: "Very fast full range with masscan" },
    { cmd: "rustscan -a 10.0.0.5 -- -sV -sC", desc: "Rustscan feeds ports into nmap" },
  ],
  toolsUsed: ["nmap", "masscan", "rustscan", "fping", "unicornscan", "hping3"],
  expectedOutput: {
    lang: "bash",
    code: `$ nmap -sV -p 22,80,445 10.0.0.5
PORT    STATE SERVICE     VERSION
22/tcp  open  ssh         OpenSSH 7.4 (protocol 2.0)
80/tcp  open  http        Apache httpd 2.4.29 ((Ubuntu))
445/tcp open  netbios-ssn Samba smbd 4.7.6-Ubuntu`,
  },
  commonMistakes: [
    "Only scanning top 1000 ports and missing services on high ports",
    "Skipping UDP entirely — DNS, SNMP, NTP live there",
    "Using -T5 on production and getting IPS-blocked",
    "Not saving output — you *will* need it in enumeration",
    "Trusting the first result; scan twice on flaky networks",
  ],
  miniLab: {
    objective: "Fully map a single target using layered scanning.",
    steps: [
      "Start with `nmap -sn <target>` to confirm the host is up.",
      "Run `nmap --top-ports 100 -T4 <target>` and note open ports.",
      "Run `nmap -p- -T4 <target>` and compare with the top-100 result.",
      "Add `-sV -sC` to your final port list.",
      "Document each open port with service, version, and any script findings.",
    ],
    expected: "A complete port/service inventory ready for enumeration.",
  },
  practiceQuestions: [
    "When would you choose `-sT` over `-sS`?",
    "Why is UDP scanning so much slower than TCP?",
    "What does `-Pn` do and when is it necessary?",
    "How does a SYN scan avoid completing the TCP handshake?",
    "What does the state `filtered` mean in Nmap output?",
  ],
  interviewQuestions: [
    "Explain the difference between SYN and Connect scans at the packet level.",
    "How would you scan 65535 ports on a /16 without getting throttled?",
    "How do you detect a load balancer during scanning?",
    "What NSE scripts do you run by default and why?",
    "How do you scan through a SOCKS proxy?",
  ],
  cheatsheet: [
    { cmd: "nmap -sn <net>", desc: "Host discovery only" },
    { cmd: "nmap -sS -p- -T4 <ip>", desc: "Full TCP SYN" },
    { cmd: "nmap -sU --top-ports 100 <ip>", desc: "Top 100 UDP" },
    { cmd: "nmap -sV -sC -oA out <ip>", desc: "Version + scripts + all outputs" },
    { cmd: "nmap -A <ip>", desc: "Aggressive one-shot" },
    { cmd: "masscan -p1-65535 <net> --rate 1000", desc: "Ultra-fast sweep" },
    { cmd: "rustscan -a <ip>", desc: "Rustscan then pipe to nmap" },
  ],
  references: [
    { label: "Nmap reference", url: "https://nmap.org/book/" },
    { label: "Masscan", url: "https://github.com/robertdavidgraham/masscan" },
    { label: "RustScan", url: "https://github.com/RustScan/RustScan" },
  ],
  summary: `Scanning is the transition from passive intelligence to active mapping. Layer your scans, save your output, and never trust a single pass.`,
  callouts: [
    { type: "warning", title: "Only scan what you own or are authorized to test", body: "Port scanning without permission is illegal in most jurisdictions." },
  ],
};
