import { motion } from "framer-motion";
import { Check, Clock, Zap } from "lucide-react";
import type { TimeBlock } from "@/pages/Planner";

interface TimelineViewProps {
  blocks: TimeBlock[];
  currentTime: Date;
  onToggleComplete: (id: string) => void;
}

const categoryColors = {
  work: "from-[hsl(200,100%,55%)] to-[hsl(200,100%,45%)]",
  study: "from-[hsl(270,100%,65%)] to-[hsl(270,100%,55%)]",
  health: "from-[hsl(90,100%,50%)] to-[hsl(90,100%,40%)]",
  personal: "from-[hsl(45,100%,55%)] to-[hsl(45,100%,45%)]",
  finance: "from-[hsl(160,100%,45%)] to-[hsl(160,100%,35%)]",
};

const priorityStyles = {
  high: "border-l-destructive",
  medium: "border-l-warning",
  low: "border-l-success",
};

export function TimelineView({ blocks, currentTime, onToggleComplete }: TimelineViewProps) {
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  const currentTimeString = `${currentHour.toString().padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`;

  const isCurrentBlock = (block: TimeBlock) => {
    return currentTimeString >= block.start && currentTimeString < block.end;
  };

  const isPastBlock = (block: TimeBlock) => {
    return currentTimeString >= block.end;
  };

  return (
    <div className="space-y-3">
      {blocks.map((block, index) => {
        const isCurrent = isCurrentBlock(block);
        const isPast = isPastBlock(block);

        return (
          <motion.div
            key={block.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`relative flex gap-4 p-4 rounded-xl border-l-4 transition-all duration-200 cursor-pointer group
              ${priorityStyles[block.priority]}
              ${isCurrent ? "bg-primary/10 border-primary/30 shadow-glow-sm" : "bg-muted/30 hover:bg-muted/50"}
              ${block.completed ? "opacity-60" : ""}
            `}
            onClick={() => onToggleComplete(block.id)}
          >
            {/* Time Column */}
            <div className="flex flex-col items-center min-w-[60px]">
              <span className={`text-sm font-medium ${isCurrent ? "text-primary" : "text-muted-foreground"}`}>
                {block.start}
              </span>
              <div className="h-full w-px bg-border my-1" />
              <span className="text-xs text-muted-foreground">{block.end}</span>
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className={`font-medium ${block.completed ? "line-through" : ""}`}>
                    {block.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r ${
                        categoryColors[block.category]
                      } text-white`}
                    >
                      {block.category}
                    </span>
                    {isCurrent && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary">
                        <Zap className="w-3 h-3" />
                        In progress
                      </span>
                    )}
                  </div>
                </div>

                {/* Completion Checkbox */}
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                    ${
                      block.completed
                        ? "bg-success border-success"
                        : "border-muted-foreground/30 group-hover:border-primary"
                    }
                  `}
                >
                  {block.completed && <Check className="w-4 h-4 text-success-foreground" />}
                </div>
              </div>

              {/* Focus Tips */}
              {block.focusTips && block.focusTips.length > 0 && !block.completed && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {block.focusTips.map((tip, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs bg-muted text-muted-foreground"
                    >
                      <Clock className="w-3 h-3" />
                      {tip}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Current time indicator */}
            {isCurrent && (
              <motion.div
                className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full shadow-glow-sm"
                layoutId="currentIndicator"
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
