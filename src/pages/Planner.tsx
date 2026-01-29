import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { TimelineView } from "@/components/planner/TimelineView";
import { FocusTasks } from "@/components/planner/FocusTasks";
import { AIInputBar } from "@/components/planner/AIInputBar";
import { ProductivityScore } from "@/components/planner/ProductivityScore";
import { 
  Brain, 
  Calendar, 
  Settings, 
  Sun, 
  Moon,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { format } from "date-fns";

export interface TimeBlock {
  id: string;
  start: string;
  end: string;
  title: string;
  category: "work" | "study" | "health" | "personal" | "finance";
  priority: "high" | "medium" | "low";
  completed: boolean;
  focusTips?: string[];
}

export interface Task {
  id: string;
  title: string;
  estimateMinutes: number;
  priority: "high" | "medium" | "low";
  completed: boolean;
}

// Mock data for demo
const mockTimeBlocks: TimeBlock[] = [
  {
    id: "1",
    start: "06:00",
    end: "07:00",
    title: "Morning routine",
    category: "personal",
    priority: "low",
    completed: true,
  },
  {
    id: "2",
    start: "07:00",
    end: "08:00",
    title: "Exercise & meditation",
    category: "health",
    priority: "medium",
    completed: true,
  },
  {
    id: "3",
    start: "09:00",
    end: "12:00",
    title: "Deep work session",
    category: "work",
    priority: "high",
    completed: false,
    focusTips: ["Pomodoro 50/10", "No distractions"],
  },
  {
    id: "4",
    start: "12:00",
    end: "13:00",
    title: "Lunch break",
    category: "personal",
    priority: "low",
    completed: false,
  },
  {
    id: "5",
    start: "14:00",
    end: "16:00",
    title: "Study - Advanced TypeScript",
    category: "study",
    priority: "high",
    completed: false,
    focusTips: ["Take notes", "Practice exercises"],
  },
  {
    id: "6",
    start: "16:30",
    end: "17:30",
    title: "Budget review",
    category: "finance",
    priority: "medium",
    completed: false,
  },
];

const mockTasks: Task[] = [
  { id: "t1", title: "Complete project proposal", estimateMinutes: 90, priority: "high", completed: false },
  { id: "t2", title: "Review study materials", estimateMinutes: 45, priority: "high", completed: false },
  { id: "t3", title: "Plan next week's meals", estimateMinutes: 20, priority: "medium", completed: false },
];

export default function Planner() {
  const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>(mockTimeBlocks);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [isAIThinking, setIsAIThinking] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const greeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const completedBlocks = timeBlocks.filter((b) => b.completed).length;
  const productivityScore = Math.round((completedBlocks / timeBlocks.length) * 100);

  const toggleBlockCompletion = (id: string) => {
    setTimeBlocks((blocks) =>
      blocks.map((b) => (b.id === id ? { ...b, completed: !b.completed } : b))
    );
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks((t) =>
      t.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  };

  const handleAISubmit = async (prompt: string) => {
    setIsAIThinking(true);
    // Simulate AI response delay (would integrate with real AI later)
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsAIThinking(false);
    // In real implementation, this would update timeBlocks and tasks based on AI response
  };

  return (
    <div className="min-h-screen bg-background noise-texture">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 glass-card mx-4 mt-4 mb-6 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow-sm group-hover:shadow-glow-md transition-shadow">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-semibold text-xl text-foreground hidden sm:block">
              VibePlanner
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Calendar className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/50 to-secondary/50 flex items-center justify-center text-sm font-medium">
            G
          </div>
        </div>
      </header>

      <main className="px-4 pb-32 max-w-7xl mx-auto">
        {/* Greeting Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
            {currentTime.getHours() < 17 ? (
              <Sun className="w-4 h-4 text-warning" />
            ) : (
              <Moon className="w-4 h-4 text-secondary" />
            )}
            {format(currentTime, "EEEE, MMMM d")}
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold">
            {greeting()}, <span className="text-gradient-primary">Guest</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's your plan for today. You've got this! 💪
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Timeline Section */}
          <div className="lg:col-span-2 space-y-6">
            <GlassCard className="overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-semibold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Today's Schedule
                </h2>
                <span className="text-sm text-muted-foreground">
                  {completedBlocks}/{timeBlocks.length} completed
                </span>
              </div>
              <TimelineView
                blocks={timeBlocks}
                currentTime={currentTime}
                onToggleComplete={toggleBlockCompletion}
              />
            </GlassCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Productivity Score */}
            <ProductivityScore score={productivityScore} />

            {/* Focus Tasks */}
            <GlassCard>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-display font-semibold">Top Focus</h2>
                <Button variant="ghost" size="sm" className="text-primary">
                  View all
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <FocusTasks tasks={tasks} onToggleComplete={toggleTaskCompletion} />
            </GlassCard>

            {/* Quick Actions */}
            <GlassCard>
              <h2 className="text-lg font-display font-semibold mb-4">Life Buckets</h2>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { label: "Work", color: "category-work" },
                  { label: "Study", color: "category-study" },
                  { label: "Health", color: "category-health" },
                  { label: "Personal", color: "category-personal" },
                  { label: "Finance", color: "category-finance" },
                ].map((bucket) => (
                  <div
                    key={bucket.label}
                    className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className={`w-8 h-8 rounded-full ${bucket.color}`} />
                    <span className="text-xs text-muted-foreground">{bucket.label}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </main>

      {/* AI Input Bar */}
      <AIInputBar onSubmit={handleAISubmit} isThinking={isAIThinking} />
    </div>
  );
}
