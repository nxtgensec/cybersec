import type { LearningTopic } from "../types";

export const toolGobuster: LearningTopic = {
  slug: "gobuster",
  kind: "tool",
  title: "Gobuster",
  tagline: "Fast directory, DNS, and vhost bruteforcer written in Go.",
  difficulty: "Beginner",
  estimatedMinutes: 20,
  overview: `Gobuster brute-forces URIs (directories/files), DNS subdomains, and virtual hosts. It's fast, simple, and produces easily grepable output — a staple in the enumeration toolkit.`,
  whyItMatters: `Hidden endpoints (\`/admin\`, \`/backup.zip\`, \`/api/v2\`) are behind an enormous percentage of real findings. Gobuster is the fastest way to find them.`,
  realWorldScenario: `A quick dir bruteforce finds \`/.git/\` exposed — 30 seconds later you've cloned the entire application source with \`git-dumper\`.`,
  objectives: [
    "Understand the three modes: dir, dns, vhost",
    "Pick appropriate wordlists (SecLists!)",
    "Tune concurrency without DoS-ing the target",
    "Read output and filter status codes",
  ],
  theory: `## Modes

- **dir** — bruteforce directories/files on a web server
- **dns** — bruteforce subdomains
- **vhost** — bruteforce virtual hosts (same IP, different Host header)

## Wordlists (SecLists)

- \`/usr/share/seclists/Discovery/Web-Content/common.txt\` — small, fast
- \`raft-medium-directories.txt\` — solid general purpose
- \`big.txt\` — comprehensive but slow

## Status code interpretation

- 200 — content served (interesting)
- 301/302 — redirect (follow with \`-r\` or investigate target)
- 401/403 — protected (still interesting!)
- 404 — usual not found`,
  workflow: [
    "Pick the mode (dir / dns / vhost)",
    "Choose an appropriate wordlist",
    "Set extensions (\`-x php,html,txt\`) for dir mode on known tech",
    "Ignore likely false positives (\`--status-codes-blacklist 404,500\`)",
    "Redirect output to a file for later reference",
  ],
  commands: [
    { cmd: "gobuster dir -u https://target -w /usr/share/seclists/Discovery/Web-Content/common.txt", desc: "Basic dir brute" },
    { cmd: "gobuster dir -u https://target -w common.txt -x php,html,txt -t 50", desc: "With extensions, 50 threads" },
    { cmd: "gobuster dns -d example.com -w subdomains-top1m.txt", desc: "DNS subdomain brute" },
    { cmd: "gobuster vhost -u https://ip -w subdomains.txt --append-domain", desc: "Vhost brute against an IP" },
    { cmd: "gobuster dir -u https://target -w list.txt -o out.txt -b 404,403", desc: "Blacklist status codes, save output" },
  ],
  toolsUsed: ["gobuster", "seclists", "ffuf", "feroxbuster"],
  expectedOutput: {
    lang: "bash",
    code: `$ gobuster dir -u https://target -w common.txt
===============================================================
Gobuster v3.6
===============================================================
/admin         (Status: 301) [Size: 178] [--> /admin/]
/backup        (Status: 200) [Size: 5210]
/.git/HEAD     (Status: 200) [Size:   23]
/robots.txt    (Status: 200) [Size:  128]
===============================================================`,
  },
  commonMistakes: [
    "Using the wrong wordlist size — big.txt on a slow target = hours",
    "Not adding extensions — missing all `.php` and `.bak` files",
    "Too many threads — target rate-limits or crashes",
    "Ignoring 403s — they often mean 'exists but forbidden'",
  ],
  miniLab: {
    objective: "Enumerate hidden directories on your local DVWA.",
    steps: [
      "Start DVWA at http://localhost.",
      "Run gobuster with common.txt and -x php.",
      "Note the 200/301 responses.",
      "Follow interesting redirects manually.",
    ],
    expected: "You've found /login.php, /vulnerabilities/, /setup.php, etc.",
  },
  practiceQuestions: [
    "What's the difference between gobuster dns and gobuster vhost?",
    "Why include extensions like php,html,txt?",
    "Which status code often indicates a hidden but protected resource?",
    "How do you avoid overwhelming a target?",
  ],
  interviewQuestions: [
    "Compare gobuster vs ffuf vs feroxbuster — when do you reach for each?",
    "How do you handle a target with heavy WAF rate limiting?",
    "What wordlist strategy do you use for a fresh unknown target?",
  ],
  cheatsheet: [
    { cmd: "gobuster dir -u <url> -w <list>", desc: "Directories" },
    { cmd: "-x php,txt,html", desc: "Extensions" },
    { cmd: "-t 50", desc: "Threads" },
    { cmd: "-b 404,403", desc: "Blacklist status codes" },
    { cmd: "gobuster dns -d <domain> -w <list>", desc: "DNS subdomain brute" },
    { cmd: "gobuster vhost -u <url> -w <list> --append-domain", desc: "Vhost brute" },
  ],
  references: [
    { label: "Gobuster GitHub", url: "https://github.com/OJ/gobuster" },
    { label: "SecLists", url: "https://github.com/danielmiessler/SecLists" },
  ],
  summary: `Gobuster is quick to learn and fast to run. Combine it with a good wordlist and it finds low-hanging fruit constantly.`,
};
