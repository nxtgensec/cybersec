import { createFileRoute, notFound } from "@tanstack/react-router";
import { getPhase } from "@/content";
import { LearningPage } from "@/components/learning-page";

export const Route = createFileRoute("/phases/$slug")({
  head: ({ params }) => {
    const phase = getPhase(params.slug);
    return {
      meta: phase
        ? [
            { title: `${phase.title} — Ethical Hacking Phase — CyberSec` },
            { name: "description", content: phase.tagline },
            { property: "og:title", content: `${phase.title} — CyberSec` },
            { property: "og:description", content: phase.tagline },
          ]
        : [{ title: "Phase not found — CyberSec" }],
    };
  },
  loader: ({ params }) => {
    const phase = getPhase(params.slug);
    if (!phase) throw notFound();
    return phase;
  },
  component: PhasePage,
});

function PhasePage() {
  const phase = Route.useLoaderData();
  return <LearningPage topic={phase} />;
}
