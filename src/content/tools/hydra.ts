import type { LearningTopic } from "../types";

export const toolHydra: LearningTopic = {
  slug: "hydra",
  kind: "tool",
  title: "Hydra",
  tagline: "Fast, protocol-aware online password brute forcer.",
  difficulty: "Intermediate",
  estimatedMinutes: 25,
  overview: `THC-Hydra is a parallelized online password cracker supporting 50+ protocols (SSH, FTP, HTTP, RDP, SMB, MySQL, and more). "Online" means it hammers the live service — different from Hashcat/John which crack captured hashes offline.`,
  whyItMatters: `Weak credentials remain the #1 root cause of breach. Online cracking is banned on production without explicit auth, but essential in labs, red-team engagements, and post-breach password audits.`,
  realWorldScenario: `A CTF box exposes SSH. You have a username list from enum4linux. Hydra with the SecLists rockyou.txt (short) finds \`svc-backup : Winter2024!\` in seven minutes.`,
  objectives: [
    "Understand the difference between online and offline cracking",
    "Build focused username and password lists",
    "Tune concurrency without triggering lockouts",
    "Recognize when Hydra will and will not work",
  ],
  theory: `## Online vs offline

- **Online (Hydra)** — send live login attempts. Detectable, rate-limited, locks accounts.
- **Offline (Hashcat, John)** — crack a captured hash without touching the server. Faster, undetectable to the target.

## Attack shape

\`hydra -L users.txt -P passwords.txt <service>://<host>\`

Common services: ssh, ftp, rdp, smb, mysql, http-post-form, http-get.

## HTTP form attack

The tricky one — you must specify the request template with markers for username/password and a failure string.

\`hydra -L u.txt -P p.txt target http-post-form "/login:user=^USER^&pass=^PASS^:F=Invalid credentials"\``,
  workflow: [
    "Confirm the service and endpoint",
    "Build minimal targeted lists (no rockyou.txt on prod)",
    "Test with 1 user + 3 passwords first (avoid lockouts)",
    "Scale threads carefully — Hydra defaults are aggressive",
    "Log output; document what worked",
  ],
  commands: [
    { cmd: "hydra -l admin -P rockyou.txt ssh://10.0.0.5", desc: "SSH, single user, password list" },
    { cmd: "hydra -L users.txt -P pass.txt ftp://10.0.0.5 -t 4", desc: "FTP with 4 threads" },
    { cmd: "hydra -L u.txt -P p.txt 10.0.0.5 smb -t 1", desc: "SMB (use 1 thread to avoid lockouts)" },
    { cmd: "hydra -L u.txt -P p.txt target http-post-form '/login:user=^USER^&pass=^PASS^:F=Invalid'", desc: "HTTP POST form" },
    { cmd: "hydra -l admin -P p.txt -s 2222 ssh://10.0.0.5", desc: "Non-default port" },
  ],
  toolsUsed: ["hydra", "medusa", "patator", "ncrack"],
  expectedOutput: {
    lang: "bash",
    code: `$ hydra -l admin -P pass.txt ssh://10.0.0.5
Hydra v9.5 (c) 2024
[DATA] max 16 tasks per 1 server, overall 16 tasks
[22][ssh] host: 10.0.0.5   login: admin   password: Winter2024!
1 of 1 target successfully completed, 1 valid password found`,
  },
  commonMistakes: [
    "Blasting a login endpoint and locking every account",
    "Using rockyou.txt against SSH — will take days and get you banned",
    "Wrong failure string on HTTP form → false positives",
    "Ignoring `-t` and getting rate-limited to nothing",
  ],
  miniLab: {
    objective: "Crack a lab SSH login you own.",
    steps: [
      "Spin up a local Ubuntu VM, add a user with a weak password from rockyou-top100.txt.",
      "Verify SSH is up.",
      "Run `hydra -l lab -P rockyou-top100.txt ssh://<vm-ip>`.",
      "Verify success and record wall-clock time.",
    ],
    expected: "Hydra finds the password; you understand the throughput of an SSH online attack.",
  },
  practiceQuestions: [
    "What is the difference between online and offline password cracking?",
    "Why should thread count be low for SMB?",
    "What does `^USER^` mean in an http-post-form template?",
    "When would you prefer medusa or ncrack over hydra?",
  ],
  interviewQuestions: [
    "How do you avoid account lockouts during a credential audit?",
    "Walk through a Hydra command for a login form with a CSRF token.",
    "How would you brute a service with an unpublished protocol?",
    "How do you handle 2FA in scope during a credential test?",
  ],
  cheatsheet: [
    { cmd: "-l/-L", desc: "Single user / user list" },
    { cmd: "-p/-P", desc: "Single pass / pass list" },
    { cmd: "-t <n>", desc: "Threads (careful!)" },
    { cmd: "-s <port>", desc: "Non-default port" },
    { cmd: "-f", desc: "Stop after first found" },
    { cmd: "-V", desc: "Verbose (each attempt)" },
    { cmd: "http-post-form ...", desc: "Web form attack" },
  ],
  references: [
    { label: "Hydra GitHub", url: "https://github.com/vanhauser-thc/thc-hydra" },
    { label: "SecLists passwords", url: "https://github.com/danielmiessler/SecLists/tree/master/Passwords" },
  ],
  summary: `Hydra is loud and effective. Reserve it for lab and authorized red-team work — it will get you noticed instantly on production.`,
  callouts: [
    { type: "warning", body: "Online password bruteforcing without written authorization is illegal and unethical." },
  ],
};
