import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import { useNavigate } from "@tanstack/react-router";
import { phases, tools } from "@/content";
import { glossary } from "@/content/glossary";
import { linuxCommands } from "@/content/linux";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

type Entry = { id: string; title: string; sub: string; to: string; kind: string };

function buildIndex(): Entry[] {
  const all: Entry[] = [];
  phases.forEach((p) => all.push({ id: `phase-${p.slug}`, title: p.title, sub: p.tagline, to: `/phases/${p.slug}`, kind: "Phase" }));
  tools.forEach((t) => all.push({ id: `tool-${t.slug}`, title: t.title, sub: t.tagline, to: `/tools/${t.slug}`, kind: "Tool" }));
  glossary.forEach((g) => all.push({ id: `gloss-${g.term}`, title: g.term, sub: g.short, to: `/glossary#${g.term}`, kind: "Glossary" }));
  linuxCommands.forEach((c) => all.push({ id: `lin-${c.cmd}`, title: c.cmd, sub: c.desc, to: `/linux#${encodeURIComponent(c.cmd)}`, kind: "Linux" }));
  return all;
}

export function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const entries = useMemo(buildIndex, []);
  const fuse = useMemo(() => new Fuse(entries, { keys: ["title", "sub"], threshold: 0.35 }), [entries]);
  const results = query ? fuse.search(query).slice(0, 20).map((r) => r.item) : entries.slice(0, 15);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); onOpenChange(!open); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onOpenChange]);

  const grouped = results.reduce((acc, r) => {
    (acc[r.kind] ??= []).push(r);
    return acc;
  }, {} as Record<string, Entry[]>);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search phases, tools, commands, glossary…" value={query} onValueChange={setQuery} />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        {Object.entries(grouped).map(([kind, items]) => (
          <CommandGroup key={kind} heading={kind}>
            {items.map((r) => (
              <CommandItem
                key={r.id}
                value={r.id}
                onSelect={() => {
                  onOpenChange(false);
                  const [path, hash] = r.to.split("#");
                  navigate({ to: path, hash });
                }}
              >
                <div className="flex flex-col">
                  <span className="font-medium">{r.title}</span>
                  <span className="text-xs text-muted-foreground">{r.sub}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
