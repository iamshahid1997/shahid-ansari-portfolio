import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { aboutText, education } from "@/data/portfolio";
import { GraduationCap, Sparkles, Quote } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";
import { toast } from "sonner";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const Typewriter = ({ text, speed = 8 }: { text: string; speed?: number }) => {
  const [shown, setShown] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const id = setInterval(() => {
      i += 4;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [inView, text, speed]);

  return (
    <div
      ref={ref}
      className="font-mono text-[12px] sm:text-[13px] leading-relaxed text-foreground/90 break-words"
    >
      <span className="text-git-magenta">const</span>{" "}
      <span className="text-git-cyan">shahid</span>{" "}
      <span className="text-foreground-muted">=</span>{" "}
      <span className="text-git-yellow">{`{`}</span>
      <br />
      <span className="pl-4 text-git-cyan">bio</span>
      <span className="text-foreground-muted">: </span>
      <span className="text-git-green">"</span>
      <span className="text-git-green">{shown}</span>
      <span className="inline-block w-1.5 h-3.5 bg-primary align-middle animate-pulse ml-px" />
      <span className="text-git-green">"</span>
      <br />
      <span className="text-git-yellow">{`}`}</span>
      <span className="text-foreground-muted">;</span>
    </div>
  );
};

/* Stat with count-up + 3D flip card */
const StatCard = ({
  value,
  suffix,
  label,
  back,
  rotate,
}: {
  value: number;
  suffix: string;
  label: string;
  back: string;
  rotate: number;
}) => {
  const [count, ref] = useCountUp(value);
  const [flipped, setFlipped] = useState(false);
  return (
    <motion.div
      ref={ref}
      onClick={() => setFlipped((f) => !f)}
      whileHover={{ y: -4, rotate }}
      className="relative h-[110px] cursor-pointer"
      style={{ perspective: 1000 }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-xl border border-border bg-background-2/60 p-5 overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <p className="font-display text-5xl text-primary tabular-nums">
            {count}
            {suffix}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-wider text-foreground-muted mt-1">
            {label}
          </p>
          <p className="absolute bottom-2 right-3 font-mono text-[9px] text-foreground-muted/40">
            tap to flip
          </p>
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 rounded-xl border border-primary/40 bg-primary/5 p-5 flex items-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="font-hand text-xl leading-tight text-foreground/90">{back}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const stats = [
  { value: 5, suffix: "+", label: "years shipping", back: "≈ 13,000 hrs of staring at devtools", rotate: -1.5 },
  { value: 20, suffix: "+", label: "dashboards built", back: "RBAC, charts, bulk uploads — the full opera", rotate: 1.5 },
  { value: 90, suffix: "+", label: "lighthouse score", back: "and a 100 in 'pretending to know SEO'", rotate: -1.5 },
  { value: 999, suffix: "", label: "cups of coffee", back: "minimum estimate. likely much higher.", rotate: 1.5 },
];


/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const yMark = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const rotMark = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-28 md:py-40 px-6 overflow-hidden"
    >
      {/* Decorative oversized type bg */}
      <motion.span
        style={{ y: yMark, rotate: rotMark }}
        aria-hidden
        className="pointer-events-none select-none absolute -top-10 right-[-4rem] font-display text-[10rem] sm:text-[18rem] md:text-[26rem] leading-none text-foreground/[0.035] whitespace-nowrap"
      >
        about.
      </motion.span>

      <div className="max-w-6xl mx-auto relative">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-12 bg-primary/60" />
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-primary">
            $ whoami
          </span>
        </div>

        {/* Massive editorial heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="font-display text-5xl sm:text-6xl md:text-[7rem] leading-[0.95] mb-3"
        >
          I think,
          <br />
          <span className="italic text-primary">then</span> I build
          <span className="text-primary">.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-hand text-2xl md:text-3xl text-foreground-muted mb-12 md:mb-16 max-w-xl"
        >
          a slow look at how I work →
        </motion.p>

        {/* Main grid */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* IDE window — about text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 rounded-xl border border-term-border bg-term-bg shadow-paper overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 py-2.5 bg-background-2 border-b border-term-border">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-mono text-xs text-foreground-muted">
                shahid.config.ts
              </span>
              <span className="ml-auto font-mono text-[10px] text-foreground-muted/60">
                UTF-8 · TS · main
              </span>
            </div>

            {/* Line numbers + code */}
            <div className="grid grid-cols-[44px_1fr]">
              <div className="px-3 py-6 border-r border-term-border bg-background-2/30 text-right font-mono text-[11px] text-foreground-muted/40 select-none leading-relaxed">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <div className="p-6">
                <Typewriter text={aboutText} />
              </div>
            </div>

            {/* status bar */}
            <div className="flex items-center justify-between px-4 py-1.5 border-t border-term-border bg-background-2/60 font-mono text-[10px] text-foreground-muted/70">
              <span className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-git-green" /> live
                </span>
                <span>main</span>
                <span className="text-git-cyan">↑ 4y · ↓ 0</span>
              </span>
              <span>Ln 1, Col 1 · TypeScript React</span>
            </div>
          </motion.div>

          {/* Right column: Stats stack + pull-quote */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Pull quote */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-xl border border-border bg-background-2 p-6 overflow-hidden"
            >
              <Quote
                className="absolute -top-3 -left-3 w-20 h-20 text-primary/10"
                strokeWidth={1}
              />
              <p className="font-display text-2xl md:text-3xl leading-snug relative z-10">
                Code is{" "}
                <span className="italic text-primary">poetry</span> the
                browser can run.
              </p>
              <p className="mt-3 font-hand text-2xl text-foreground-muted relative z-10">
                — what I tell juniors at 2am
              </p>
            </motion.div>

            {/* Stats grid — count-up + flip cards */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <StatCard key={s.label} {...s} />
              ))}
            </div>
          </div>
        </div>

        {/* Education — horizontal timeline */}
        <div className="mt-24">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Sparkles size={14} className="text-primary" />
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-primary">
                  $ cat education.log
                </span>
              </div>
              <h3 className="font-display text-4xl md:text-5xl flex items-center gap-3">
                <GraduationCap className="w-9 h-9 text-foreground-muted" />
                Where my brain got{" "}
                <span className="italic text-primary">compiled</span>.
              </h3>
            </div>
          </div>

          <div className="relative">
            {/* timeline rail */}
            <div className="absolute left-0 right-0 top-7 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <div className="grid md:grid-cols-2 gap-6 relative">
              {education.map((edu, i) => (
                <EducationCard key={i} edu={edu} idx={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* Education card with click-to-stamp interaction */
const EducationCard = ({ edu, idx }: { edu: typeof education[number]; idx: number }) => {
  const [stamped, setStamped] = useState(false);

  const handleClick = () => {
    if (stamped) return;
    setStamped(true);
    toast.success(`✓ Verified ${edu.degree}`, { description: edu.school });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.15, duration: 0.6 }}
      whileHover={{ y: -6 }}
      className="relative pt-12"
    >
      <span className="absolute top-5 left-6 w-4 h-4 rounded-full bg-primary ring-4 ring-background z-10" />
      <span className="absolute top-7 left-10 right-0 h-px bg-border/60" />

      <button
        onClick={handleClick}
        className="block w-full text-left rounded-xl border border-border bg-background-2/60 p-6 hover:border-primary/40 transition-colors group relative overflow-hidden"
      >
        {/* VERIFIED stamp */}
        <AnimatePresence>
          {stamped && (
            <motion.div
              initial={{ scale: 3, opacity: 0, rotate: -25 }}
              animate={{ scale: 1, opacity: 0.85, rotate: -18 }}
              transition={{ type: "spring", stiffness: 220, damping: 12 }}
              className="absolute top-3 right-3 pointer-events-none border-2 border-git-green text-git-green font-display text-2xl px-3 py-0.5 rounded"
              style={{ textShadow: "0 0 1px hsl(var(--git-green))" }}
            >
              VERIFIED ✓
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-primary">
              {edu.year}
            </p>
            <p className="font-display text-2xl md:text-3xl mt-1 leading-tight">
              {edu.degree}
            </p>
            <p className="font-mono text-xs text-foreground-muted mt-1">
              {edu.field}
            </p>
          </div>
          <span className="font-display text-2xl md:text-3xl text-primary shrink-0">
            {edu.score}
          </span>
        </div>
        <div className="mt-5 pt-4 border-t border-dashed border-border/60 flex items-center justify-between gap-2 flex-wrap">
          <p className="text-sm text-foreground/80">{edu.school}</p>
          <span className="font-hand text-xl text-foreground-muted group-hover:text-primary transition-colors">
            📍 {edu.location}
          </span>
        </div>
        {!stamped && (
          <p className="font-mono text-[9px] text-foreground-muted/40 mt-3">
            // tap to verify
          </p>
        )}
      </button>
    </motion.div>
  );
};

