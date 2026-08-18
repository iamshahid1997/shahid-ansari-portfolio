import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

type Sport = "football" | "cricket" | "badminton";

const TABS: { id: Sport; label: string; emoji: string; color: string }[] = [
  { id: "football", label: "FOOTBALL", emoji: "⚽", color: "hsl(var(--git-green))" },
  { id: "cricket", label: "CRICKET", emoji: "🏏", color: "hsl(var(--git-red))" },
  { id: "badminton", label: "BADMINTON", emoji: "🏸", color: "hsl(var(--git-cyan))" },
];

/* ---------- FOOTBALL: penalty shootout ---------- */
const FootballGame = ({ onScore }: { onScore: () => void }) => {
  const [shot, setShot] = useState<null | { x: number; y: number; saved: boolean }>(null);
  const [keeperX, setKeeperX] = useState(0);
  const reqRef = useRef<number>();

  useEffect(() => {
    let dir = 1;
    const tick = () => {
      setKeeperX((k) => {
        const next = k + dir * 1.6;
        if (next > 70 || next < -70) dir *= -1;
        return next;
      });
      reqRef.current = requestAnimationFrame(tick);
    };
    reqRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(reqRef.current!);
  }, []);

  const aim = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shot) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100 - 50; // -50..50
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const targetX = x * 2.4; // amplify
    const targetY = -120 - (60 - y);
    const saved = Math.abs(targetX - keeperX) < 28 && targetY > -160;
    setShot({ x: targetX, y: targetY, saved });
    if (!saved) onScore();
    setTimeout(() => setShot(null), 1400);
  };

  return (
    <div className="relative w-full h-[260px] rounded-xl overflow-hidden border border-term-border select-none"
         style={{ background: "linear-gradient(180deg, hsl(120 30% 25%), hsl(120 35% 18%))" }}>
      {/* field stripes */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className="absolute inset-x-0 h-[20%]" style={{ top: `${i * 20}%`, background: i % 2 ? "rgba(255,255,255,0.04)" : "transparent" }} />
      ))}
      {/* goal */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[78%] h-[80px] border-4 border-white/90 rounded-sm"
           style={{ background: "repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0 6px, transparent 6px 12px)" }} />
      {/* keeper */}
      <motion.div
        animate={{ x: keeperX }}
        transition={{ type: "tween", duration: 0.05 }}
        className="absolute top-[58px] left-1/2 -translate-x-1/2 w-10 h-12 rounded-md flex items-center justify-center text-2xl"
        style={{ background: "hsl(var(--git-yellow))" }}
      >
        🧤
      </motion.div>
      {/* target zone */}
      <div className="absolute inset-0 cursor-crosshair" onClick={aim}>
        {/* ball */}
        <motion.div
          animate={shot ? { x: shot.x, y: shot.y, scale: 0.6, rotate: 720 } : { x: 0, y: 0, scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 text-3xl"
        >
          ⚽
        </motion.div>
      </div>
      <AnimatePresence>
        {shot && (
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <span className="font-display text-6xl px-6 py-2 rounded-lg backdrop-blur-sm"
                  style={{ background: "rgba(0,0,0,0.5)", color: shot.saved ? "hsl(var(--git-red))" : "hsl(var(--git-green))" }}>
              {shot.saved ? "SAVED!" : "GOAL!"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute bottom-2 left-3 font-mono text-[10px] text-white/70">click anywhere in the goal to shoot</div>
    </div>
  );
};

/* ---------- CRICKET: timing-bar six ---------- */
const CricketGame = ({ onScore }: { onScore: (runs: number) => void }) => {
  const [pos, setPos] = useState(0);
  const [dir, setDir] = useState(1);
  const [hit, setHit] = useState<null | { runs: number; label: string }>(null);
  const reqRef = useRef<number>();

  useEffect(() => {
    const tick = () => {
      setPos((p) => {
        let next = p + dir * 1.4;
        if (next > 100) { next = 100; setDir(-1); }
        if (next < 0) { next = 0; setDir(1); }
        return next;
      });
      reqRef.current = requestAnimationFrame(tick);
    };
    reqRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(reqRef.current!);
  }, [dir]);

  const swing = () => {
    if (hit) return;
    let runs = 0; let label = "OUT";
    if (pos >= 45 && pos <= 55) { runs = 6; label = "SIX!"; }
    else if (pos >= 35 && pos <= 65) { runs = 4; label = "FOUR!"; }
    else if (pos >= 20 && pos <= 80) { runs = 2; label = "TWO"; }
    else { runs = 0; label = "OUT"; }
    setHit({ runs, label });
    onScore(runs);
    setTimeout(() => setHit(null), 1500);
  };

  return (
    <div className="relative w-full h-[260px] rounded-xl overflow-hidden border border-term-border"
         style={{ background: "radial-gradient(ellipse at center, hsl(35 60% 55%) 0%, hsl(30 50% 35%) 100%)" }}>
      {/* pitch */}
      <div className="absolute left-1/2 -translate-x-1/2 top-6 bottom-6 w-20 rounded-sm" style={{ background: "hsl(40 50% 75%)" }} />
      <div className="absolute left-1/2 -translate-x-1/2 top-10 w-1 h-6 bg-amber-900" />
      <div className="absolute left-1/2 -translate-x-1/2 bottom-10 w-1 h-6 bg-amber-900" />

      {/* timing bar */}
      <div className="absolute bottom-12 left-6 right-6">
        <div className="font-mono text-[10px] text-white/80 mb-1">TIMING</div>
        <div className="relative h-6 rounded-full overflow-hidden border border-white/40" style={{ background: "rgba(0,0,0,0.4)" }}>
          {/* zones */}
          <div className="absolute inset-y-0 left-[20%] right-[20%] bg-yellow-500/40" />
          <div className="absolute inset-y-0 left-[35%] right-[35%] bg-orange-500/50" />
          <div className="absolute inset-y-0 left-[45%] right-[45%] bg-green-500/70" />
          {/* pointer */}
          <motion.div
            animate={{ left: `${pos}%` }}
            transition={{ duration: 0.05, ease: "linear" }}
            className="absolute top-0 bottom-0 w-1 -translate-x-1/2 bg-white shadow-[0_0_8px_white]"
          />
        </div>
      </div>

      <button
        onClick={swing}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 rounded-md font-mono text-xs bg-white/90 text-black hover:bg-white"
      >
        SWING
      </button>

      <AnimatePresence>
        {hit && (
          <motion.div
            initial={{ scale: 0.4, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <span className="font-display text-5xl px-5 py-2 rounded-lg backdrop-blur-sm"
                  style={{ background: "rgba(0,0,0,0.55)", color: hit.runs >= 4 ? "hsl(var(--git-green))" : hit.runs > 0 ? "hsl(var(--git-yellow))" : "hsl(var(--git-red))" }}>
              {hit.label}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ---------- BADMINTON: rally drag ---------- */
const BadmintonGame = ({ onScore }: { onScore: () => void }) => {
  const [count, setCount] = useState(0);
  const [pos, setPos] = useState({ x: 50, y: 30 });
  const [vel, setVel] = useState({ x: 0.8, y: 0.6 });
  const reqRef = useRef<number>();

  useEffect(() => {
    const tick = () => {
      setPos((p) => {
        let nx = p.x + vel.x;
        let ny = p.y + vel.y;
        let nvx = vel.x; let nvy = vel.y;
        if (nx < 4 || nx > 96) { nvx = -vel.x; nx = Math.max(4, Math.min(96, nx)); }
        if (ny < 4) { nvy = -vel.y; ny = 4; }
        if (ny > 96) { ny = 30; nx = 50; nvx = (Math.random() - 0.5) * 1.6; nvy = 0.6; }
        if (nvx !== vel.x || nvy !== vel.y) setVel({ x: nvx, y: nvy });
        return { x: nx, y: ny };
      });
      reqRef.current = requestAnimationFrame(tick);
    };
    reqRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(reqRef.current!);
  }, [vel]);

  const smash = () => {
    setCount((c) => c + 1);
    onScore();
    setVel({ x: (Math.random() - 0.5) * 2.4, y: -Math.abs(vel.y) - 0.4 });
    setPos((p) => ({ ...p, y: Math.max(4, p.y - 8) }));
  };

  return (
    <div className="relative w-full h-[260px] rounded-xl overflow-hidden border border-term-border"
         style={{ background: "linear-gradient(180deg, hsl(210 30% 18%) 0%, hsl(210 30% 12%) 100%)" }}>
      {/* court lines */}
      <div className="absolute inset-3 border-2 border-white/30 rounded-sm" />
      <div className="absolute inset-x-3 top-1/2 h-[2px] bg-white/40" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[10px] text-white/40">NET</div>

      {/* shuttle */}
      <motion.button
        onClick={smash}
        animate={{ left: `${pos.x}%`, top: `${pos.y}%` }}
        transition={{ duration: 0.05, ease: "linear" }}
        whileHover={{ scale: 1.4 }}
        whileTap={{ scale: 0.85 }}
        className="absolute -translate-x-1/2 -translate-y-1/2 text-2xl cursor-crosshair"
      >
        🏸
      </motion.button>

      {/* counter */}
      <div className="absolute top-2 right-3 font-mono text-xs text-white/80 bg-black/40 px-2 py-1 rounded">
        rally: <span className="text-[hsl(var(--git-cyan))] font-bold">{count}</span>
      </div>
      <div className="absolute bottom-2 left-3 font-mono text-[10px] text-white/60">
        click the shuttle to keep the rally alive
      </div>
    </div>
  );
};

export const SportsArcade = () => {
  const [active, setActive] = useState<Sport>("football");
  const [scores, setScores] = useState({ football: 0, cricket: 0, badminton: 0 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md"
    >
      {/* arcade frame */}
      <div className="rounded-2xl border-2 border-term-border bg-term-bg shadow-paper overflow-hidden">
        {/* CRT header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-term-border bg-background-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="font-mono text-[10px] text-foreground-muted tracking-widest">SHAHID-ARCADE.exe</div>
          <div className="font-mono text-[10px] text-[hsl(var(--git-green))] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--git-green))] animate-pulse" />
            LIVE
          </div>
        </div>

        {/* tab strip */}
        <div className="flex border-b border-term-border bg-background">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`relative flex-1 py-2 font-mono text-[11px] tracking-wider transition-colors ${active === t.id ? "text-foreground" : "text-foreground-muted hover:text-foreground"}`}
            >
              <span className="mr-1.5">{t.emoji}</span>
              {t.label}
              {active === t.id && (
                <motion.div layoutId="arcade-tab" className="absolute inset-x-0 bottom-0 h-0.5" style={{ background: t.color }} />
              )}
            </button>
          ))}
        </div>

        {/* game viewport */}
        <div className="p-3 relative">
          <div className="absolute inset-3 pointer-events-none rounded-xl" style={{ boxShadow: "inset 0 0 60px rgba(0,0,0,0.4)" }} />
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
            >
              {active === "football" && <FootballGame onScore={() => setScores((s) => ({ ...s, football: s.football + 1 }))} />}
              {active === "cricket" && <CricketGame onScore={(r) => setScores((s) => ({ ...s, cricket: s.cricket + r }))} />}
              {active === "badminton" && <BadmintonGame onScore={() => setScores((s) => ({ ...s, badminton: s.badminton + 1 }))} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* scoreboard */}
        <div className="grid grid-cols-3 border-t border-term-border bg-background-2 font-mono text-[10px]">
          <div className="px-3 py-2 text-center border-r border-term-border">
            <div className="text-foreground-muted">⚽ GOALS</div>
            <div className="text-base text-[hsl(var(--git-green))] font-bold">{String(scores.football).padStart(2, "0")}</div>
          </div>
          <div className="px-3 py-2 text-center border-r border-term-border">
            <div className="text-foreground-muted">🏏 RUNS</div>
            <div className="text-base text-[hsl(var(--git-red))] font-bold">{String(scores.cricket).padStart(3, "0")}</div>
          </div>
          <div className="px-3 py-2 text-center">
            <div className="text-foreground-muted">🏸 RALLY</div>
            <div className="text-base text-[hsl(var(--git-cyan))] font-bold">{String(scores.badminton).padStart(2, "0")}</div>
          </div>
        </div>
      </div>
      <p className="font-hand text-base text-primary mt-2 text-center">play between deploys ↑</p>
    </motion.div>
  );
};
