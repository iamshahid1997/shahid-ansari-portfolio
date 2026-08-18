import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const COLORS = [
  "hsl(24 75% 64%)",
  "hsl(140 60% 55%)",
  "hsl(45 90% 60%)",
  "hsl(190 70% 60%)",
  "hsl(320 70% 65%)",
];

interface Confetti {
  id: number;
  x: number;
  y: number;
  rot: number;
  color: string;
}

export const KonamiEasterEgg = () => {
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let buf: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      buf = [...buf, k].slice(-SEQUENCE.length);
      // progress hint for power users
      let match = 0;
      for (let i = 0; i < buf.length; i++) {
        if (buf[i] === SEQUENCE[i]) match++;
        else {
          match = 0;
          break;
        }
      }
      setProgress(match);
      if (buf.join(",") === SEQUENCE.join(",")) {
        fire();
        buf = [];
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const fire = () => {
    toast.success("⚡ Cheat code unlocked: 30 lines of bonus polish.");
    const next = Array.from({ length: 80 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * window.innerWidth,
      y: -20,
      rot: Math.random() * 360,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));
    setConfetti(next);
    setTimeout(() => setConfetti([]), 4000);
  };

  return (
    <>
      {progress > 2 && progress < SEQUENCE.length && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[55] font-mono text-[10px] text-foreground-muted bg-background-2/80 backdrop-blur px-2 py-1 rounded">
          {progress}/{SEQUENCE.length}
        </div>
      )}
      <AnimatePresence>
        {confetti.map((c) => (
          <motion.span
            key={c.id}
            initial={{ x: c.x, y: c.y, rotate: c.rot, opacity: 1 }}
            animate={{
              y: window.innerHeight + 50,
              rotate: c.rot + 720,
              x: c.x + (Math.random() - 0.5) * 200,
              opacity: 0,
            }}
            transition={{ duration: 3 + Math.random() * 1.5, ease: "easeOut" }}
            style={{ background: c.color }}
            className="pointer-events-none fixed top-0 left-0 w-2 h-3 rounded-sm z-[100]"
          />
        ))}
      </AnimatePresence>
    </>
  );
};
