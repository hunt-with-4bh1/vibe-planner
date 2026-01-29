import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Brain, GraduationCap, Briefcase, Clock, Target, ArrowRight, ArrowLeft, Sparkles, Check } from "lucide-react";

type Role = "student" | "working" | "both" | null;
type WakeTime = "early" | "normal" | "late" | null;

interface OnboardingData {
  role: Role;
  wakeTime: WakeTime;
  goals: string[];
}

const roles = [
  { id: "student" as Role, icon: GraduationCap, label: "Student", desc: "Full-time or part-time student" },
  { id: "working" as Role, icon: Briefcase, label: "Working", desc: "Full-time or freelance work" },
  { id: "both" as Role, icon: Sparkles, label: "Both", desc: "Student + working" },
];

const wakeTimes = [
  { id: "early" as WakeTime, time: "5-7 AM", label: "Early Bird", emoji: "🌅" },
  { id: "normal" as WakeTime, time: "7-9 AM", label: "Normal", emoji: "☀️" },
  { id: "late" as WakeTime, time: "9 AM+", label: "Night Owl", emoji: "🦉" },
];

const goalOptions = [
  { id: "productivity", label: "Increase productivity", emoji: "📈" },
  { id: "balance", label: "Better work-life balance", emoji: "⚖️" },
  { id: "health", label: "Improve health habits", emoji: "💪" },
  { id: "learning", label: "Learn new skills", emoji: "📚" },
  { id: "focus", label: "Deep focus time", emoji: "🎯" },
  { id: "stress", label: "Reduce stress", emoji: "🧘" },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    role: null,
    wakeTime: null,
    goals: [],
  });

  const canProceed = () => {
    if (step === 0) return data.role !== null;
    if (step === 1) return data.wakeTime !== null;
    if (step === 2) return data.goals.length > 0;
    return true;
  };

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      // Save to localStorage for guest mode
      localStorage.setItem("vibeplanner_onboarding", JSON.stringify(data));
      localStorage.setItem("vibeplanner_guest_id", `guest_${Date.now()}`);
      navigate("/planner");
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const toggleGoal = (goalId: string) => {
    setData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goalId)
        ? prev.goals.filter((g) => g !== goalId)
        : [...prev.goals, goalId],
    }));
  };

  return (
    <div className="min-h-screen bg-background noise-texture flex flex-col">
      {/* Header */}
      <div className="px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow-sm">
            <Brain className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-semibold text-xl text-foreground">VibePlanner</span>
        </div>
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === step
                  ? "w-8 bg-primary shadow-glow-sm"
                  : i < step
                  ? "w-2 bg-primary/50"
                  : "w-2 bg-muted"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step-0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">What describes you best?</h1>
                  <p className="text-muted-foreground text-lg">This helps us tailor your schedule</p>
                </div>

                <div className="grid gap-4">
                  {roles.map((role) => (
                    <GlassCard
                      key={role.id}
                      className={`cursor-pointer transition-all duration-200 ${
                        data.role === role.id
                          ? "border-primary/50 shadow-glow-sm"
                          : "hover:border-primary/20"
                      }`}
                      onClick={() => setData((prev) => ({ ...prev, role: role.id }))}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                            data.role === role.id ? "bg-primary/20" : "bg-muted"
                          }`}
                        >
                          <role.icon className={`w-6 h-6 ${data.role === role.id ? "text-primary" : "text-muted-foreground"}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{role.label}</h3>
                          <p className="text-muted-foreground text-sm">{role.desc}</p>
                        </div>
                        {data.role === role.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                          >
                            <Check className="w-4 h-4 text-primary-foreground" />
                          </motion.div>
                        )}
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <Clock className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">When do you wake up?</h1>
                  <p className="text-muted-foreground text-lg">We'll optimize your schedule around your rhythm</p>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  {wakeTimes.map((time) => (
                    <GlassCard
                      key={time.id}
                      className={`cursor-pointer text-center transition-all duration-200 ${
                        data.wakeTime === time.id
                          ? "border-primary/50 shadow-glow-sm"
                          : "hover:border-primary/20"
                      }`}
                      onClick={() => setData((prev) => ({ ...prev, wakeTime: time.id }))}
                    >
                      <div className="text-4xl mb-3">{time.emoji}</div>
                      <h3 className="font-semibold text-lg mb-1">{time.label}</h3>
                      <p className="text-muted-foreground text-sm">{time.time}</p>
                      {data.wakeTime === time.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                        >
                          <Check className="w-3 h-3 text-primary-foreground" />
                        </motion.div>
                      )}
                    </GlassCard>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <Target className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">What are your goals?</h1>
                  <p className="text-muted-foreground text-lg">Select all that apply</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {goalOptions.map((goal) => (
                    <GlassCard
                      key={goal.id}
                      className={`cursor-pointer transition-all duration-200 ${
                        data.goals.includes(goal.id)
                          ? "border-primary/50 shadow-glow-sm"
                          : "hover:border-primary/20"
                      }`}
                      onClick={() => toggleGoal(goal.id)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{goal.emoji}</span>
                        <span className="font-medium">{goal.label}</span>
                        {data.goals.includes(goal.id) && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="ml-auto w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                          >
                            <Check className="w-3 h-3 text-primary-foreground" />
                          </motion.div>
                        )}
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-6 flex items-center justify-between border-t border-border">
        <Button
          variant="ghost"
          onClick={handleBack}
          disabled={step === 0}
          className={step === 0 ? "invisible" : ""}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button onClick={handleNext} disabled={!canProceed()} className="min-w-[120px]">
          {step === 2 ? "Start Planning" : "Continue"}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
