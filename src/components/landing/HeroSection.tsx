import { motion, type Easing } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Brain, Sparkles, Zap, Calendar, ArrowRight, Play, MessageSquare, ListTodo, Clock } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Link } from "react-router-dom";
import heroVisualization from "@/assets/hero-visualization.png";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Planning",
    description: "Let AI analyze your goals and create the perfect daily schedule automatically.",
  },
  {
    icon: Zap,
    title: "Smart Task Breakdown",
    description: "Complex tasks are automatically broken into manageable, time-blocked chunks.",
  },
  {
    icon: Calendar,
    title: "Adaptive Scheduling",
    description: "Your plan adapts in real-time based on your energy levels and progress.",
  },
];

const steps = [
  {
    icon: MessageSquare,
    title: "Tell us your goals",
    description: "Share what you want to accomplish today or this week.",
  },
  {
    icon: ListTodo,
    title: "AI generates your plan",
    description: "Get a personalized schedule with time blocks and focus tasks.",
  },
  {
    icon: Clock,
    title: "Track & adjust",
    description: "Mark tasks complete and let AI reschedule as needed.",
  },
];

const easeOut: Easing = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

export function HeroSection() {
  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary/20 blur-[100px]"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-secondary/20 blur-[100px]"
            animate={{
              x: [0, -50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-success/5 blur-[120px]"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <motion.div
          className="relative z-10 max-w-6xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              AI-Powered Productivity
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 tracking-tight"
          >
            <span className="text-foreground">Your personal AI that</span>
            <br />
            <span className="text-gradient-primary">plans your day</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            VibePlanner uses AI to auto-generate daily plans, break down tasks, and schedule your day — so you can focus on what matters.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link to="/onboarding">
              <Button className="h-14 px-10 text-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold shadow-glow-md hover:shadow-glow-lg hover:scale-[1.02] active:scale-[0.98] transition-all group">
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="outline" className="h-14 px-10 text-lg bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-primary/30">
              <Play className="w-5 h-5" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            variants={itemVariants}
            className="relative mx-auto max-w-4xl"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
            <motion.img
              src={heroVisualization}
              alt="VibePlanner AI Dashboard"
              className="rounded-2xl shadow-2xl shadow-primary/10 border border-white/5"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* How it works section */}
      <section id="how-it-works" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              How it <span className="text-gradient-primary">works</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to a more productive day
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="h-full text-center relative overflow-visible">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-lg font-bold text-primary-foreground shadow-glow-md">
                    {index + 1}
                  </div>
                  <div className="pt-8">
                    <div className="w-16 h-16 mx-auto rounded-xl bg-muted flex items-center justify-center mb-4">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-display font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features section */}
      <section id="features" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Built for <span className="text-gradient-primary">productivity</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to master your time
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="h-full text-left group">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-2 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <GlassCard glow className="text-center py-16">
              <Sparkles className="w-12 h-12 mx-auto text-primary mb-6" />
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Ready to transform your productivity?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
                Join thousands of people who have taken control of their time with AI.
              </p>
              <Link to="/onboarding">
                <Button className="h-14 px-10 text-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold shadow-glow-md hover:shadow-glow-lg hover:scale-[1.02] active:scale-[0.98] transition-all group">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Brain className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-semibold text-foreground">VibePlanner</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 VibePlanner. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
