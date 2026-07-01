import { createFileRoute, notFound } from "@tanstack/react-router";
import { getTool } from "@/content";
import { LearningPage } from "@/components/learning-page";

export const Route = createFileRoute("/tools/$slug")({
  head: ({ params }) => {
    const tool = getTool(params.slug);
    return {
      meta: tool
        ? [
            { title: `${tool.title} — Tool Guide — CyberSec` },
            { name: "description", content: tool.tagline },
            { property: "og:title", content: `${tool.title} — CyberSec` },
            { property: "og:description", content: tool.tagline },
          ]
        : [{ title: "Tool not found — CyberSec" }],
    };
  },
  loader: ({ params }) => {
    const tool = getTool(params.slug);
    if (!tool) throw notFound();
    return tool;
  },
  component: ToolPage,
});

function ToolPage() {
  const tool = Route.useLoaderData();
  return <LearningPage topic={tool} />;
}
