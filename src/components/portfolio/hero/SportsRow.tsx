import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { useRef, useState } from "react";

const Football = () => {
  const y = useMotionValue(0);
  const start = useRef(Date.now());
  const [kicked, setKicked] = useState(false);

  useAnimationFrame(() => {
    if (kicked) return;
    const t = (Date.now() - start.current) / 1000;
    y.set(-Math.abs(Math.sin(t * 2.4)) * 18);
  });

  return (
    <div className="relative flex flex-col items-center">
      <motion.button
        onClick={() => {
          setKicked(true);
          setTimeout(() => setKicked(false), 1200);
        }}
        animate={
          kicked
            ? { x: [0, 200, 0], y: [0, -120, 0], rotate: [0, 720, 0] }
            : { x: 0, rotate: [0, 8, -8, 0] }
        }
        transition={
          kicked
            ? { duration: 1.2, ease: "easeOut" }
            : { duration: 3, repeat: Infinity }
        }
        style={{ y }}
        whileHover={{ scale: 1.15 }}
        className="cursor-pointer"
      >
        <svg width="48" height="48" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="22" fill="#f5f1ea" stroke="#1a1a1a" strokeWidth="1.5" />
          <polygon
            points="24,12 30,17 28,24 20,24 18,17"
            fill="#1a1a1a"
          />
          <line x1="24" y1="2" x2="24" y2="12" stroke="#1a1a1a" strokeWidth="1.2" />
          <line x1="30" y1="17" x2="40" y2="14" stroke="#1a1a1a" strokeWidth="1.2" />
          <line x1="18" y1="17" x2="8" y2="14" stroke="#1a1a1a" strokeWidth="1.2" />
          <line x1="20" y1="24" x2="16" y2="36" stroke="#1a1a1a" strokeWidth="1.2" />
          <line x1="28" y1="24" x2="32" y2="36" stroke="#1a1a1a" strokeWidth="1.2" />
        </svg>
      </motion.button>
      {/* Shadow */}
      <div className="w-10 h-1.5 rounded-full bg-black/30 blur-sm mt-1" />
      <span className="font-hand text-base text-primary mt-1">90' goal!</span>
    </div>
  );
};

const CricketBat = () => {
  const [swung, setSwung] = useState(false);

  return (
    <div
      className="relative flex flex-col items-center group cursor-pointer"
      onMouseEnter={() => setSwung(true)}
      onMouseLeave={() => setTimeout(() => setSwung(false), 600)}
    >
      <div className="relative w-20 h-20">
        {/* Bat */}
        <motion.svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          animate={swung ? { rotate: [-100, 30, -100] } : { rotate: -100 }}
          transition={{ duration: 0.6 }}
          style={{ originX: "20%", originY: "80%" }}
          className="absolute inset-0"
        >
          <rect x="14" y="10" width="6" height="22" rx="2" fill="#a87145" />
          <rect x="11" y="32" width="12" height="32" rx="3" fill="#e8c89a" stroke="#a87145" strokeWidth="1" />
          <line x1="13" y1="38" x2="21" y2="38" stroke="#a87145" strokeWidth="0.6" />
          <line x1="13" y1="46" x2="21" y2="46" stroke="#a87145" strokeWidth="0.6" />
          <line x1="13" y1="54" x2="21" y2="54" stroke="#a87145" strokeWidth="0.6" />
        </motion.svg>

        {/* Ball */}
        <motion.div
          animate={
            swung
              ? { x: [0, 60, 120], y: [0, -40, -10], opacity: [1, 1, 0] }
              : { x: 0, y: 0, opacity: 1 }
          }
          transition={{ duration: 0.6 }}
          className="absolute right-1 bottom-2 w-3 h-3 rounded-full bg-git-red shadow-md"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 30%, hsl(0 70% 70%), hsl(var(--git-red)))",
          }}
        />
      </div>
      <span className="font-hand text-base text-primary mt-1">six!</span>
    </div>
  );
};

const Shuttlecock = () => {
  const y = useMotionValue(0);
  const x = useMotionValue(0);
  const start = useRef(Date.now());

  useAnimationFrame(() => {
    const t = (Date.now() - start.current) / 1000;
    y.set(Math.sin(t * 1.2) * 14);
    x.set(Math.sin(t * 0.7) * 10);
  });

  return (
    <div className="relative flex flex-col items-center">
      <motion.div
        drag
        dragSnapToOrigin
        dragElastic={0.4}
        style={{ y, x }}
        whileHover={{ scale: 1.15, rotate: 12 }}
        className="cursor-grab active:cursor-grabbing"
      >
        <svg width="44" height="56" viewBox="0 0 44 56">
          {/* Cork */}
          <ellipse cx="22" cy="46" rx="9" ry="7" fill="#f5f1ea" stroke="#1a1a1a" strokeWidth="1" />
          {/* Feathers */}
          <path d="M 22 46 L 6 8 L 14 14 Z" fill="#f5f1ea" stroke="#1a1a1a" strokeWidth="0.8" />
          <path d="M 22 46 L 14 4 L 22 12 Z" fill="#f5f1ea" stroke="#1a1a1a" strokeWidth="0.8" />
          <path d="M 22 46 L 22 4 L 30 12 Z" fill="#f5f1ea" stroke="#1a1a1a" strokeWidth="0.8" />
          <path d="M 22 46 L 30 4 L 38 14 Z" fill="#f5f1ea" stroke="#1a1a1a" strokeWidth="0.8" />
          <path d="M 22 46 L 38 8 L 38 18 Z" fill="#f5f1ea" stroke="#1a1a1a" strokeWidth="0.8" />
        </svg>
      </motion.div>
      <span className="font-hand text-base text-primary mt-1">smash!</span>
    </div>
  );
};

export const SportsRow = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1, staggerChildren: 0.15 }}
    className="flex items-end gap-10"
  >
    <Football />
    <CricketBat />
    <Shuttlecock />
  </motion.div>
);
