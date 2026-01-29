import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mic, Send, Sparkles, Loader2 } from "lucide-react";

interface AIInputBarProps {
  onSubmit: (prompt: string) => void;
  isThinking: boolean;
}

const quickPrompts = [
  "Plan my morning",
  "Add a workout",
  "Schedule deep work",
  "Add a break",
];

export function AIInputBar({ onSubmit, isThinking }: AIInputBarProps) {
  const [input, setInput] = useState("");
  const [showQuick, setShowQuick] = useState(false);

  const handleSubmit = () => {
    if (input.trim() && !isThinking) {
      onSubmit(input.trim());
      setInput("");
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    onSubmit(prompt);
    setShowQuick(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Quick prompts */}
        <AnimatePresence>
          {showQuick && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex flex-wrap gap-2 mb-3 justify-center"
            >
              {quickPrompts.map((prompt) => (
                <Button
                  key={prompt}
                  variant="glass"
                  size="sm"
                  onClick={() => handleQuickPrompt(prompt)}
                  className="text-xs"
                >
                  {prompt}
                </Button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input bar */}
        <div className="glass-card p-2 flex items-center gap-2 shadow-glow-md">
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 text-muted-foreground hover:text-primary"
            onClick={() => setShowQuick(!showQuick)}
          >
            <Sparkles className="w-5 h-5" />
          </Button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Talk to your day... (e.g., 'Plan my morning')"
            className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
            disabled={isThinking}
          />

          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 text-muted-foreground hover:text-primary"
          >
            <Mic className="w-5 h-5" />
          </Button>

          <Button
            size="icon"
            onClick={handleSubmit}
            disabled={!input.trim() || isThinking}
            className="flex-shrink-0"
          >
            {isThinking ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* AI thinking indicator */}
        <AnimatePresence>
          {isThinking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center mt-3"
            >
              <span className="inline-flex items-center gap-2 text-sm text-primary">
                <Sparkles className="w-4 h-4 animate-pulse" />
                AI is thinking...
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
