import type { LearningTopic } from "../types";

export const phaseReconnaissance: LearningTopic = {
  slug: "reconnaissance",
  kind: "phase",
  title: "Reconnaissance",
  tagline: "Gather intelligence about the target before touching it.",
  difficulty: "Beginner",
  estimatedMinutes: 45,
  order: 1,
  next: { slug: "scanning", title: "Scanning", kind: "phase" },
  overview: `Reconnaissance (or "recon") is the first and arguably most important phase of any ethical hacking engagement. It is the systematic collection of information about a target — the organization, its people, its infrastructure, and its digital footprint — before any active testing begins.

Good recon shortens every phase that follows. Poor recon leads to noisy scans, missed attack surface, and unreliable findings.`,
  whyItMatters: `Attackers routinely spend 70–80% of their time on reconnaissance. The more you know about a target, the fewer requests you need to send, the less likely you are to be detected, and the more precisely you can craft your attack. In real engagements, the difference between a good and a great pentester is almost always the quality of their recon.`,
  realWorldScenario: `You're hired to test acme-corp.com. Before running a single scan you discover on GitHub a leaked \`.env\` from a former developer, on LinkedIn the names of three DevOps engineers, on crt.sh 42 forgotten subdomains, and on Shodan an exposed staging Jenkins with default credentials — all without sending one packet to the production network.`,
  objectives: [
    "Understand the difference between passive and active reconnaissance",
    "Enumerate subdomains, IP ranges, and technologies used by a target",
    "Collect OSINT from public sources (WHOIS, DNS, Shodan, GitHub, LinkedIn)",
    "Build a structured target profile that later phases can consume",
    "Recognize the legal boundaries of information gathering",
  ],
  theory: `## Passive vs Active Reconnaissance

**Passive recon** never interacts with target-owned infrastructure. You query third-party sources — search engines, certificate transparency logs, WHOIS registries, public code repos. The target cannot detect you.

**Active recon** does interact — DNS zone transfers, port scans, banner grabbing, spidering websites. It is faster and richer but leaves logs.

Most engagements start passive and only turn active once scope is clear.

## The Target Profile

A finished recon phase produces a structured document containing:

- **Netblocks & IP ranges** (from ASN lookups, WHOIS)
- **Domains & subdomains** (crt.sh, Amass, Subfinder, DNS bruteforce)
- **Technology stack** (Wappalyzer, WhatWeb, HTTP headers)
- **Employees & emails** (LinkedIn, theHarvester, Hunter.io)
- **Exposed services** (Shodan, Censys)
- **Leaked secrets** (GitHub dorks, HaveIBeenPwned, pastebin)
- **Physical / organizational data** (offices, subsidiaries, tech vendors)

Everything you find here becomes an input to Scanning, Enumeration, and Exploitation.`,
  workflow: [
    "Confirm scope & rules of engagement in writing",
    "WHOIS + ASN lookup to map ownership and netblocks",
    "Subdomain enumeration (crt.sh, Amass, Subfinder, Assetfinder)",
    "DNS enumeration (A, AAAA, MX, NS, TXT, CNAME) + zone transfer attempts",
    "Fingerprint web technologies (WhatWeb, Wappalyzer, HTTP headers)",
    "OSINT on people: LinkedIn, theHarvester, Hunter.io",
    "Search Shodan / Censys / FOFA for exposed services",
    "GitHub dorking for leaked secrets and internal repos",
    "Consolidate everything into a target profile document",
  ],
  commands: [
    { cmd: "whois example.com", desc: "Registrar, ownership, contact info" },
    { cmd: "dig example.com ANY +noall +answer", desc: "All DNS records in one query" },
    { cmd: "dig axfr @ns1.example.com example.com", desc: "Attempt DNS zone transfer" },
    { cmd: "curl -s https://crt.sh/?q=%25.example.com&output=json | jq -r '.[].name_value' | sort -u", desc: "Subdomains from certificate transparency" },
    { cmd: "amass enum -passive -d example.com", desc: "Passive subdomain enumeration" },
    { cmd: "subfinder -d example.com -silent", desc: "Fast passive subdomain finder" },
    { cmd: "theHarvester -d example.com -b all", desc: "Emails, employees, subdomains from public sources" },
    { cmd: "whatweb -a 3 https://example.com", desc: "Fingerprint web technologies" },
    { cmd: "shodan host 1.2.3.4", desc: "Exposed services and banners on an IP" },
  ],
  toolsUsed: ["whois", "dig", "amass", "subfinder", "assetfinder", "theHarvester", "whatweb", "shodan", "crt.sh", "recon-ng", "maltego"],
  expectedOutput: {
    lang: "bash",
    code: `$ subfinder -d example.com -silent
www.example.com
mail.example.com
dev.example.com
staging.example.com
api.example.com
old-jenkins.example.com   <-- interesting`,
  },
  commonMistakes: [
    "Jumping straight to active scanning without passive recon first",
    "Confusing scope — testing an asset that belongs to a subsidiary you weren't authorized for",
    "Trusting one source; always cross-reference (crt.sh + Amass + Subfinder)",
    "Ignoring old / staging / dev subdomains — they are usually softer targets",
    "Not saving your findings in a structured format for later phases",
  ],
  miniLab: {
    objective: "Build a target profile for the domain tesla.com using only passive sources.",
    steps: [
      "Run `whois tesla.com` and record the registrar, name servers, and creation date.",
      "Query crt.sh for `%.tesla.com` and count unique subdomains.",
      "Use `dig tesla.com MX +short` to list mail servers.",
      "Search Shodan for `hostname:tesla.com` (view-only, no interaction).",
      "Document findings in a structured Markdown file with sections: Netblocks, Domains, Tech, People, Exposed Services.",
    ],
    expected: "A one-page target profile with at least 5 subdomains, 2 mail servers, and 1 exposed banner.",
  },
  practiceQuestions: [
    "What is the difference between passive and active reconnaissance?",
    "Name three sources of certificate transparency data.",
    "Why is DNS zone transfer usually disabled today?",
    "How would you find employees of a company without touching the target?",
    "What legal frameworks constrain OSINT collection in your jurisdiction?",
  ],
  interviewQuestions: [
    "Walk me through your recon methodology on a black-box web engagement.",
    "How do you avoid scope creep during OSINT?",
    "What's your favorite subdomain enumeration tool and why?",
    "How do you find leaked credentials on GitHub?",
    "Describe a time recon changed the direction of your engagement.",
  ],
  cheatsheet: [
    { cmd: "whois <domain>", desc: "Registrar & ownership" },
    { cmd: "dig <domain> ANY", desc: "All DNS records" },
    { cmd: "subfinder -d <domain>", desc: "Passive subdomains" },
    { cmd: "amass enum -passive -d <domain>", desc: "Deeper passive enum" },
    { cmd: "theHarvester -d <domain> -b all", desc: "OSINT harvester" },
    { cmd: "whatweb <url>", desc: "Tech fingerprint" },
    { cmd: "curl -I <url>", desc: "HTTP headers" },
    { cmd: "shodan host <ip>", desc: "Exposed services" },
  ],
  references: [
    { label: "OWASP Recon", url: "https://owasp.org/www-community/Category:OWASP_Reconnaissance" },
    { label: "crt.sh", url: "https://crt.sh" },
    { label: "Shodan", url: "https://shodan.io" },
    { label: "Amass docs", url: "https://github.com/owasp-amass/amass" },
  ],
  summary: `Reconnaissance turns an unknown target into a structured map of assets, technologies, and people. Spend real time here — every following phase depends on the quality of what you find.`,
  callouts: [
    { type: "warning", title: "Legal boundary", body: "OSINT is legal in most jurisdictions but scope always trumps curiosity. Only touch assets your Rules of Engagement explicitly authorize." },
  ],
};
