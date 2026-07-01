import type { LearningTopic } from "../types";

export const phaseEnumeration: LearningTopic = {
  slug: "enumeration",
  kind: "phase",
  title: "Enumeration",
  tagline: "Extract structured information from each discovered service.",
  difficulty: "Intermediate",
  estimatedMinutes: 60,
  order: 3,
  next: { slug: "vulnerability-assessment", title: "Vulnerability Assessment", kind: "phase" },
  overview: `Enumeration goes one layer deeper than scanning. Once you know a service is running, enumeration tells you *what's inside it*: users, shares, versions, endpoints, DNS records, mailboxes, misconfigurations.`,
  whyItMatters: `Most successful attacks begin with a good enumeration finding — a null-session SMB share, a verbose SNMP community, an anonymous LDAP bind, a wide-open FTP listing. Enumeration turns "port 445 is open" into "port 445 lets me list domain users."`,
  realWorldScenario: `Port scan found SMB on 445 and SNMP on 161. Enumeration reveals SNMP is using the default community "public" and dumps 400 usernames, network interfaces, and running processes. SMB accepts anonymous sessions and exposes a share called `Backups` containing an unencrypted `sql.bak`.`,
  objectives: [
    "Enumerate common protocols: SMB, SNMP, LDAP, NFS, DNS, SMTP, RPC, FTP, SSH, HTTP",
    "Identify usernames, groups, shares, and misconfigurations",
    "Build the credential and attack-path candidate list for exploitation",
    "Detect legacy protocols and default configurations",
  ],
  theory: `## Enumeration by protocol

**SMB (445)** — shares, users, groups, policies. Tools: enum4linux, smbclient, CrackMapExec.
**SNMP (161/UDP)** — MIB walking with default communities (public, private). Tools: snmpwalk, onesixtyone.
**LDAP (389/636)** — directory data, users, groups, computers. Tools: ldapsearch, BloodHound.
**NFS (2049)** — exported filesystems, no auth by default. Tools: showmount, mount.
**DNS (53)** — records, zone transfers. Tools: dig, dnsrecon, dnsenum.
**SMTP (25)** — user enumeration via VRFY/EXPN/RCPT TO. Tools: smtp-user-enum.
**FTP (21)** — anonymous logins, directory listing. Tools: ftp, ncftp.
**HTTP (80/443)** — endpoints, virtual hosts, headers, robots.txt, sitemap.xml, tech stack.

## Structured output

Every enum finding should record: protocol, service version, discovered item (share/user/endpoint), authentication required, and a next-step hypothesis.`,
  workflow: [
    "Pick a service from your scan output",
    "Look up the standard enumeration playbook for that service",
    "Attempt unauthenticated enumeration first",
    "Try default/common credentials only if authorized",
    "Capture all findings — usernames, versions, endpoints",
    "Cross-reference findings across services (same usernames? shared secrets?)",
  ],
  commands: [
    { cmd: "enum4linux -a 10.0.0.5", desc: "Comprehensive SMB enumeration" },
    { cmd: "smbclient -L //10.0.0.5 -N", desc: "List SMB shares with null session" },
    { cmd: "smbmap -H 10.0.0.5", desc: "Show share permissions" },
    { cmd: "snmpwalk -v2c -c public 10.0.0.5", desc: "Full SNMP MIB walk" },
    { cmd: "ldapsearch -x -H ldap://10.0.0.5 -b 'dc=corp,dc=local'", desc: "Anonymous LDAP query" },
    { cmd: "showmount -e 10.0.0.5", desc: "List NFS exports" },
    { cmd: "dnsenum example.com", desc: "Full DNS enumeration" },
    { cmd: "smtp-user-enum -M VRFY -U users.txt -t 10.0.0.5", desc: "SMTP user enumeration" },
    { cmd: "gobuster dir -u https://10.0.0.5 -w /usr/share/wordlists/dirb/common.txt", desc: "HTTP endpoint discovery" },
  ],
  toolsUsed: ["enum4linux", "smbclient", "smbmap", "snmpwalk", "ldapsearch", "showmount", "dnsenum", "smtp-user-enum", "gobuster", "CrackMapExec"],
  expectedOutput: {
    lang: "bash",
    code: `$ enum4linux -a 10.0.0.5
[+] Server allows sessions using username '', password ''
[+] Got domain/workgroup name: CORP
[+] Users:
    admin (RID: 500)
    jdoe  (RID: 1001)
    svc-backup (RID: 1105)
[+] Share Enumeration:
    Backups      Disk      Backups (Anonymous READ)
    IPC$         IPC       Remote IPC`,
  },
  commonMistakes: [
    "Skipping SNMP because it's UDP and slow",
    "Not trying null sessions on SMB",
    "Forgetting LDAP anonymous bind on internal networks",
    "Enumerating only one protocol per host",
    "Losing enum output — no centralized notes",
  ],
  miniLab: {
    objective: "Enumerate a target running SMB, SNMP, and HTTP.",
    steps: [
      "Run `enum4linux -a <ip>` and list users, shares, and policy settings.",
      "Run `snmpwalk -v2c -c public <ip>` and identify at least one interesting OID.",
      "Run `gobuster dir` against the HTTP port with the common wordlist.",
      "Combine results into a single findings document with hypotheses for the next phase.",
    ],
    expected: "At minimum: 3 SMB users, 1 SNMP finding, 5 HTTP endpoints — with next-step hypotheses.",
  },
  practiceQuestions: [
    "Which SMB versions still allow null sessions by default?",
    "What is the default SNMPv2 community string that should always be tested?",
    "What does anonymous LDAP bind expose?",
    "How would you enumerate SMTP users if VRFY is disabled?",
    "Why is enum4linux considered noisy?",
  ],
  interviewQuestions: [
    "Explain the difference between scanning and enumeration.",
    "How would you enumerate a Windows domain without valid credentials?",
    "What tools do you chain for HTTP enumeration and why?",
    "How do you enumerate an NFS export safely?",
    "What's your process when you find an anonymous FTP with write access?",
  ],
  cheatsheet: [
    { cmd: "enum4linux -a <ip>", desc: "SMB one-shot" },
    { cmd: "smbmap -H <ip>", desc: "Share permissions" },
    { cmd: "snmpwalk -v2c -c public <ip>", desc: "SNMP full walk" },
    { cmd: "ldapsearch -x -H ldap://<ip> -b <base>", desc: "Anonymous LDAP" },
    { cmd: "showmount -e <ip>", desc: "NFS exports" },
    { cmd: "gobuster dir -u <url> -w <list>", desc: "HTTP dir bruteforce" },
    { cmd: "dnsenum <domain>", desc: "DNS enumeration" },
  ],
  references: [
    { label: "HackTricks Enumeration", url: "https://book.hacktricks.xyz/network-services-pentesting" },
    { label: "PayloadsAllTheThings", url: "https://github.com/swisskyrepo/PayloadsAllTheThings" },
  ],
  summary: `Enumeration turns "there is a service" into "here is the ammunition for the exploit." Be methodical, protocol-by-protocol, and record everything.`,
};
