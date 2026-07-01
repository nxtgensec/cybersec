import { Info, Lightbulb, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Callout as CalloutType } from "@/content/types";

const iconMap = {
  tip: Lightbulb,
  note: Info,
  warning: TriangleAlert,
};

const styles = {
  tip: "border-primary/40 bg-primary/5 text-foreground",
  note: "border-info/40 bg-info/5 text-foreground",
  warning: "border-warning/40 bg-warning/5 text-foreground",
};

const iconColor = {
  tip: "text-primary",
  note: "text-info",
  warning: "text-warning",
};

export function Callout({ type, title, body, children }: Partial<CalloutType> & { children?: React.ReactNode }) {
  const kind = type ?? "note";
  const Icon = iconMap[kind];
  return (
    <div className={cn("my-4 flex gap-3 rounded-lg border-l-4 p-4", styles[kind])}>
      <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", iconColor[kind])} />
      <div className="flex-1">
        {title && <div className="mb-1 font-semibold">{title}</div>}
        <div className="text-sm leading-relaxed text-muted-foreground">{body || children}</div>
      </div>
    </div>
  );
}
