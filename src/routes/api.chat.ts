import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

const SYSTEM_PROMPT = `You are the CyberSec Assistant, an AI helper for an ethical hacking learning hub.

You ONLY answer questions related to:
- Cybersecurity, ethical hacking, penetration testing, red-team / blue-team topics
- Networking, Linux, Windows internals as they relate to security
- Programming/scripting for security tooling
- Explaining commands, output, vulnerabilities, CVEs, tools, techniques
- Study guidance, lab hints, quiz explanations

If a user asks anything off-topic (general chit-chat, unrelated coding, personal advice, etc.), politely refuse in one sentence and steer them back to security topics.

You MUST NOT:
- Provide operational assistance to attack systems the user does not own or have permission to test
- Provide functional malware, zero-day exploits, working ransomware, or evasion tools
- Provide personally identifying information or help with doxing

When explaining, be concise, use markdown, prefer short paragraphs, and include code blocks with the correct language when helpful.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as { messages?: UIMessage[] };
        if (!Array.isArray(body.messages)) {
          return new Response("Messages are required", { status: 400 });
        }
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const gateway = createLovableAiGatewayProvider(key);
        const model = gateway("google/gemini-3-flash-preview");

        const result = streamText({
          model,
          system: SYSTEM_PROMPT,
          messages: await convertToModelMessages(body.messages),
        });

        return result.toUIMessageStreamResponse({ originalMessages: body.messages });
      },
    },
  },
});
