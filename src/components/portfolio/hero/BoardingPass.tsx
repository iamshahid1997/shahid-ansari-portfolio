import { motion } from "framer-motion";
import { Plane } from "lucide-react";

const ROUTE = ["NRA", "JAI", "DEL", "GGN", "BLR"];
const FULL_NAMES: Record<string, string> = {
  NRA: "Narora",
  JAI: "Jaipur",
  DEL: "Delhi",
  GGN: "Gurgaon",
  BLR: "Bengaluru",
};

export const BoardingPass = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30, rotate: -8 }}
      animate={{ opacity: 1, y: 0, rotate: -6 }}
      transition={{ delay: 0.8, type: "spring" }}
      whileHover={{ rotate: 0, y: -6, scale: 1.03 }}
      className="relative w-[360px] bg-stone-100 text-stone-900 rounded-md shadow-paper font-mono overflow-hidden cursor-pointer"
    >
      {/* Header */}
      <div className="bg-stone-900 text-stone-100 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Plane size={14} className="text-primary" />
          <span className="text-[10px] tracking-[0.25em] font-bold">
            SHAHID AIRLINES
          </span>
        </div>
        <span className="text-[9px] tracking-widest opacity-70">BOARDING PASS</span>
      </div>

      <div className="flex">
        {/* Main stub */}
        <div className="flex-1 p-4">
          <p className="text-[9px] tracking-widest text-stone-500">PASSENGER</p>
          <p className="font-display text-xl leading-tight">SHAHID / ANSARI</p>

          <div className="mt-3 flex items-center justify-between gap-2">
            <div>
              <p className="text-[9px] text-stone-500 tracking-widest">FROM</p>
              <p className="font-display text-3xl leading-none">{ROUTE[0]}</p>
              <p className="text-[9px] text-stone-600">{FULL_NAMES[ROUTE[0]]}</p>
            </div>

            {/* Mini route line */}
            <div className="flex-1 relative h-6 mx-1">
              <motion.div
                className="absolute top-1/2 left-0 right-0 h-px bg-stone-400"
                style={{ borderTop: "1px dashed currentColor" }}
              />
              <motion.div
                animate={{ x: ["0%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 -translate-y-1/2 text-stone-900"
              >
                <Plane size={12} className="rotate-90" />
              </motion.div>
            </div>

            <div className="text-right">
              <p className="text-[9px] text-stone-500 tracking-widest">TO</p>
              <p className="font-display text-3xl leading-none">
                {ROUTE[ROUTE.length - 1]}
              </p>
              <p className="text-[9px] text-stone-600">
                {FULL_NAMES[ROUTE[ROUTE.length - 1]]}
              </p>
            </div>
          </div>

          {/* Stops */}
          <div className="mt-3 flex items-center gap-1 text-[9px] text-stone-500">
            <span>VIA</span>
            {ROUTE.slice(1, -1).map((c) => (
              <span
                key={c}
                className="px-1.5 py-0.5 bg-stone-200 rounded text-stone-700"
              >
                {c}
              </span>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2 text-[9px]">
            <div>
              <p className="text-stone-500 tracking-widest">GATE</p>
              <p className="font-bold text-sm">SDE-2</p>
            </div>
            <div>
              <p className="text-stone-500 tracking-widest">SEAT</p>
              <p className="font-bold text-sm">5 YRS</p>
            </div>
            <div>
              <p className="text-stone-500 tracking-widest">STATUS</p>
              <p className="font-bold text-sm text-git-green">BOARDED</p>
            </div>
          </div>
        </div>

        {/* Perforated divider */}
        <div className="relative w-px">
          <div
            className="absolute inset-y-2 left-0"
            style={{
              borderLeft: "2px dashed hsl(var(--mac-divider))",
            }}
          />
          <div className="absolute -left-2 -top-2 w-4 h-4 rounded-full bg-background" />
          <div className="absolute -left-2 -bottom-2 w-4 h-4 rounded-full bg-background" />
        </div>

        {/* Stub */}
        <div className="w-24 p-3 bg-stone-200/60">
          <p className="text-[8px] tracking-widest text-stone-500">FLIGHT</p>
          <p className="font-bold text-sm">SA · 1997</p>
          <p className="text-[8px] tracking-widest text-stone-500 mt-2">DATE</p>
          <p className="font-bold text-xs">2020 → ∞</p>
          <div className="mt-3 flex items-end gap-[1px] h-6">
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={i}
                className="bg-stone-900"
                style={{
                  width: 1 + (i % 2),
                  height: `${50 + ((i * 31) % 50)}%`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
