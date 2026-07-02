import type { LearningTopic } from "../types";

export const toolNmap: LearningTopic = {
  slug: "nmap",
  kind: "tool",
  title: "Nmap",
  tagline: "The de-facto network mapper — port scanning, service detection, scripting.",
  difficulty: "Beginner",
  estimatedMinutes: 40,
  overview: `Nmap ("Network Mapper") is the most widely used port scanner in the world. Created by Gordon Lyon in 1997, it's the first tool every pentester learns and the last one they stop using. Modern Nmap does far more than scan ports: OS detection, version fingerprinting, and a 600+ script NSE (Nmap Scripting Engine) library.`,
  whyItMatters: `Nmap output feeds every later phase. Learning its flags fluently pays off in every engagement.`,
  realWorldScenario: `A one-line \`nmap -sV -sC -oA quick 10.0.0.5\` reveals an outdated OpenSSH, a Samba 4.7 (potentially null-session), and a WordPress on 80. Three attack paths from one command.`,
  objectives: [
    "Understand every common scan type flag",
    "Use timing templates responsibly",
    "Read and interpret every field of Nmap output",
    "Use NSE scripts effectively",
    "Save output in machine-readable formats",
  ],
  theory: `## Command anatomy

\`\`\`
nmap  [scan type]  [options]  [timing]  [output]  <target>
\`\`\`

## Scan types

| Flag | Name | Notes |
|------|------|-------|
| \`-sS\` | SYN half-open | Default when root, fast + stealthy |
| \`-sT\` | Connect | No root needed, noisier |
| \`-sU\` | UDP | Slow, essential for DNS/SNMP |
| \`-sn\` | Ping sweep | No port scan |
| \`-sV\` | Version | Banner grab + fingerprint |
| \`-sC\` | Default scripts | Safe NSE bundle |
| \`-A\` | Aggressive | -sV + OS + scripts + traceroute |

## Timing (0=paranoid → 5=insane)

Default: -T3. Modern network: -T4. Stealth: -T2. Never -T5 in prod.

## Output

- \`-oN file\` normal
- \`-oX file\` XML (great for parsers)
- \`-oG file\` grepable
- \`-oA base\` all three at once`,
  workflow: [
    "Discovery: `nmap -sn <net>`",
    "Fast port sweep: `nmap --top-ports 1000 -T4 <ip>`",
    "Full range: `nmap -sS -p- -T4 -oA full <ip>`",
    "Version + safe scripts on found ports",
    "Targeted UDP: `nmap -sU --top-ports 100 <ip>`",
    "Targeted NSE for anything interesting",
  ],
  commands: [
    { cmd: "nmap 10.0.0.5", desc: "Default scan (top 1000 TCP)" },
    { cmd: "nmap -sV -sC -p- 10.0.0.5", desc: "Full TCP, version + scripts" },
    { cmd: "nmap -sU --top-ports 50 10.0.0.5", desc: "Top 50 UDP" },
    { cmd: "nmap --script smb-vuln-* 10.0.0.5", desc: "Targeted NSE (SMB vulns)" },
    { cmd: "nmap -6 fe80::1%eth0", desc: "IPv6 scan" },
    { cmd: "nmap -Pn 10.0.0.5", desc: "Skip host discovery" },
    { cmd: "nmap -f -D RND:10 10.0.0.5", desc: "Fragment + decoys (obfuscation)" },
  ],
  toolsUsed: ["nmap", "ncat", "ndiff", "zenmap"],
  expectedOutput: {
    lang: "bash",
    code: `$ nmap -sV -sC -p 22,80,443 10.0.0.5
Nmap scan report for 10.0.0.5
Host is up (0.00023s latency).

PORT    STATE SERVICE  VERSION
22/tcp  open  ssh      OpenSSH 8.2p1 Ubuntu 4ubuntu0.5
| ssh-hostkey:
|   3072 aa:bb:...  (RSA)
80/tcp  open  http     Apache httpd 2.4.41
|_http-title: Welcome
443/tcp open  ssl/http nginx 1.18.0
| ssl-cert: Subject: commonName=example.local
|_Not valid after: 2025-01-15`,
  },
  commonMistakes: [
    "Forgetting `-Pn` when ICMP is blocked (host looks down but isn't)",
    "Running `-p-` at `-T4` on fragile networks and getting throttled",
    "Not saving output (`-oA`) and having to rerun",
    "Trusting `-A` output on load balancers",
  ],
  miniLab: {
    objective: "Fully map a scanme.nmap.org host.",
    steps: [
      "Run `nmap scanme.nmap.org` — note default behavior.",
      "Run `nmap -sV -sC scanme.nmap.org` and record versions.",
      "Run `nmap -p- -T4 scanme.nmap.org` — compare to top-1000.",
      "Save with `-oA scanme` and inspect the XML.",
    ],
    expected: "You know exactly what's exposed on the authorized Nmap test host.",
  },
  practiceQuestions: [
    "Why is SYN scan called 'half-open'?",
    "What does state 'filtered' vs 'closed' mean?",
    "When would you use -sT over -sS?",
    "What is NSE and how do you list scripts by category?",
  ],
  interviewQuestions: [
    "Explain Nmap's OS detection heuristics at a high level.",
    "How would you scan 1M IPs without melting your workstation?",
    "How do you scan through a jump host?",
    "How do you write a custom NSE script?",
  ],
  cheatsheet: [
    { cmd: "-sS / -sT / -sU", desc: "SYN / Connect / UDP" },
    { cmd: "-sn", desc: "Ping sweep" },
    { cmd: "-sV -sC", desc: "Version + default scripts" },
    { cmd: "-p-", desc: "All 65535 TCP" },
    { cmd: "-T4", desc: "Aggressive timing" },
    { cmd: "-Pn", desc: "Skip host discovery" },
    { cmd: "-oA base", desc: "Save all output formats" },
    { cmd: "--script <name>", desc: "Run specific NSE script" },
  ],
  references: [
    { label: "Nmap Book (free)", url: "https://nmap.org/book/" },
    { label: "NSE index", url: "https://nmap.org/nsedoc/" },
  ],
  summary: `Nmap rewards learning its flags. Master a dozen and you'll outperform tools ten times its size.`,
};
