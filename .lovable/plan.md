
# CyberSec — Ethical Hacking Learning Hub (v1)

A dark, documentation-style ethical hacking learning platform. No login. Every page directly accessible. Local (browser) progress only.

## Scope for this pass

**Deeply built:**
- Global shell (top nav, collapsible left sidebar, right TOC sidebar, footer)
- Homepage (hero, animated grid/terminal backdrop, roadmap flow, phase cards, feature grid)
- All 6 Ethical Hacking phase pages with real content (Recon → Post-Exploitation), each following the standard learning-topic structure
- Linux Practice Center (categories + command reference + embedded simulated terminal)
- Simulated Kali-style terminal (custom in-browser shell with virtual filesystem, history, autocomplete, tabs, clear, copy) — reused on Linux page, in labs, and as a standalone `/terminal` route
- Floating AI Assistant (Lovable AI / `google/gemini-3-flash-preview`, streaming, scoped to cybersecurity)
- Cheatsheets index + Recon/Nmap/Linux cheatsheets with real content
- Global search (fuzzy over pages, commands, tools, glossary)
- Glossary (browsable + searchable, ~40 real terms)
- Local progress + bookmarks (localStorage): completed pages, quiz scores, recently viewed

**Structured but lighter (real navigation, real page shell, curated but shorter content):**
- Tool Library index + 8 flagship tool pages with the standard tool template (Nmap, Wireshark, Burp, Gobuster, Hydra, Metasploit, SQLMap, Hashcat). Remaining tools listed as coming-soon cards inside the same index.
- Labs index with ~6 guided beginner/intermediate walkthrough labs (no live VMs; steps + expected output + AI hint button)
- Challenges index with quizzes wired to each phase + 3 mini command-recall challenges
- Resources/Downloads page (curated links, cheatsheet downloads)
- About page

## Design system

- Deep black background `#07090b`, panel `#0d1117`, card `#111826`
- Primary cyber green `#00ff9c` (accessible variant `#22c55e` for text on dark)
- Foreground white / muted gray
- Accent orange `#f59e0b` — warning callouts only
- Fonts: **Space Grotesk** (headings), **Inter** (body), **JetBrains Mono** (code/terminal) — loaded via `<link>` in `__root.tsx`
- All tokens as CSS variables in `src/styles.css` (`@theme inline`, oklch). No hardcoded colors in components.
- Restrained motion: subtle grid + scanline on hero, hover glows, no gratuitous animation elsewhere
- Callout boxes: `Tip` (green), `Note` (blue-gray), `Warning` (orange)

## Route architecture (TanStack Start file routes)

```
src/routes/
  __root.tsx                    (shell: TopNav + LeftSidebar + Outlet + RightTOC + Footer)
  index.tsx                     (homepage)
  phases.index.tsx              (roadmap overview)
  phases.reconnaissance.tsx
  phases.scanning.tsx
  phases.enumeration.tsx
  phases.vulnerability-assessment.tsx
  phases.exploitation.tsx
  phases.post-exploitation.tsx
  linux.tsx                     (Linux practice center)
  terminal.tsx                  (fullscreen terminal)
  tools.index.tsx
  tools.$slug.tsx               (dynamic tool page, driven by content registry)
  labs.index.tsx
  labs.$slug.tsx
  challenges.tsx
  cheatsheets.index.tsx
  cheatsheets.$slug.tsx
  glossary.tsx
  resources.tsx
  about.tsx
  api/chat.ts                   (AI assistant streaming route)
```

Each route defines its own `head()` with unique title + description + og:title/description. Hero images added at leaf routes only.

## Standard page template (used by every phase & tool)

Reusable `<LearningPage>` component composing:
1. Breadcrumb + hero banner
2. Tabs: Theory · Practical · Lab · AI · Notes
3. Sections rendered from a typed content object: Introduction, Why It Matters, Real-World Scenario, Objectives, Core Theory, Diagram, Workflow, Commands, Tool Usage, Expected Output, Common Mistakes, Mini Lab, Practice Questions, Interview Questions, Cheatsheet, References, Summary, Next Topic
4. Right sidebar auto-generates Table of Contents from headings
5. "Mark complete" + "Bookmark" writes to localStorage

Content lives in `src/content/phases/*.ts` and `src/content/tools/*.ts` as typed objects — keeps pages consistent and lets search/glossary/roadmap consume the same source of truth.

## Simulated terminal

`src/components/terminal/` — a React terminal with:
- Virtual FS (nested object), `pwd`, `ls`, `cd`, `cat`, `echo`, `mkdir`, `touch`, `rm`, `whoami`, `id`, `uname`, `history`, `clear`, `help`, `man <cmd>`
- Cybersecurity command stubs with canned realistic output: `nmap`, `whois`, `dig`, `nslookup`, `ping`, `curl`, `nc`, `hydra --help`, `sqlmap --help` — output is scripted, no real network calls
- Up/Down history, Tab autocomplete, Ctrl+L clear, copy button, multiple tabs
- Practice mode: given a challenge, checks whether the last command matches an expected pattern

## AI Assistant

- Floating button bottom-right on every page, opens a docked chat panel
- Also embedded inside every lab as "Explain / Hint / Show Concept" buttons that prefill prompts
- Backend: `src/routes/api/chat.ts` streaming route using the Lovable AI Gateway helper (`createLovableAiGatewayProvider`) and `google/gemini-3-flash-preview`
- System prompt scopes the model to cybersecurity/ethical hacking topics only; refuses off-topic requests
- Uses `@ai-sdk/react` `useChat` + `DefaultChatTransport` on the client
- Renders `message.parts` with `react-markdown` + syntax highlighting
- No conversation persistence (single-session), no thread list — matches "AI assistant" scope, not a chat-agent app
- Requires enabling Lovable Cloud (for LOVABLE_API_KEY) and adding `ai`, `@ai-sdk/react`, `@ai-sdk/openai-compatible`, `react-markdown`, `zod`, `fuse.js` packages

## Search & glossary

- `Cmd/Ctrl+K` opens command palette (shadcn `Command`)
- Fuse.js index built from the content registry: pages, tools, commands, glossary terms
- Glossary page renders same dataset as a browsable A–Z list

## Local progress

`src/lib/progress.ts` — small typed wrapper over localStorage for:
- `completedPages: string[]`, `bookmarks: string[]`, `quizScores: Record<slug, number>`, `recentlyViewed: string[]`
- Reactive via a small `useLocalState` hook; SSR-safe (guarded with `typeof window`)

## Technical notes

- Stack: TanStack Start (already scaffolded), Tailwind v4, shadcn/ui (already present)
- No database. Lovable Cloud is enabled only to auto-provision `LOVABLE_API_KEY` for the AI route
- All AI calls are server-side in `api/chat.ts`; `LOVABLE_API_KEY` never touches the client
- Diagrams: hand-authored inline SVG components (roadmap flow, packet flow, attack lifecycle) — no heavy diagram library
- Code blocks: `shiki` at build-time via a lightweight wrapper, or a minimal Prism setup; copy-to-clipboard button
- All colors go through CSS design tokens in `src/styles.css`; no hex/`text-white`/`bg-black` in components
- Responsive: sidebars collapse on tablet; drawer on mobile

## What's intentionally out of scope for this pass

- Real container-backed shell / WebContainers (using scripted simulator per your answer)
- Every tool from the 40+ list gets its own deep page — only 8 flagship tools are fully built; rest are index cards with a "coming soon" template
- Multi-thread AI conversation history / persistence
- Video embeds and PDF generation (buttons present, link to placeholders)
- Auth / user accounts (explicitly not required)

## Build order

1. Enable Lovable Cloud, install deps, add design tokens + fonts
2. Global shell (TopNav, LeftSidebar, RightTOC, Footer, CommandPalette, ThemeProvider defaulting dark)
3. `LearningPage` template + content type + progress/bookmark hooks
4. Homepage with hero + roadmap SVG + phase cards
5. Six phase content files + phase routes
6. Linux center + terminal component + `/terminal` route
7. Tool library index + 8 tool content files + `tools.$slug`
8. Labs, Challenges, Cheatsheets, Glossary, Resources, About
9. `api/chat.ts` + floating AI assistant + in-lab AI buttons
10. Search index wiring + Cmd-K palette
11. SEO metadata pass on every route, verify build

