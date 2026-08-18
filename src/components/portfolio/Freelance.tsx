import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  Code,
  Layers,
  Palette,
  Plug,
  Zap,
  Gamepad2,
  Sparkles,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { freelanceServices, socialLinks } from "@/data/portfolio";

const iconMap = {
  code: Code,
  layers: Layers,
  palette: Palette,
  plug: Plug,
  zap: Zap,
  gamepad: Gamepad2,
};

const timelines = [
  { label: "Yesterday", emoji: "😱", note: "panic mode (and I love it)" },
  { label: "This week", emoji: "🚀", note: "tight, but doable" },
  { label: "This month", emoji: "😌", note: "comfy pace, room to polish" },
  { label: "Whenever's clever", emoji: "🧘", note: "we ship when it's right" },
];

const vibes = [
  { id: "minimal", label: "Minimal & fast", color: "bg-foreground", note: "less, but better" },
  { id: "playful", label: "Playful & weird", color: "bg-primary", note: "dial it to 11" },
  { id: "polished", label: "Enterprise-polish", color: "bg-mac-blue", note: "boardroom-ready" },
];

const taglines: Record<string, string> = {
  minimal: "A site so clean your design lead will whisper.",
  playful: "Awwwards bait, but with substance.",
  polished: "Enterprise-grade UI that the C-suite will demo.",
};

/* ------------------------------------------------------------------ */
/* Magnetic CTA                                                        */
/* ------------------------------------------------------------------ */
const MagneticCTA = ({ children, href }: { children: React.ReactNode; href: string }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.4);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.4);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className="group relative inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-primary text-primary-foreground font-medium text-sm sm:text-base overflow-hidden shadow-paper"
    >
      <span className="absolute inset-0 bg-gradient-to-r from-primary via-git-yellow to-primary bg-[length:200%_100%] animate-[gradientShift_3s_ease-in-out_infinite] opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="relative flex items-center gap-3">
        {children}
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </span>
    </motion.a>
  );
};

/* ------------------------------------------------------------------ */
/* Card wrapper — torn-paper sticky note                               */
/* ------------------------------------------------------------------ */
const StepCard = ({
  step,
  title,
  hint,
  children,
}: {
  step: number;
  title: string;
  hint: string;
  children: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ delay: step * 0.1, type: "spring", stiffness: 80 }}
    className="relative rounded-2xl border border-border bg-background-2/60 p-5 sm:p-6"
  >
    <div className="flex items-center gap-3 mb-4">
      <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground font-display text-base flex items-center justify-center shrink-0">
        {step}
      </span>
      <div>
        <h3 className="font-display text-xl sm:text-2xl leading-tight">{title}</h3>
        <p className="font-mono text-[10px] text-foreground-muted mt-0.5">{hint}</p>
      </div>
    </div>
    {children}
  </motion.div>
);

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export const Freelance = () => {
  const [picked, setPicked] = useState<number[]>([]);
  const [timeline, setTimeline] = useState(2); // index 0..3
  const [vibe, setVibe] = useState<string | null>(null);

  const toggle = (i: number) =>
    setPicked((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));

  const reset = () => {
    setPicked([]);
    setTimeline(2);
    setVibe(null);
  };

  const filled = picked.length > 0 && vibe;
  const t = timelines[timeline];
  const v = vibes.find((x) => x.id === vibe);

  const buildEmail = () => {
    const subject = `Project brief — ${picked.length} service${picked.length !== 1 ? "s" : ""}, ${t.label.toLowerCase()}, ${v?.label.toLowerCase() ?? "no vibe"}`;
    const body = [
      "Hey Shahid 👋",
      "",
      "Here's the spec I built on your site:",
      "",
      `• Scope: ${picked.length ? picked.map((i) => freelanceServices[i].title).join(", ") : "TBD"}`,
      `• Timeline: ${t.label}`,
      `• Vibe: ${v?.label ?? "TBD"}`,
      "",
      "More context:",
      "[ tell Shahid about your project here ]",
      "",
      "Cheers!",
    ].join("\n");
    return `mailto:${socialLinks.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section
      id="freelance"
      className="relative py-24 md:py-40 px-6 overflow-hidden"
    >
      <style>{`@keyframes gradientShift { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }`}</style>

      {/* BG flourishes */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-git-cyan/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-12 bg-primary/60" />
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-primary flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-git-green animate-pulse" />
            now booking
          </span>
        </div>

        <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-end mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display text-5xl sm:text-6xl md:text-[7rem] leading-[0.95]"
          >
            Build your
            <br />
            <span className="italic text-primary">brief</span>.
          </motion.h2>

          <p className="font-hand text-2xl md:text-3xl text-foreground-muted max-w-sm lg:text-right">
            three taps,
            <br />one perfect intro email ↓
          </p>
        </div>

        {/* Wizard */}
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-10 items-start">
          {/* Steps stack */}
          <div className="space-y-4 sm:space-y-5">
            {/* Step 1 — chips */}
            <StepCard
              step={1}
              title="What are we building?"
              hint="// pick all that apply"
            >
              <div className="flex flex-wrap gap-2">
                {freelanceServices.map((s, i) => {
                  const Icon = iconMap[s.icon as keyof typeof iconMap];
                  const on = picked.includes(i);
                  return (
                    <motion.button
                      key={s.title}
                      onClick={() => toggle(i)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      className={`group inline-flex items-center gap-2 px-3.5 py-2 rounded-full border text-sm transition-all ${
                        on
                          ? "bg-primary text-primary-foreground border-primary shadow-paper"
                          : "bg-background border-border text-foreground hover:border-primary/40"
                      }`}
                    >
                      <Icon size={14} />
                      <span>{s.title}</span>
                      {on && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-1 font-mono text-[10px] opacity-80"
                        >
                          ✓
                        </motion.span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </StepCard>

            {/* Step 2 — timeline */}
            <StepCard
              step={2}
              title="How fast?"
              hint="// drag to taste"
            >
              <div className="flex items-center gap-4 mb-3">
                <motion.span
                  key={timeline}
                  initial={{ scale: 0.5, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-4xl"
                >
                  {t.emoji}
                </motion.span>
                <div>
                  <p className="font-display text-2xl">{t.label}</p>
                  <p className="font-mono text-[10px] text-foreground-muted italic">{t.note}</p>
                </div>
              </div>
              <input
                type="range"
                min={0}
                max={3}
                step={1}
                value={timeline}
                onChange={(e) => setTimeline(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
                aria-label="Timeline"
              />
              <div className="flex justify-between mt-2 font-mono text-[10px] text-foreground-muted">
                {timelines.map((tl, i) => (
                  <span
                    key={tl.label}
                    className={i === timeline ? "text-primary" : ""}
                  >
                    |
                  </span>
                ))}
              </div>
            </StepCard>

            {/* Step 3 — vibe */}
            <StepCard
              step={3}
              title="Vibe check?"
              hint="// pick the energy"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {vibes.map((vb) => {
                  const on = vibe === vb.id;
                  return (
                    <motion.button
                      key={vb.id}
                      onClick={() => setVibe(vb.id)}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.97 }}
                      className={`relative rounded-xl border p-4 text-left overflow-hidden transition-colors ${
                        on
                          ? "border-primary bg-background"
                          : "border-border bg-background/40 hover:border-primary/30"
                      }`}
                    >
                      <span className={`block w-8 h-8 rounded-md ${vb.color} mb-3`} />
                      <p className="font-display text-lg leading-tight">{vb.label}</p>
                      <p className="font-mono text-[10px] text-foreground-muted mt-1">{vb.note}</p>
                      {on && (
                        <motion.span
                          layoutId="vibe-pick"
                          className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-mono text-[10px]"
                        >
                          ✓
                        </motion.span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </StepCard>
          </div>

          {/* Live spec sheet — sticky on desktop */}
          <div className="lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotate: 1.5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 1.5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative bg-[#fafaf5] text-stone-800 shadow-2xl"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(transparent 0px, transparent 27px, hsl(210 60% 60% / 0.18) 27px, hsl(210 60% 60% / 0.18) 28px)",
              }}
            >
              {/* torn top */}
              <div
                className="h-3 bg-[#fafaf5]"
                style={{
                  maskImage:
                    "radial-gradient(circle at 8px 0, transparent 4px, #000 4px)",
                  WebkitMaskImage:
                    "radial-gradient(circle at 8px 0, transparent 4px, #000 4px)",
                  maskSize: "16px 12px",
                  WebkitMaskSize: "16px 12px",
                }}
              />

              {/* red margin line */}
              <div className="absolute left-10 top-0 bottom-0 w-px bg-rose-400/60" />

              <div className="relative px-12 sm:px-14 py-6 pb-8 min-h-[480px]">
                <div className="text-center border-b-2 border-stone-700 border-double pb-3 mb-5">
                  <p className="font-display text-3xl tracking-tight">PROJECT BRIEF</p>
                  <p className="font-mono text-[10px] text-stone-500 mt-1">
                    spec #{Date.now().toString().slice(-6)} · drafted live
                  </p>
                </div>

                <Field label="01 · Scope">
                  {picked.length === 0 ? (
                    <span className="italic text-stone-400">— pick your services —</span>
                  ) : (
                    <ul className="space-y-1">
                      <AnimatePresence mode="popLayout">
                        {picked.map((i) => (
                          <motion.li
                            key={i}
                            layout
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="flex items-baseline gap-2"
                          >
                            <span className="text-stone-500">→</span>
                            <span className="font-display text-lg">
                              {freelanceServices[i].title}
                            </span>
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    </ul>
                  )}
                </Field>

                <Field label="02 · Timeline">
                  <p className="flex items-baseline gap-2">
                    <span className="text-2xl">{t.emoji}</span>
                    <span className="font-display text-xl">{t.label}</span>
                  </p>
                  <p className="font-mono text-[10px] text-stone-500 italic">{t.note}</p>
                </Field>

                <Field label="03 · Vibe">
                  {!v ? (
                    <span className="italic text-stone-400">— pick your energy —</span>
                  ) : (
                    <div className="flex items-center gap-3">
                      <span className={`w-5 h-5 rounded ${v.color}`} />
                      <span className="font-display text-xl">{v.label}</span>
                    </div>
                  )}
                </Field>

                {/* Auto tagline */}
                <AnimatePresence>
                  {filled && v && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-6 pt-4 border-t border-dashed border-stone-400"
                    >
                      <p className="font-mono text-[10px] text-stone-500 mb-1">
                        // auto-generated tagline
                      </p>
                      <p className="font-hand text-2xl text-stone-800 leading-snug">
                        "{taglines[v.id]}"
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Signature */}
                <div className="mt-6 pt-4 border-t border-stone-300 flex items-end justify-between">
                  <div>
                    <p className="font-mono text-[10px] text-stone-500">signed,</p>
                    <p className="font-hand text-2xl text-primary">— you ✎</p>
                  </div>
                  <motion.button
                    onClick={reset}
                    whileTap={{ rotate: -180 }}
                    className="flex items-center gap-1 font-mono text-[10px] text-stone-500 hover:text-stone-800 transition-colors"
                  >
                    <RefreshCw size={11} />
                    reset
                  </motion.button>
                </div>
              </div>

              {/* torn bottom */}
              <div
                className="h-3 bg-[#fafaf5]"
                style={{
                  maskImage:
                    "radial-gradient(circle at 8px 12px, transparent 4px, #000 4px)",
                  WebkitMaskImage:
                    "radial-gradient(circle at 8px 12px, transparent 4px, #000 4px)",
                  maskSize: "16px 12px",
                  WebkitMaskSize: "16px 12px",
                }}
              />
            </motion.div>

            {/* Tape decorations */}
            <div className="absolute -top-3 left-1/3 w-24 h-6 bg-primary/30 rotate-[-4deg] blur-[0.5px]" />
            <div className="absolute -top-3 right-1/4 w-20 h-6 bg-git-yellow/30 rotate-[6deg] blur-[0.5px]" />
          </div>
        </div>

        {/* CTA bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mt-16 md:mt-20 relative rounded-3xl border border-border bg-background-2/60 p-6 sm:p-8 md:p-12 overflow-hidden"
        >
          <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

          <div className="grid md:grid-cols-[1fr_auto] gap-6 md:gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={14} className="text-primary" />
                <span className="font-mono text-[11px] uppercase tracking-wider text-foreground-muted">
                  {filled
                    ? `your brief is ready · ${picked.length} item${picked.length !== 1 ? "s" : ""}`
                    : "fill the brief, then send →"}
                </span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl leading-tight">
                Let's make this <span className="italic text-primary">real</span>.
              </h3>
              <p className="mt-3 text-foreground-muted max-w-md text-sm sm:text-base">
                One click drafts an email pre-filled with your brief. Reply within 24h
                · async friendly · timezone agnostic.
              </p>
            </div>

            <MagneticCTA href={buildEmail()}>
              {filled ? "Send the brief" : "Send anyway"}
            </MagneticCTA>
          </div>

          <div className="mt-8 pt-6 border-t border-dashed border-border flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] text-foreground-muted/80">
            <span>✓ NDA-friendly</span>
            <span>✓ Code you own</span>
            <span>✓ Lighthouse 90+</span>
            <span>✓ Async-first</span>
            <span>✓ Weekly demos</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="mb-4">
    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500 mb-1.5">
      {label}
    </p>
    <div className="text-stone-800">{children}</div>
  </div>
);
