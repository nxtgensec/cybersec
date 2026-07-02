import type { LearningTopic } from "../types";

export const toolBurp: LearningTopic = {
  slug: "burp",
  kind: "tool",
  title: "Burp Suite",
  tagline: "The web pentester's Swiss Army knife — intercept, modify, replay, and attack HTTP.",
  difficulty: "Intermediate",
  estimatedMinutes: 55,
  overview: `Burp Suite (by PortSwigger) is the standard web application testing platform. It sits between your browser and the target as an HTTP proxy, letting you inspect and modify every request in flight. Community Edition is free; Professional adds an automated scanner and Intruder speed.`,
  whyItMatters: `Practically every web vulnerability class — SQLi, XSS, IDOR, auth bypass, SSRF — is discovered and demonstrated through Burp.`,
  realWorldScenario: `Testing an e-commerce checkout: Repeater lets you change the price field from 4999 to 1, resend, and confirm the server accepts it — a full IDOR + business-logic flaw demonstrated in three requests.`,
  objectives: [
    "Set up Burp as your browser proxy (with Burp CA installed)",
    "Use Proxy → Intercept effectively",
    "Master Repeater, Intruder, and Decoder",
    "Understand match/replace and session handling rules",
    "Use collaborator for OOB (SSRF, blind SQLi)",
  ],
  theory: `## The five core tools

- **Proxy** — intercept and modify requests/responses in real time.
- **Repeater** — resend a single request, tweak, compare.
- **Intruder** — bruteforce / fuzz positions in a request.
- **Decoder** — encode/decode URL, base64, hex, etc.
- **Collaborator** — attacker-controlled DNS/HTTP for out-of-band findings.

## Attack types in Intruder (Community)

- **Sniper** — one payload set, one position at a time.
- **Battering ram** — same payload, all positions at once.
- **Pitchfork** — parallel payload sets across positions.
- **Cluster bomb** — cartesian product of payload sets. Slowest, thorough.`,
  workflow: [
    "Configure browser (or use built-in Chromium) to proxy through 127.0.0.1:8080",
    "Install Burp CA in the browser trust store",
    "Turn Intercept off, browse target normally to build sitemap",
    "Send interesting requests to Repeater for manual tweaking",
    "Send authentication or fuzz points to Intruder",
    "Use Collaborator for anything OOB (SSRF, blind injection)",
  ],
  commands: [
    { cmd: "java -jar burpsuite_community.jar", desc: "Launch Burp CE" },
    { cmd: "curl -x 127.0.0.1:8080 -k https://example.com", desc: "Route curl through Burp" },
  ],
  toolsUsed: ["Burp Suite CE / Pro", "Chromium (embedded)", "Foxyproxy"],
  expectedOutput: {
    lang: "http",
    code: `POST /login HTTP/1.1
Host: target.local
Content-Type: application/x-www-form-urlencoded
Cookie: session=abc

username=admin&password=§payload§   <-- Intruder position`,
  },
  commonMistakes: [
    "Not installing the Burp CA → TLS errors everywhere",
    "Leaving Intercept on and drowning in modal dialogs",
    "Using Intruder against production login forms (lockouts)",
    "Ignoring the sitemap — it's your recon inside Burp",
  ],
  miniLab: {
    objective: "Use Repeater to change a request price on a lab e-shop.",
    steps: [
      "Set up DVWA or PortSwigger Web Security Academy's business-logic labs.",
      "Add an item to cart, checkout — capture the checkout request in Proxy.",
      "Send to Repeater, change the price value, resend.",
      "Confirm the server accepts the modified price.",
    ],
    expected: "A one-request PoC of a price-manipulation vulnerability.",
  },
  practiceQuestions: [
    "What's the difference between Sniper and Cluster Bomb attacks in Intruder?",
    "Why do you need to install the Burp CA?",
    "How would you test for blind SSRF using Collaborator?",
    "What is a session handling rule and when do you need one?",
  ],
  interviewQuestions: [
    "Walk me through your Burp setup for a new engagement.",
    "How do you fuzz a JSON body with Intruder?",
    "How do you handle CSRF tokens that change every request?",
    "How do you test a WebSocket endpoint in Burp?",
  ],
  cheatsheet: [
    { cmd: "Ctrl+R", desc: "Send to Repeater" },
    { cmd: "Ctrl+I", desc: "Send to Intruder" },
    { cmd: "Ctrl+Shift+D", desc: "Send to Decoder" },
    { cmd: "Match/Replace", desc: "Auto-rewrite headers/body across all traffic" },
    { cmd: "Scope", desc: "Restrict tools to in-scope hosts" },
  ],
  references: [
    { label: "PortSwigger Web Academy", url: "https://portswigger.net/web-security" },
    { label: "Burp docs", url: "https://portswigger.net/burp/documentation" },
  ],
  summary: `Burp is not a scanner — it's a lens. Learn Proxy + Repeater deeply and you'll find things automated tools miss.`,
};
