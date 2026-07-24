import { formatDepth } from "@/lib/utils";
import { Waves } from "lucide-react";

interface DepthBadgeProps {
  depthMeters: number;
  className?: string;
}

export default function DepthBadge({ depthMeters, className = "" }: DepthBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-deep/20 px-2.5 py-0.5 text-xs font-medium text-sky-300 ${className}`}
      aria-label={`Depth: ${formatDepth(depthMeters)}`}
    >
      <Waves className="h-3 w-3" />
      {formatDepth(depthMeters)}
    </span>
  );
}
