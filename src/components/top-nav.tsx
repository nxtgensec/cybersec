import { Link, useRouterState } from "@tanstack/react-router";
import { Terminal, Github, Shield, Search } from "lucide-react";
import { CommandPalette } from "./command-palette";
import { useState } from "react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/phases", label: "Phases" },
  { to: "/tools", label: "Tools" },
  { to: "/linux", label: "Linux" },
  { to: "/labs", label: "Labs" },
  { to: "/challenges", label: "Challenges" },
  { to: "/cheatsheets", label: "Cheatsheets" },
  { to: "/glossary", label: "Glossary" },
  { to: "/resources", label: "Resources" },
];

export function TopNav() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1600px] items-center gap-6 px-4">
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
            <Shield className="h-5 w-5 text-primary" />
            <span>
              Cyber<span className="text-primary">Sec</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => {
              const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`rounded-md px-3 py-1.5 text-sm transition ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setPaletteOpen(true)}
              className="flex items-center gap-2 rounded-md border border-border bg-panel px-3 py-1.5 text-sm text-muted-foreground transition hover:border-primary/50"
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Search…</span>
              <kbd className="hidden rounded bg-muted px-1.5 py-0.5 text-xs sm:inline">⌘K</kbd>
            </button>
            <Link
              to="/terminal"
              className="hidden items-center gap-2 rounded-md border border-border bg-panel px-3 py-1.5 text-sm text-muted-foreground transition hover:border-primary/50 hover:text-primary md:flex"
            >
              <Terminal className="h-4 w-4" />
              Terminal
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-md p-2 text-muted-foreground hover:text-primary"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </>
  );
}
