import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — CyberSec" },
      { name: "description", content: "Curated ethical hacking resources — books, practice sites, docs, and reference cheatsheets." },
    ],
  }),
  component: Resources,
});

const groups = [
  {
    title: "Practice platforms",
    items: [
      { label: "TryHackMe", url: "https://tryhackme.com", desc: "Beginner-friendly guided rooms." },
      { label: "Hack The Box", url: "https://hackthebox.com", desc: "Live vulnerable machines and Academy." },
      { label: "PortSwigger Web Security Academy", url: "https://portswigger.net/web-security", desc: "Free, deep web-security labs." },
      { label: "OverTheWire", url: "https://overthewire.org/wargames/", desc: "Classic wargames — start with Bandit." },
      { label: "PicoCTF", url: "https://picoctf.org", desc: "Beginner CTF from Carnegie Mellon." },
    ],
  },
  {
    title: "References & payloads",
    items: [
      { label: "HackTricks", url: "https://book.hacktricks.xyz", desc: "The reference book for pentesters." },
      { label: "PayloadsAllTheThings", url: "https://github.com/swisskyrepo/PayloadsAllTheThings", desc: "Payloads for every vuln class." },
      { label: "GTFOBins", url: "https://gtfobins.github.io", desc: "Unix SUID/sudo abuse database." },
      { label: "LOLBAS", url: "https://lolbas-project.github.io", desc: "Windows living-off-the-land binaries." },
      { label: "SecLists", url: "https://github.com/danielmiessler/SecLists", desc: "Wordlists for every occasion." },
    ],
  },
  {
    title: "Docs & books",
    items: [
      { label: "Nmap Book (free)", url: "https://nmap.org/book/", desc: "The canonical Nmap reference." },
      { label: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/", desc: "The top web risks." },
      { label: "Metasploit Unleashed", url: "https://www.offsec.com/metasploit-unleashed/", desc: "Free MSF course by OffSec." },
      { label: "MITRE ATT&CK", url: "https://attack.mitre.org", desc: "Adversary tactics knowledge base." },
    ],
  },
];

function Resources() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold">Resources</h1>
        <p className="mt-1 text-muted-foreground">Curated links used and recommended by working pentesters.</p>
      </div>
      {groups.map((g) => (
        <section key={g.title} className="mb-8">
          <h2 className="mb-3 font-display text-xl font-semibold">{g.title}</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {g.items.map((i) => (
              <a
                key={i.url}
                href={i.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-3 rounded-lg border border-border bg-panel p-4 transition hover:border-primary/50"
              >
                <ExternalLink className="mt-0.5 h-4 w-4 text-primary" />
                <div>
                  <div className="font-semibold group-hover:text-primary">{i.label}</div>
                  <div className="text-xs text-muted-foreground">{i.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
