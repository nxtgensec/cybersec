export type GlossaryTerm = {
  term: string;
  short: string;
  full: string;
  related?: string[];
};

export const glossary: GlossaryTerm[] = [
  { term: "CVE", short: "Common Vulnerabilities and Exposures", full: "A public identifier for a specific vulnerability, e.g. CVE-2021-44228 (Log4Shell). Maintained by MITRE.", related: ["CVSS", "CWE"] },
  { term: "CVSS", short: "Common Vulnerability Scoring System", full: "A 0.0–10.0 numeric score representing severity of a vulnerability. Base, Temporal, and Environmental metrics.", related: ["CVE"] },
  { term: "CWE", short: "Common Weakness Enumeration", full: "A taxonomy of software weakness classes, e.g. CWE-89 (SQL injection). CVEs are instances of CWEs." },
  { term: "OSINT", short: "Open-Source Intelligence", full: "Intelligence gathering from publicly available sources — search engines, social media, WHOIS, cert transparency.", related: ["Reconnaissance"] },
  { term: "Reconnaissance", short: "Info gathering phase", full: "The first phase of ethical hacking. Passive (no interaction) and active (direct probing)." },
  { term: "Enumeration", short: "Extracting service details", full: "Probing discovered services for users, shares, versions, endpoints." },
  { term: "Exploitation", short: "Leveraging a vulnerability", full: "Turning a proven vulnerability into controlled access." },
  { term: "Payload", short: "Code that runs post-exploit", full: "The code delivered after a successful exploit — typically a shell (bind/reverse) or Meterpreter." },
  { term: "Reverse shell", short: "Target connects back to you", full: "The target initiates the connection to the attacker's listener. Works through NAT and outbound-only firewalls." },
  { term: "Bind shell", short: "Attacker connects to target", full: "The target opens a listening port; the attacker connects to it." },
  { term: "Meterpreter", short: "Metasploit's advanced payload", full: "An in-memory, extensible payload with built-in enumeration, pivoting, and post-exploitation modules." },
  { term: "Priv-esc", short: "Privilege escalation", full: "Going from a low-privilege user (www-data, tomcat) to root or SYSTEM." },
  { term: "Pivoting", short: "Using one host to reach another", full: "Routing traffic through a compromised host to access networks otherwise unreachable." },
  { term: "SUID", short: "Set User ID (Linux)", full: "A file permission bit causing an executable to run with the file owner's privileges. A common priv-esc vector when set on the wrong binary.", related: ["GTFOBins"] },
  { term: "GTFOBins", short: "SUID abuse database", full: "A curated list of Unix binaries that can be exploited to bypass security when misconfigured (SUID, sudo, capabilities)." },
  { term: "LOLBAS", short: "Living-Off-The-Land Binaries (Windows)", full: "Windows-side equivalent of GTFOBins — legitimate signed binaries repurposed for offensive tasks." },
  { term: "SSRF", short: "Server-Side Request Forgery", full: "Web vulnerability where the server can be tricked into fetching attacker-controlled URLs. Often used to reach cloud metadata (169.254.169.254)." },
  { term: "IDOR", short: "Insecure Direct Object Reference", full: "Access-control flaw where an object identifier in a URL/body can be changed to access another user's data." },
  { term: "XSS", short: "Cross-Site Scripting", full: "Injection of attacker-controlled JavaScript into web pages viewed by other users. Stored, reflected, DOM variants." },
  { term: "CSRF", short: "Cross-Site Request Forgery", full: "Tricking an authenticated user's browser into performing an action on a target site they didn't intend." },
  { term: "SQLi", short: "SQL Injection", full: "Web vulnerability where untrusted input reaches a SQL query. Variants: boolean-blind, time-based, error-based, UNION, stacked, OOB." },
  { term: "RCE", short: "Remote Code Execution", full: "The ability to execute arbitrary code on a remote system. The most severe web/network vulnerability class." },
  { term: "LFI", short: "Local File Inclusion", full: "Web vulnerability allowing an attacker to include local files (e.g. /etc/passwd) via a vulnerable parameter." },
  { term: "RFI", short: "Remote File Inclusion", full: "Like LFI but the included file is a remote URL. Historically common in old PHP apps." },
  { term: "NSE", short: "Nmap Scripting Engine", full: "Lua-based scripting engine bundled with Nmap. 600+ scripts covering discovery, vuln checks, and exploitation." },
  { term: "BPF", short: "Berkeley Packet Filter", full: "The syntax used by tcpdump/Wireshark capture filters. Kernel-level packet filtering." },
  { term: "Kerberoasting", short: "Attack on AD Kerberos tickets", full: "Requesting service tickets (TGS-REP) for accounts with SPNs; ticket hashes are offline-crackable." },
  { term: "AS-REP roasting", short: "AD Kerberos pre-auth attack", full: "Requesting AS-REP for accounts with 'Do not require pre-auth' — hash is offline-crackable." },
  { term: "SMB null session", short: "SMB without credentials", full: "Anonymous SMB connection allowed on older/misconfigured Windows/Samba. Exposes users/shares to enumeration." },
  { term: "Pass-the-Hash", short: "Reuse NTLM hash to auth", full: "Authenticating to SMB/other services using an NTLM hash without knowing the plaintext password." },
  { term: "Pass-the-Ticket", short: "Reuse Kerberos ticket", full: "Injecting a stolen/forged Kerberos TGT/TGS into a session to authenticate as another principal." },
  { term: "Golden Ticket", short: "Forged Kerberos TGT", full: "A TGT forged with the KRBTGT hash — grants attacker persistence as any user in the domain." },
  { term: "MITRE ATT&CK", short: "Adversary tactic framework", full: "A knowledge base of adversary tactics, techniques, and procedures (TTPs) used across the industry." },
  { term: "TTP", short: "Tactics, Techniques, Procedures", full: "How an adversary operates — the *why*, *how*, and *specific implementation* of an action." },
  { term: "C2", short: "Command and Control", full: "The infrastructure an attacker uses to control compromised hosts (e.g. Cobalt Strike, Sliver, Mythic)." },
  { term: "Beacon", short: "C2 callback", full: "A periodic call-home from a compromised host to its C2 server." },
  { term: "Rules of Engagement", short: "Written engagement scope", full: "The document defining what may and may not be tested during an engagement — hosts, methods, times, contacts." },
  { term: "Blue team", short: "Defenders", full: "The team responsible for detection, response, and hardening." },
  { term: "Red team", short: "Offensive testers", full: "A team simulating adversaries to test blue-team detection and response." },
  { term: "Purple team", short: "Red+Blue collaboration", full: "Red and blue teams working together, sharing knowledge in real time, to improve both offense and defense." },
];
