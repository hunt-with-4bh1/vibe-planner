import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

interface ProductivityScoreProps {
  score: number;
}

export function ProductivityScore({ score }: ProductivityScoreProps) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreColor = () => {
    if (score >= 80) return "text-success";
    if (score >= 50) return "text-warning";
    return "text-destructive";
  };

  const getScoreMessage = () => {
    if (score >= 80) return "Amazing progress! 🔥";
    if (score >= 50) return "Keep going! 💪";
    return "Let's get started! 🚀";
  };

  return (
    <GlassCard glow className="text-center">
      <div className="flex items-center justify-center mb-4">
        <div className="relative w-28 h-28">
          {/* Background circle */}
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="56"
              cy="56"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-muted"
            />
            {/* Progress circle */}
            <motion.circle
              cx="56"
              cy="56"
              r={radius}
              stroke="url(#progressGradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(185, 100%, 50%)" />
                <stop offset="100%" stopColor="hsl(270, 100%, 65%)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Score text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              className={`text-3xl font-display font-bold ${getScoreColor()}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              {score}%
            </motion.span>
          </div>
        </div>
      </div>

      <h3 className="font-display font-semibold text-lg mb-1">Productivity Score</h3>
      <p className="text-muted-foreground text-sm flex items-center justify-center gap-1">
        <TrendingUp className="w-4 h-4 text-success" />
        {getScoreMessage()}
      </p>
    </GlassCard>
  );
}
