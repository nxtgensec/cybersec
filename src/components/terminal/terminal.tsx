import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

type FSNode = { type: "dir"; children: Record<string, FSNode> } | { type: "file"; content: string };

const initialFS: FSNode = {
  type: "dir",
  children: {
    home: {
      type: "dir",
      children: {
        kali: {
          type: "dir",
          children: {
            "readme.txt": { type: "file", content: "Welcome to the CyberSec simulated shell.\nTry: ls, cd tools, cat notes.md, help" },
            "notes.md": { type: "file", content: "# Recon notes\n- crt.sh yielded 42 subdomains\n- shodan hint: exposed jenkins" },
            tools: {
              type: "dir",
              children: {
                "nmap-quick.sh": { type: "file", content: "#!/bin/bash\nnmap -sV -sC -oA quick $1\n" },
              },
            },
          },
        },
      },
    },
    etc: {
      type: "dir",
      children: {
        passwd: { type: "file", content: "root:x:0:0:root:/root:/bin/bash\nkali:x:1000:1000:Kali:/home/kali:/bin/bash" },
        hostname: { type: "file", content: "kali\n" },
      },
    },
    tmp: { type: "dir", children: {} },
  },
};

function clone(node: FSNode): FSNode {
  if (node.type === "file") return { type: "file", content: node.content };
  const c: Record<string, FSNode> = {};
  for (const [k, v] of Object.entries(node.children)) c[k] = clone(v);
  return { type: "dir", children: c };
}

function resolvePath(cwd: string[], target: string): string[] {
  const parts = target.startsWith("/") ? target.slice(1).split("/").filter(Boolean) : [...cwd, ...target.split("/").filter(Boolean)];
  const out: string[] = [];
  for (const p of parts) {
    if (p === "." || p === "") continue;
    if (p === "..") out.pop();
    else out.push(p);
  }
  return out;
}

function getNode(root: FSNode, path: string[]): FSNode | null {
  let n: FSNode = root;
  for (const p of path) {
    if (n.type !== "dir" || !n.children[p]) return null;
    n = n.children[p];
  }
  return n;
}

const scriptedCommands: Record<string, (args: string[]) => string> = {
  nmap: (args) => {
    const t = args.filter((a) => !a.startsWith("-")).slice(-1)[0] || "127.0.0.1";
    return `Starting Nmap 7.94 ( https://nmap.org )\nNmap scan report for ${t}\nHost is up (0.00023s latency).\nPORT     STATE SERVICE  VERSION\n22/tcp   open  ssh      OpenSSH 8.2p1 Ubuntu\n80/tcp   open  http     Apache httpd 2.4.41\n443/tcp  open  ssl/http nginx 1.18.0\nNmap done: 1 IP address (1 host up) scanned in 4.21s`;
  },
  whois: (args) => `Domain Name: ${args[0] || "EXAMPLE.COM"}\nRegistrar: Example Registrar, Inc.\nCreation Date: 1995-08-14T04:00:00Z\nName Server: NS1.EXAMPLE.COM\nName Server: NS2.EXAMPLE.COM`,
  dig: (args) => {
    const domain = args[0] || "example.com";
    return `;; ANSWER SECTION:\n${domain}.\t3600\tIN\tA\t93.184.216.34\n${domain}.\t3600\tIN\tMX\t10 mail.${domain}.\n\n;; Query time: 12 msec`;
  },
  ping: (args) => `PING ${args.slice(-1)[0] || "host"} 56(84) bytes of data.\n64 bytes from host: icmp_seq=1 ttl=64 time=0.023 ms\n64 bytes from host: icmp_seq=2 ttl=64 time=0.021 ms\n^C\n--- ping statistics ---\n2 packets transmitted, 2 received, 0% packet loss`,
  curl: (args) => {
    if (args.includes("-I")) return "HTTP/2 200\nserver: nginx/1.18.0\ncontent-type: text/html\ncontent-length: 1256\n";
    return "<html><head><title>Example</title></head><body>...</body></html>";
  },
  nc: () => "listening on [any] 4444 ...",
  hydra: () => "Hydra v9.5 (c) 2024 by van Hauser/THC\n[DATA] max 16 tasks per 1 server\n[22][ssh] host: 10.0.0.5  login: admin  password: Winter2024!\n1 valid password found",
  sqlmap: () => "[INFO] testing 'GET parameter 'id''\n[INFO] parameter 'id' is 'boolean-based blind' injectable\navailable databases [3]:\n[*] information_schema\n[*] shop\n[*] users",
  metasploit: () => "Try: msfconsole",
  msfconsole: () => "       =[ metasploit v6.4 - 2400 exploits ]\nmsf6 > (simulated)",
  whoami: () => "kali",
  hostname: () => "kali",
  uname: (args) => (args[0] === "-a" ? "Linux kali 6.6.15 #1 SMP x86_64 GNU/Linux" : "Linux"),
  date: () => new Date().toString(),
  id: () => "uid=1000(kali) gid=1000(kali) groups=1000(kali),27(sudo)",
  echo: (args) => args.join(" "),
  clear: () => "__CLEAR__",
  help: () => `Available: ls, cd, pwd, cat, echo, mkdir, touch, rm, whoami, id, hostname, uname, date, history, clear\nSimulated tools: nmap, whois, dig, ping, curl, nc, hydra, sqlmap, msfconsole\nTip: use ↑/↓ for history, Tab for autocomplete, Ctrl+L to clear.`,
};

const allCommands = ["ls", "cd", "pwd", "cat", "echo", "mkdir", "touch", "rm", "history", ...Object.keys(scriptedCommands)];

type Line = { kind: "in" | "out" | "err"; text: string };

export function Terminal({ className, initialLines }: { className?: string; initialLines?: Line[] }) {
  const [fs] = useState(() => clone(initialFS));
  const [cwd, setCwd] = useState<string[]>(["home", "kali"]);
  const [lines, setLines] = useState<Line[]>(
    initialLines ?? [{ kind: "out", text: "CyberSec Simulated Terminal — type 'help' to start.\n" }],
  );
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const prompt = `kali@cybersec:/${cwd.join("/")}$`;

  const run = useCallback(
    (raw: string) => {
      const cmdLine = raw.trim();
      const newLines: Line[] = [{ kind: "in", text: `${prompt} ${raw}` }];
      if (!cmdLine) {
        setLines((l) => [...l, ...newLines]);
        return;
      }
      const [cmd, ...args] = cmdLine.split(/\s+/);
      let output = "";

      switch (cmd) {
        case "pwd":
          output = "/" + cwd.join("/");
          break;
        case "ls": {
          const target = args.filter((a) => !a.startsWith("-")).slice(-1)[0];
          const path = target ? resolvePath(cwd, target) : cwd;
          const node = getNode(fs, path);
          if (!node) output = `ls: cannot access '${target}': No such file or directory`;
          else if (node.type === "file") output = target || "";
          else output = Object.keys(node.children).join("  ") || "";
          break;
        }
        case "cd": {
          const target = args[0] ?? "home/kali";
          const path = resolvePath(cwd, target);
          const node = getNode(fs, path);
          if (!node) output = `cd: no such file or directory: ${target}`;
          else if (node.type === "file") output = `cd: not a directory: ${target}`;
          else setCwd(path);
          break;
        }
        case "cat": {
          if (!args[0]) { output = "cat: missing operand"; break; }
          const path = resolvePath(cwd, args[0]);
          const node = getNode(fs, path);
          if (!node) output = `cat: ${args[0]}: No such file or directory`;
          else if (node.type === "dir") output = `cat: ${args[0]}: Is a directory`;
          else output = node.content;
          break;
        }
        case "history":
          output = history.map((h, i) => `${i + 1}  ${h}`).join("\n");
          break;
        case "mkdir":
        case "touch":
        case "rm":
          output = `${cmd}: (simulated — no filesystem changes persisted)`;
          break;
        default:
          if (scriptedCommands[cmd]) output = scriptedCommands[cmd](args);
          else output = `${cmd}: command not found`;
      }

      if (output === "__CLEAR__") {
        setLines([]);
      } else {
        setLines((l) => [...l, ...newLines, { kind: "out", text: output }]);
      }
      setHistory((h) => [...h, cmdLine]);
    },
    [cwd, fs, history, prompt],
  );

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
      setHistIdx(null);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const idx = histIdx === null ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(idx);
      setInput(history[idx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === null) return;
      const idx = histIdx + 1;
      if (idx >= history.length) { setHistIdx(null); setInput(""); }
      else { setHistIdx(idx); setInput(history[idx]); }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const parts = input.split(/\s+/);
      if (parts.length === 1) {
        const matches = allCommands.filter((c) => c.startsWith(parts[0]));
        if (matches.length === 1) setInput(matches[0] + " ");
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <div
      className={cn("flex h-full flex-col overflow-hidden rounded-lg border border-border bg-terminal font-mono text-sm", className)}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 border-b border-border/60 bg-panel px-3 py-2">
        <span className="h-3 w-3 rounded-full bg-danger/70" />
        <span className="h-3 w-3 rounded-full bg-warning/70" />
        <span className="h-3 w-3 rounded-full bg-primary/70" />
        <span className="ml-3 text-xs text-muted-foreground">kali@cybersec — simulated shell</span>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-auto p-4 text-terminal-foreground">
        {lines.map((l, i) => (
          <div key={i} className={cn("whitespace-pre-wrap leading-relaxed", l.kind === "err" && "text-danger")}>
            {l.text}
          </div>
        ))}
        <div className="flex items-center gap-2">
          <span className="text-primary">{prompt}</span>
          <input
            ref={inputRef}
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            className="flex-1 bg-transparent outline-none text-terminal-foreground caret-primary"
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
}
