import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Smartphone, Laptop, Watch, Headphones } from "lucide-react";

const devices = [
  {
    id: "iphone",
    label: "iPhone — Shahid",
    icon: Smartphone,
    angle: 60,
    distance: 38,
    fact: "Currently shipping a feature on a 6.1\" screen at 2am.",
  },
  {
    id: "mac",
    label: "MacBook Pro — work",
    icon: Laptop,
    angle: 160,
    distance: 30,
    fact: "127 tabs open. 0 regrets.",
  },
  {
    id: "watch",
    label: "Apple Watch",
    icon: Watch,
    angle: 250,
    distance: 36,
    fact: "Reminding me to stand. I am, in fact, sitting.",
  },
  {
    id: "buds",
    label: "AirPods Pro",
    icon: Headphones,
    angle: 330,
    distance: 32,
    fact: "Lo-fi has been playing for 4 days straight.",
  },
];

export const AirdropPane = () => {
  const [active, setActive] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState<string | null>(null);

  const send = (id: string, fact: string) => {
    setSentTo(id);
    setActive(id);
    setTimeout(() => setSentTo(null), 2400);
  };

  return (
    <div className="relative font-mono text-xs h-[440px] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-mac-divider bg-background-2/30">
        <div className="flex items-center gap-2">
          <motion.span
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-mac-blue"
          />
          <span className="text-foreground/90">AirDrop</span>
          <span className="text-foreground-muted/60">· Everyone</span>
        </div>
        <span className="text-foreground-muted/60 text-[10px]">
          {devices.length} devices nearby
        </span>
      </div>

      {/* Radar */}
      <div className="absolute inset-0 top-[42px] flex items-center justify-center">
        {/* Concentric rings */}
        {[1, 2, 3, 4].map((r) => (
          <motion.div
            key={r}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: [0, 0.3, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: r * 0.8,
              ease: "easeOut",
            }}
            className="absolute rounded-full border border-mac-blue"
            style={{ width: r * 110, height: r * 110 }}
          />
        ))}
        {/* Sweep */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="absolute w-[440px] h-[440px] rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, hsl(var(--mac-blue) / 0.18) 30deg, transparent 60deg)",
            mask: "radial-gradient(circle at center, transparent 30px, #000 30px, #000 220px, transparent 220px)",
            WebkitMask:
              "radial-gradient(circle at center, transparent 30px, #000 30px, #000 220px, transparent 220px)",
          }}
        />

        {/* Center: you */}
        <div className="absolute w-14 h-14 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center font-display text-xl text-primary z-10">
          you
        </div>

        {/* Devices */}
        {devices.map((d) => {
          const rad = (d.angle * Math.PI) / 180;
          const x = Math.cos(rad) * (d.distance * 4);
          const y = Math.sin(rad) * (d.distance * 4);
          const isActive = active === d.id;
          const isSending = sentTo === d.id;
          return (
            <motion.button
              key={d.id}
              initial={{ x, y, opacity: 0, scale: 0 }}
              animate={{ x, y, opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.15 }}
              onClick={() => send(d.id, d.fact)}
              className="absolute group"
            >
              <motion.div
                animate={
                  isSending
                    ? { boxShadow: ["0 0 0 0 hsl(var(--mac-blue) / 0.5)", "0 0 0 30px hsl(var(--mac-blue) / 0)"] }
                    : {}
                }
                transition={{ duration: 1, repeat: isSending ? 2 : 0 }}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors ${
                  isActive
                    ? "bg-mac-blue text-white border-mac-blue"
                    : "bg-background-2 border-mac-divider text-mac-blue group-hover:border-mac-blue"
                }`}
              >
                <d.icon size={18} />
              </motion.div>
              <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 whitespace-nowrap text-[10px] text-foreground-muted opacity-0 group-hover:opacity-100 transition-opacity">
                {d.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Toast / fact */}
      <AnimatePresence>
        {active && (
          <motion.div
            key={active}
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            className="absolute bottom-4 left-4 right-4 mx-auto max-w-md rounded-xl border border-mac-divider bg-mac-window/95 backdrop-blur p-4 z-20"
          >
            <p className="text-[10px] text-mac-blue uppercase tracking-wider mb-1">
              {sentTo ? "Sending to " : "From "}
              {devices.find((d) => d.id === active)?.label}
            </p>
            <p className="text-foreground/90 text-sm font-sans italic">
              "{devices.find((d) => d.id === active)?.fact}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
