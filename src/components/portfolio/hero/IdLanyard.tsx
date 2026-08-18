import { motion, useMotionValue, useSpring, useTransform, useAnimationFrame, MotionValue } from "framer-motion";
import { useRef, useState } from "react";
import { AvatarSvg } from "./AvatarSvg";

// ── Geometry (single source of truth) ───────────────────────────────────────
const SVG_W = 220;
const CARD_W = 180;
const CARD_H = 250;
const PIN_Y = 10;
const CARD_TOP = 150; // distance from pin to top edge of card
const TOTAL_H = CARD_TOP + CARD_H + 12;
const CX = SVG_W / 2; // pin center x
// Cord attaches to two grommets near top corners of the card
const GROMMET_INSET = 18;
const GROMMET_Y_FROM_TOP = 10;

// ── Reactive cord (V-shape, two strings, follow card transform) ─────────────
const Cord = ({ swing }: { swing: MotionValue<number> }) => {
  const path = useTransform(swing, (s) => {
    const rot = s * 8 * (Math.PI / 180);
    const tx = s * 30;
    const cardCx = CX + tx;
    const cardCy = CARD_TOP + CARD_H / 2;
    const cos = Math.cos(rot);
    const sin = Math.sin(rot);

    // Local coords (card center = origin) of the two grommet points
    const gy = -CARD_H / 2 + GROMMET_Y_FROM_TOP;
    const gxL = -CARD_W / 2 + GROMMET_INSET;
    const gxR = CARD_W / 2 - GROMMET_INSET;

    // Apply rotation around the card center
    const lx = cardCx + gxL * cos - gy * sin;
    const ly = cardCy + gxL * sin + gy * cos;
    const rx = cardCx + gxR * cos - gy * sin;
    const ry = cardCy + gxR * sin + gy * cos;

    // Subtle catenary-like sag on each rope
    const lcx = (CX + lx) / 2 - 4;
    const lcy = (PIN_Y + ly) / 2 + 10;
    const rcx = (CX + rx) / 2 + 4;
    const rcy = (PIN_Y + ry) / 2 + 10;

    return `M ${CX} ${PIN_Y} Q ${lcx} ${lcy} ${lx} ${ly} M ${CX} ${PIN_Y} Q ${rcx} ${rcy} ${rx} ${ry}`;
  });

  return (
    <svg
      width={SVG_W}
      height={TOTAL_H}
      viewBox={`0 0 ${SVG_W} ${TOTAL_H}`}
      className="absolute left-0 top-0 pointer-events-none overflow-visible"
    >
      <defs>
        <linearGradient id="cordGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--primary) / 0.7)" />
        </linearGradient>
      </defs>
      {/* shadow under cord for depth */}
      <motion.path
        d={path}
        stroke="rgba(0,0,0,0.4)"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        transform="translate(1.5, 2)"
      />
      <motion.path
        d={path}
        stroke="url(#cordGrad)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      {/* highlight on cord */}
      <motion.path
        d={path}
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};

export const IdLanyard = () => {
  const [hovered, setHovered] = useState(false);
  const swing = useMotionValue(0);
  const smoothSwing = useSpring(swing, { stiffness: 60, damping: 12 });
  const cardRotate = useTransform(smoothSwing, [-1, 1], [-8, 8]);
  const cardX = useTransform(smoothSwing, [-1, 1], [-30, 30]);
  const startTime = useRef(Date.now());

  useAnimationFrame(() => {
    const t = (Date.now() - startTime.current) / 1000;
    const idle = Math.sin(t * 0.8) * 0.12 + Math.sin(t * 1.3) * 0.04;
    swing.set(idle);
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -120 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 80, damping: 12 }}
      className="relative select-none mx-auto"
      style={{ width: SVG_W, height: TOTAL_H }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Pin / nail */}
      <div
        className="absolute z-20"
        style={{ left: CX - 8, top: PIN_Y - 8 }}
      >
        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-stone-300 to-stone-500 shadow-[0_2px_4px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.4)]" />
      </div>

      {/* Cord */}
      <Cord swing={smoothSwing} />

      {/* Card */}
      <motion.div
        drag
        dragConstraints={{ left: -40, right: 40, top: -10, bottom: 30 }}
        dragElastic={0.6}
        onDrag={(_, info) => swing.set(info.offset.x / 60)}
        onDragEnd={() => swing.set(0)}
        style={{
          rotate: cardRotate,
          x: cardX,
          top: CARD_TOP,
          left: CX - CARD_W / 2,
          width: CARD_W,
          height: CARD_H,
          transformOrigin: `50% -${CARD_TOP - PIN_Y}px`,
        }}
        whileHover={{ scale: 1.04 }}
        animate={{ scale: hovered ? 1.04 : 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className="absolute rounded-xl bg-gradient-to-br from-stone-100 to-stone-200 shadow-paper cursor-grab active:cursor-grabbing overflow-hidden z-10"
      >
        {/* Top bar + grommets (visible holes the cord passes through) */}
        <div className="h-7 bg-primary flex items-center justify-center relative">
          <span className="font-mono text-[9px] tracking-[0.2em] text-primary-foreground font-bold">
            EMPLOYEE · ID
          </span>
          <div
            className="absolute rounded-full bg-stone-900 ring-1 ring-stone-100/40 shadow-inner"
            style={{
              width: 8,
              height: 8,
              left: GROMMET_INSET - 4,
              top: GROMMET_Y_FROM_TOP - 4,
            }}
          />
          <div
            className="absolute rounded-full bg-stone-900 ring-1 ring-stone-100/40 shadow-inner"
            style={{
              width: 8,
              height: 8,
              right: GROMMET_INSET - 4,
              top: GROMMET_Y_FROM_TOP - 4,
            }}
          />
        </div>

        {/* Avatar */}
        <div className="px-4 pt-3">
          <div className="aspect-square rounded-lg overflow-hidden bg-stone-300 ring-2 ring-stone-900/10">
            <AvatarSvg smiling={hovered} />
          </div>
        </div>

        {/* Info */}
        <div className="px-4 pt-2">
          <p className="font-display text-stone-900 text-[15px] leading-tight">
            Shahid Ansari
          </p>
          <p className="font-mono text-[8px] text-stone-600 tracking-wider mt-0.5">
            FRONTEND · ENGINEER
          </p>
        </div>

        {/* Barcode pinned to bottom, away from text */}
        <div className="absolute bottom-2 left-3 right-3 flex items-end gap-[1px] h-3 opacity-80">
          {Array.from({ length: 32 }).map((_, i) => (
            <div
              key={i}
              className="bg-stone-900"
              style={{
                width: 1 + (i % 3),
                height: `${50 + ((i * 37) % 50)}%`,
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
