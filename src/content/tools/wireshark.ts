import type { LearningTopic } from "../types";

export const toolWireshark: LearningTopic = {
  slug: "wireshark",
  kind: "tool",
  title: "Wireshark",
  tagline: "The gold-standard packet analyzer — see every byte on the wire.",
  difficulty: "Intermediate",
  estimatedMinutes: 45,
  overview: `Wireshark is the leading open-source packet capture and analysis tool. It decodes hundreds of protocols and shows you exactly what leaves and arrives at a network interface. Essential for network forensics, protocol debugging, and traffic analysis during pentests.`,
  whyItMatters: `Almost every non-obvious network bug or attack is invisible until you see the raw traffic. Wireshark is how you see it.`,
  realWorldScenario: `A client reports "the app is slow." A five-minute Wireshark capture reveals every request retries 3× because a middle box mangles TCP window scaling. Fixed the day you find it.`,
  objectives: [
    "Capture on the right interface with the right filter",
    "Write capture and display filters",
    "Follow streams, extract objects, decode TLS with SSLKEYLOGFILE",
    "Recognize common protocol anomalies",
  ],
  theory: `## Capture vs display filters

- **Capture filter** (BPF syntax) — decides what's *stored*. \`tcp port 80\`.
- **Display filter** — decides what's *shown* from what's stored. \`http.request.method == "POST"\`.

## Useful display filters

\`\`\`
tcp.port == 443
http.request.uri contains "login"
dns.qry.name == "example.com"
tls.handshake.type == 1
ip.src == 10.0.0.5 && ip.dst == 10.0.0.10
!(arp || icmp || dns)
\`\`\`

## TLS decryption

Set the environment variable \`SSLKEYLOGFILE=/tmp/keys.log\` before starting your browser, then in Wireshark: Preferences → Protocols → TLS → (Pre)-Master-Secret log filename.`,
  workflow: [
    "Identify the correct interface",
    "Start a capture (with a BPF filter to keep it small)",
    "Reproduce the behavior",
    "Stop, apply a display filter to focus",
    "Follow TCP/UDP/HTTP stream for context",
    "Export objects if needed (File → Export Objects → HTTP)",
  ],
  commands: [
    { cmd: "sudo wireshark", desc: "GUI (needs root for capture)" },
    { cmd: "sudo dumpcap -i eth0 -w capture.pcap", desc: "Capture-only tool (lighter than wireshark)" },
    { cmd: "tshark -i eth0 -f 'port 80' -w http.pcap", desc: "CLI capture with BPF filter" },
    { cmd: "tshark -r capture.pcap -Y 'http.request' -T fields -e http.host -e http.request.uri", desc: "Read pcap, filter, extract fields" },
    { cmd: "capinfos capture.pcap", desc: "Summary of a pcap" },
  ],
  toolsUsed: ["wireshark", "tshark", "dumpcap", "tcpdump"],
  expectedOutput: {
    lang: "bash",
    code: `$ tshark -r sample.pcap -Y 'http.request' -T fields -e http.host -e http.request.uri
example.com  /
example.com  /login
api.example.com  /v1/users?admin=1`,
  },
  commonMistakes: [
    "Capturing on the wrong interface (bridge/loopback)",
    "No capture filter — 10 GB pcap you can't open",
    "Confusing capture and display filter syntax",
    "Forgetting to decrypt TLS via SSLKEYLOGFILE",
  ],
  miniLab: {
    objective: "Capture and analyze a plaintext login.",
    steps: [
      "Start Wireshark on lo (loopback).",
      "Run a local HTTP server (`python3 -m http.server 8080`) with a fake login endpoint.",
      "Submit a form; stop capture.",
      "Apply display filter `http.request.method == \"POST\"`, Follow → HTTP Stream, find the credentials.",
    ],
    expected: "You can read the POST body containing the fake credentials.",
  },
  practiceQuestions: [
    "What is the difference between a capture and a display filter?",
    "How do you decrypt TLS traffic in Wireshark?",
    "What does 'Follow TCP Stream' do?",
    "Which protocol shows up as ARP and when?",
  ],
  interviewQuestions: [
    "How would you triage a suspected data exfiltration from a pcap?",
    "How do you export HTTP objects from a capture?",
    "What's the difference between tshark and tcpdump?",
    "How would you find a beacon in an 8-hour capture?",
  ],
  cheatsheet: [
    { cmd: "tcp.port == 443", desc: "HTTPS traffic" },
    { cmd: "http.request", desc: "All HTTP requests" },
    { cmd: "dns", desc: "DNS traffic" },
    { cmd: "ip.src == 10.0.0.5", desc: "From source IP" },
    { cmd: "!(arp||icmp||dns)", desc: "Hide noise" },
    { cmd: "tls.handshake.type == 1", desc: "TLS Client Hello" },
  ],
  references: [
    { label: "Wireshark User's Guide", url: "https://www.wireshark.org/docs/wsug_html/" },
    { label: "Sample captures", url: "https://wiki.wireshark.org/SampleCaptures" },
  ],
  summary: `Wireshark shows you truth. When docs and dashboards disagree, the packets don't lie.`,
};
