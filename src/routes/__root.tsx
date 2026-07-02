import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import "../styles.css";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { TopNav } from "@/components/top-nav";
import { AiAssistant } from "@/components/ai-assistant";
import { Shield } from "lucide-react";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-primary">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">Try the command palette (⌘K) or head home.</p>
        <Link to="/" className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Go home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <div className="mt-6 flex justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">Try again</button>
          <a href="/" className="rounded-md border border-border px-4 py-2 text-sm">Home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CyberSec — The Complete Ethical Hacking Learning Hub" },
      { name: "description", content: "Learn ethical hacking end-to-end: theory, interactive labs, tools, Linux practice, and an AI assistant. No login required." },
      { name: "author", content: "CyberSec" },
      { property: "og:title", content: "CyberSec — Ethical Hacking Learning Hub" },
      { property: "og:description", content: "Theory + Practical + AI + Linux + Labs. A documentation-style hub for ethical hackers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-panel/50 py-8 mt-16">
      <div className="mx-auto max-w-[1600px] px-4 grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-display font-bold"><Shield className="h-4 w-4 text-primary" />CyberSec</div>
          <p className="mt-2 text-xs text-muted-foreground">A documentation-first ethical hacking hub. Built for learners.</p>
        </div>
        <div>
          <div className="mb-2 text-sm font-semibold">Learn</div>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li><Link to="/phases">Phases</Link></li>
            <li><Link to="/tools">Tools</Link></li>
            <li><Link to="/linux">Linux</Link></li>
            <li><Link to="/labs">Labs</Link></li>
          </ul>
        </div>
        <div>
          <div className="mb-2 text-sm font-semibold">Reference</div>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li><Link to="/cheatsheets">Cheatsheets</Link></li>
            <li><Link to="/glossary">Glossary</Link></li>
            <li><Link to="/resources">Resources</Link></li>
            <li><Link to="/challenges">Challenges</Link></li>
          </ul>
        </div>
        <div>
          <div className="mb-2 text-sm font-semibold">About</div>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li><Link to="/about">About</Link></li>
            <li>Legal: for educational use only</li>
            <li>v1.0.0</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen">
        <TopNav />
        <main className="mx-auto max-w-[1600px] px-4 py-8">
          <Outlet />
        </main>
        <Footer />
        <AiAssistant />
      </div>
    </QueryClientProvider>
  );
}
