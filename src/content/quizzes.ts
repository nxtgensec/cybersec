export type QuizSet = {
  slug: string;
  title: string;
  questions: {
    q: string;
    choices: string[];
    answer: number;
    explain?: string;
  }[];
};

export const quizzes: QuizSet[] = [
  {
    slug: "recon-quiz",
    title: "Reconnaissance Basics",
    questions: [
      { q: "Which of the following is passive reconnaissance?", choices: ["Nmap SYN scan", "Certificate transparency lookup", "SMB enumeration", "Banner grabbing with curl"], answer: 1, explain: "crt.sh queries a third-party log — the target is not touched." },
      { q: "What DNS record type lists mail servers?", choices: ["A", "MX", "TXT", "NS"], answer: 1 },
      { q: "Which tool is best for passive subdomain enumeration?", choices: ["nmap", "subfinder", "burp", "hydra"], answer: 1 },
      { q: "Why is DNS zone transfer usually disabled today?", choices: ["It's slow", "It leaks entire zone data to unauthorized clients", "It's encrypted", "It uses UDP"], answer: 1 },
    ],
  },
  {
    slug: "scanning-quiz",
    title: "Scanning Fundamentals",
    questions: [
      { q: "Which Nmap flag runs a stealthy SYN scan?", choices: ["-sT", "-sS", "-sU", "-sn"], answer: 1 },
      { q: "What does state 'filtered' mean in Nmap output?", choices: ["Port is closed", "Port is open", "A firewall is likely dropping probes", "Host is down"], answer: 2 },
      { q: "Which flag scans all 65535 TCP ports?", choices: ["-p-", "-p 1000", "-A", "-T4"], answer: 0 },
      { q: "-Pn tells Nmap to...", choices: ["Skip port scan", "Skip host discovery", "Use paranoid timing", "Use SYN probes"], answer: 1 },
    ],
  },
  {
    slug: "enum-quiz",
    title: "Enumeration",
    questions: [
      { q: "Default SNMPv2 community string to always test:", choices: ["admin", "public", "root", "cisco"], answer: 1 },
      { q: "Which tool performs comprehensive SMB enumeration?", choices: ["hydra", "nmap", "enum4linux", "burp"], answer: 2 },
      { q: "Anonymous LDAP bind exposes:", choices: ["Nothing by default", "Directory data readable to any anonymous client", "The KDC secret", "Only computer accounts"], answer: 1 },
    ],
  },
  {
    slug: "vuln-quiz",
    title: "Vulnerability Assessment",
    questions: [
      { q: "A CVSS 9.8 base score generally indicates:", choices: ["Informational", "Low risk", "Critical severity", "Non-exploitable"], answer: 2 },
      { q: "Which is NOT a valid CVSS metric group?", choices: ["Base", "Temporal", "Environmental", "Tactical"], answer: 3 },
      { q: "The CWE classification represents:", choices: ["A specific bug in specific software", "A class/category of weakness", "A patch identifier", "A vendor code"], answer: 1 },
    ],
  },
  {
    slug: "exploit-quiz",
    title: "Exploitation",
    questions: [
      { q: "A reverse shell is preferred when:", choices: ["The target is on the public internet with any port open", "The target is behind NAT/firewall with outbound egress", "You have root on the target", "You need to encrypt the payload"], answer: 1 },
      { q: "'Meterpreter' is:", choices: ["A network scanner", "Metasploit's advanced in-memory payload", "A vulnerability database", "A rootkit"], answer: 1 },
      { q: "SSRF often pivots to:", choices: ["Cloud metadata endpoints", "Google.com", "Local disk", "Kerberos KDC"], answer: 0 },
    ],
  },
  {
    slug: "postexp-quiz",
    title: "Post-Exploitation",
    questions: [
      { q: "GTFOBins is a database of:", choices: ["Buffer overflows", "Unix binaries that can be abused to bypass security", "Windows LOLBins", "Kernel exploits"], answer: 1 },
      { q: "Priv-esc from user to root/SYSTEM is called:", choices: ["Horizontal escalation", "Vertical escalation", "Lateral movement", "Beaconing"], answer: 1 },
      { q: "Which file should NEVER be modified for persistence on a client system without written approval?", choices: ["Any of them", "cron", "systemd unit files", "rc.local"], answer: 0, explain: "Persistence on client systems requires explicit written authorization." },
    ],
  },
];
