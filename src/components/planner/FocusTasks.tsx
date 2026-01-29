import { motion } from "framer-motion";
import { Check, Clock, AlertCircle } from "lucide-react";
import type { Task } from "@/pages/Planner";

interface FocusTasksProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
}

const priorityIcons = {
  high: AlertCircle,
  medium: Clock,
  low: Clock,
};

const priorityColors = {
  high: "text-destructive",
  medium: "text-warning",
  low: "text-muted-foreground",
};

export function FocusTasks({ tasks, onToggleComplete }: FocusTasksProps) {
  const topTasks = tasks.slice(0, 3);

  return (
    <div className="space-y-3">
      {topTasks.map((task, index) => {
        const PriorityIcon = priorityIcons[task.priority];

        return (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onToggleComplete(task.id)}
            className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-muted/50 group
              ${task.completed ? "opacity-50" : ""}
            `}
          >
            {/* Checkbox */}
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all
                ${
                  task.completed
                    ? "bg-success border-success"
                    : "border-muted-foreground/30 group-hover:border-primary"
                }
              `}
            >
              {task.completed && <Check className="w-3 h-3 text-success-foreground" />}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className={`font-medium text-sm ${task.completed ? "line-through" : ""}`}>
                {task.title}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <PriorityIcon className={`w-3 h-3 ${priorityColors[task.priority]}`} />
                <span className="text-xs text-muted-foreground">
                  {task.estimateMinutes} min
                </span>
              </div>
            </div>

            {/* Priority indicator */}
            <div
              className={`w-2 h-2 rounded-full flex-shrink-0 mt-2
                ${task.priority === "high" ? "bg-destructive" : ""}
                ${task.priority === "medium" ? "bg-warning" : ""}
                ${task.priority === "low" ? "bg-success" : ""}
              `}
            />
          </motion.div>
        );
      })}

      {topTasks.length === 0 && (
        <p className="text-center text-muted-foreground text-sm py-4">
          No focus tasks yet. Ask the AI to help plan your day!
        </p>
      )}
    </div>
  );
}
