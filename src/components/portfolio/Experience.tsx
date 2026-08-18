import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { experience } from "@/data/portfolio";
import { InteractiveTerminalInput } from "./experience/InteractiveTerminalInput";

const fakeHash = (s: string) =>
  Array.from(s)
    .reduce((acc, c) => acc + c.charCodeAt(0), 0)
    .toString(16)
    .padStart(7, "a")
    .slice(-7);

const branchColors = ["text-git-yellow", "text-git-cyan", "text-git-magenta", "text-git-green"];

interface CommitLineProps {
  exp: (typeof experience)[number];
  idx: number;
  inView: boolean;
  onToggle: () => void;
  open: boolean;
}

const CommitLine = ({ exp, idx, inView, onToggle, open }: CommitLineProps) => {
  const hash = fakeHash(exp.company);
  const branch = exp.company.toLowerCase().split(" ")[0];
  const color = branchColors[idx % branchColors.length];
  const isHead = idx === 0;
  const branchLabel = isHead ? `HEAD → main, ${branch}` : branch;

  // Type out commit summary
  const summary = `feat(${branch}): ${exp.role.toLowerCase()}`;
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(summary.slice(0, i));
      if (i >= summary.length) clearInterval(id);
    }, 18);
    return () => clearInterval(id);
  }, [inView, summary]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0 }}
      transition={{ delay: idx * 0.5, duration: 0.4 }}
      className="font-mono text-sm leading-relaxed"
    >
      {/* Commit line */}
      <div className="flex items-start gap-2 flex-wrap">
        <span className="text-git-magenta">*</span>
        <button
          onClick={onToggle}
          className="text-git-yellow hover:underline cursor-pointer"
        >
          {hash}
        </button>
        <span className="text-foreground-muted">(</span>
        <span className={color}>{branchLabel}</span>
        <span className="text-foreground-muted">)</span>
        <span className="text-foreground/90">{typed}</span>
        {typed.length < summary.length && inView && (
          <span className="inline-block w-2 h-4 bg-foreground-muted align-middle animate-blink" />
        )}
      </div>

      {/* Author / date */}
      <div className="flex items-center gap-2 pl-5 text-foreground-muted text-xs mt-0.5">
        <span className="text-git-magenta opacity-50">│</span>
        <span>Author: Shahid Ansari &lt;ansari.shah28@gmail.com&gt;</span>
      </div>
      <div className="flex items-center gap-2 pl-5 text-foreground-muted text-xs">
        <span className="text-git-magenta opacity-50">│</span>
        <span>
          Date: {exp.period} · {exp.location}
        </span>
      </div>

      {/* Expanded git show */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="pl-5 mt-3 mb-2 border-l-2 border-git-magenta/40 ml-1 pl-4">
              <div className="text-git-cyan text-xs mb-2">
                $ git show {hash}
              </div>
              <div className="text-foreground/90 text-xs mb-2">
                <span className="text-git-yellow">commit</span> {hash}...
              </div>
              <div className="space-y-0.5">
                {exp.bullets.map((b, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: j * 0.05 }}
                    className="flex items-start gap-2 text-xs"
                  >
                    <span className="text-git-green shrink-0">+</span>
                    <span className="text-foreground/85 leading-relaxed">{b}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Branch separator line */}
      <div className="text-git-magenta opacity-50 pl-0 my-1">│</div>
    </motion.div>
  );
};

export const Experience = () => {
  const [openIdx, setOpenIdx] = useState<number>(0);
  const [visibleCount, setVisibleCount] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Reveal commits sequentially when section enters view
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount === 0) {
          experience.forEach((_, i) => {
            setTimeout(() => setVisibleCount((v) => Math.max(v, i + 1)), i * 600);
          });
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, [visibleCount]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex items-baseline gap-4 mb-3">
          <span className="font-mono text-sm text-foreground-muted">
            $ git log --career --graph
          </span>
        </div>
        <h2 className="font-display text-5xl md:text-6xl mb-12">
          Commits, in chronological order.
        </h2>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mac-window overflow-hidden"
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-mac-divider">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-[10px] sm:text-xs text-foreground-muted truncate">
              shahid@portfolio: ~/career — zsh
            </span>
            <span className="ml-auto font-mono text-[10px] text-git-yellow whitespace-nowrap hidden sm:inline">
              🔥 {experience.length} jobs · 0 layoffs
            </span>
          </div>

          <div className="p-4 sm:p-6 md:p-8 bg-term-bg/60 max-h-[70vh] overflow-y-auto overflow-x-hidden">
            {/* Initial command */}
            <div className="font-mono text-xs sm:text-sm mb-5 break-all">
              <span className="text-git-green">shahid@portfolio</span>
              <span className="text-foreground-muted">:</span>
              <span className="text-git-cyan">~/career</span>
              <span className="text-foreground-muted">$ </span>
              <span className="text-foreground">git log --all --graph --oneline</span>
            </div>

            <div className="space-y-1">
              {experience.map((exp, i) => (
                <CommitLine
                  key={exp.company}
                  exp={exp}
                  idx={i}
                  inView={i < visibleCount}
                  open={openIdx === i}
                  onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
                />
              ))}
            </div>

            {/* Interactive prompt */}
            {visibleCount >= experience.length && (
              <InteractiveTerminalInput
                onShowCommit={(idx) => setOpenIdx(idx)}
              />
            )}
          </div>
        </motion.div>

        <p className="font-mono text-xs text-foreground-muted mt-4 text-center">
          tip: type <span className="text-git-yellow">help</span> in the prompt,
          or click any commit hash to{" "}
          <span className="text-git-yellow">git show</span> the diff.
        </p>
      </div>
    </section>
  );
};
