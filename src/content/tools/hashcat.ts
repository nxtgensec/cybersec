import type { LearningTopic } from "../types";

export const toolHashcat: LearningTopic = {
  slug: "hashcat",
  kind: "tool",
  title: "Hashcat",
  tagline: "The world's fastest password cracker — GPU accelerated, offline.",
  difficulty: "Intermediate",
  estimatedMinutes: 30,
  overview: `Hashcat is a highly optimized password recovery tool that runs on CPUs and GPUs. It supports 300+ hash types (MD5, SHA-family, NTLM, bcrypt, WPA, Kerberos AS-REP…) and multiple attack modes (dictionary, mask, hybrid, rule-based).`,
  whyItMatters: `Once you have hashes — from a database dump, /etc/shadow, or an AS-REP roast — offline cracking is silent, fast, and unbounded by network rate limits.`,
  realWorldScenario: `A Kerberoast attack yields 12 AS-REP hashes. Hashcat with rockyou.txt + best64 rule breaks 8 of them in 40 seconds on a laptop RTX card. Two contain domain-admin equivalents.`,
  objectives: [
    "Identify the hash type (\`-m\` mode)",
    "Choose an attack mode (\`-a\`)",
    "Build effective wordlists and masks",
    "Use rules to expand a wordlist efficiently",
    "Read and use the potfile",
  ],
  theory: `## Attack modes (-a)

- **0** — Straight (dictionary)
- **1** — Combination (word1 + word2)
- **3** — Mask (?l ?u ?d ?s + fixed chars)
- **6** — Hybrid dict + mask
- **7** — Hybrid mask + dict
- **9** — Association (custom pairs)

## Mask charset

- \`?l\` lower, \`?u\` upper, \`?d\` digit, \`?s\` special, \`?a\` all, \`?h\` hex lower, \`?H\` hex upper

## Common hash modes (-m)

| Mode | Hash |
|------|------|
| 0 | MD5 |
| 100 | SHA1 |
| 1000 | NTLM |
| 1400 | SHA256 |
| 1800 | SHA-512 crypt (Linux shadow) |
| 3200 | bcrypt |
| 5600 | NetNTLMv2 |
| 13100 | Kerberos TGS |
| 18200 | Kerberos AS-REP |
| 22000 | WPA-PBKDF2 |`,
  workflow: [
    "Identify the hash type (\`hashid <hash>\` or \`name-that-hash\`)",
    "Save hashes to a file",
    "Pick attack mode + wordlist + rules",
    "Run + monitor speed (H/s)",
    "Check potfile / \`--show\` for cracked entries",
  ],
  commands: [
    { cmd: "hashcat -m 1000 ntlm.txt rockyou.txt", desc: "NTLM dict attack" },
    { cmd: "hashcat -m 1800 -a 0 shadow.txt rockyou.txt -r rules/best64.rule", desc: "Linux shadow, rule-based" },
    { cmd: "hashcat -m 0 -a 3 hashes.txt '?u?l?l?l?l?d?d?d'", desc: "MD5 mask: Uxxxxxxddd" },
    { cmd: "hashcat -m 22000 hs.hccapx wordlist.txt -w 3", desc: "WPA/WPA2 (fast workload)" },
    { cmd: "hashcat -m 1000 --show hashes.txt", desc: "Show cracked (from potfile)" },
    { cmd: "hashcat --stdout wordlist.txt -r rules/best64.rule | head", desc: "Preview rule output" },
  ],
  toolsUsed: ["hashcat", "john", "hashid", "name-that-hash", "haiti"],
  expectedOutput: {
    lang: "bash",
    code: `Session..........: hashcat
Status...........: Cracked
Hash.Mode........: 1000 (NTLM)
Hash.Target......: 8846f7eaee8fb117ad06bdd830b7586c
Speed.#1.........: 12938.4 MH/s
Recovered........: 1/1 (100.00%) Digests
Result...........: password`,
  },
  commonMistakes: [
    "Wrong -m — hashcat will happily 'crack nothing' on the wrong type",
    "Using a huge mask that would take years",
    "Cracking against slow hashes (bcrypt) with too-broad rules",
    "Not using --username on Linux shadow files → messy output",
  ],
  miniLab: {
    objective: "Crack three sample hashes of different types.",
    steps: [
      "Generate 3 hashes: MD5, SHA1, NTLM of the string 'Summer2024'.",
      "Save each to its own file with the right mode.",
      "Run hashcat with rockyou-top1000.txt + best64.rule for each.",
      "Confirm all three crack.",
    ],
    expected: "Three cracked hashes with timing recorded for each.",
  },
  practiceQuestions: [
    "What is the difference between attack modes 0 and 3?",
    "Which mask expresses `Ab1?`?",
    "Why is bcrypt slow to crack?",
    "What is a rule file and why does it multiply throughput?",
  ],
  interviewQuestions: [
    "How would you crack an /etc/shadow file efficiently?",
    "Walk me through cracking a WPA handshake.",
    "How do you decide between mask and dictionary attacks?",
    "What's your rule strategy for a corporate password policy?",
  ],
  cheatsheet: [
    { cmd: "-m <N>", desc: "Hash mode" },
    { cmd: "-a 0/3/6", desc: "Dict / mask / hybrid" },
    { cmd: "-r rules/best64.rule", desc: "Rule file" },
    { cmd: "?l?u?d?s?a?h", desc: "Mask charsets" },
    { cmd: "--show / --left", desc: "Show cracked / remaining" },
    { cmd: "-w 3", desc: "Workload profile (higher = hotter GPU)" },
    { cmd: "hashcat --benchmark", desc: "Test speed on your rig" },
  ],
  references: [
    { label: "Hashcat wiki", url: "https://hashcat.net/wiki/" },
    { label: "Hash examples", url: "https://hashcat.net/wiki/doku.php?id=example_hashes" },
    { label: "Rules collection", url: "https://github.com/hashcat/hashcat/tree/master/rules" },
  ],
  summary: `Hashcat rewards understanding hash types and building the right attack for the right hash. GPU rigs multiply speed by 100–1000× over CPU.`,
  callouts: [
    { type: "warning", body: "Crack only hashes you obtained legally. Password cracking is a controlled activity in many jurisdictions." },
  ],
};
