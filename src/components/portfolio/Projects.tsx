import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ExternalLink, X, Search, RotateCcw, Move } from "lucide-react";
import { projects } from "@/data/portfolio";
import gitBranchImg from "@/assets/desk/git-branch.png";

export const Projects = () => {
  const [active, setActive] = useState<number | null>(null);
  const [resetKey, setResetKey] = useState(0); // remount polaroids to snap back
  const [dragged, setDragged] = useState<Set<number>>(new Set());
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const repin = () => {
    setResetKey((k) => k + 1);
    setDragged(new Set());
  };

  return (
    <section id="projects" className="relative py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-baseline gap-4 mb-3">
          <span className="font-mono text-sm text-foreground-muted">
            ~/shahid/projects
          </span>
        </div>
        <div className="flex items-end justify-between gap-4 mb-4 flex-wrap">
          <h2 className="font-display text-5xl md:text-6xl">
            Pinned to the board.
          </h2>
          <AnimatePresence>
            {dragged.size > 0 && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onClick={repin}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground font-mono text-xs hover:opacity-90 shadow-paper"
              >
                <RotateCcw size={13} />
                Re-pin all
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        <p className="text-foreground-muted max-w-xl mb-8 md:mb-14">
          A few things I've shipped. Click any polaroid to open — or{" "}
          <span className="inline-flex items-center gap-1 text-primary">
            <Move size={11} /> drag
          </span>{" "}
          them around the board.
        </p>

        {/* Cork board */}
        <div
          ref={boardRef}
          className="relative cork-bg rounded-3xl p-4 sm:p-6 md:p-12 shadow-paper border border-stone-900/40 overflow-hidden"
        >
          <img
            src={gitBranchImg}
            alt=""
            className="hidden md:block absolute -top-10 -right-6 w-32 opacity-70 rotate-12 pointer-events-none"
            loading="lazy"
          />

          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-6 [&>*]:basis-full sm:[&>*]:basis-[calc(50%-1rem)] md:[&>*]:basis-[calc(33.333%-1rem)] md:[&>*]:max-w-[320px]">
            {projects.map((p, i) => {
              const rot = [-3, 2, -2][i] ?? 0;
              return (
                <motion.div
                  key={`${p.title}-${resetKey}`}
                  drag
                  dragConstraints={boardRef}
                  dragElastic={0.18}
                  dragMomentum={false}
                  onDragStart={() =>
                    setDragged((d) => new Set(d).add(i))
                  }
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: i * 0.12, type: "spring", stiffness: 80 }}
                  whileHover={{ scale: 1.04, zIndex: 10 }}
                  whileDrag={{ scale: 1.08, zIndex: 50, rotate: 0, cursor: "grabbing" }}
                  style={{ rotate: rot }}
                  className="relative bg-[#f5f1ea] p-3 pb-5 shadow-paper rounded-sm text-left group cursor-grab active:cursor-grabbing select-none"
                >
                  <motion.span
                    animate={
                      dragged.has(i)
                        ? { scale: [1, 1.4, 1], boxShadow: ["0 0 0 0 hsl(var(--primary)/0.6)", "0 0 0 12px hsl(var(--primary)/0)"] }
                        : {}
                    }
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary shadow-md ring-2 ring-stone-900/20 z-10"
                  />

                  <button
                    onClick={() => !dragged.has(i) && setActive(i)}
                    className="block w-full text-left"
                    aria-label={`Open ${p.title}`}
                  >
                    <motion.div
                      layoutId={`thumb-${i}`}
                      className="aspect-[4/3] overflow-hidden bg-stone-900"
                    >
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        draggable={false}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                      />
                    </motion.div>
                    <div className="px-1 pt-3">
                      <p className="font-display text-xl sm:text-2xl text-stone-900 leading-tight">
                        {p.title}
                      </p>
                      <p className="font-mono text-[11px] text-stone-600 mt-1">
                        {p.period} · {p.company}
                      </p>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl mac-window overflow-hidden my-8"
            >
              {/* mac chrome */}
              <div className="flex items-center gap-2 px-3 py-2.5 border-b border-mac-divider bg-mac-window">
                <button
                  onClick={() => setActive(null)}
                  className="w-3 h-3 rounded-full bg-[#ff5f57] hover:scale-110 flex items-center justify-center group"
                  aria-label="Close"
                >
                  <X size={8} className="opacity-0 group-hover:opacity-100 text-stone-900" />
                </button>
                <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                <div className="flex-1 mx-4">
                  <div className="bg-background-2 rounded-md px-3 py-1 font-mono text-xs text-foreground-muted text-center max-w-md mx-auto truncate">
                    🔒 {projects[active].link.replace(/https?:\/\//, "")}
                  </div>
                </div>
                <Search size={12} className="text-foreground-muted" />
              </div>

              <div className="grid grid-cols-12">
                {/* IDE-style sidebar */}
                <div className="hidden md:block col-span-3 bg-mac-sidebar border-r border-mac-divider p-3 font-mono text-[11px]">
                  <p className="text-foreground-muted/60 uppercase tracking-wider text-[9px] mb-2">
                    Explorer
                  </p>
                  <div className="space-y-0.5 text-foreground-muted">
                    <div className="text-foreground">📁 {projects[active].title.toLowerCase().replace(/\s+/g, "-")}</div>
                    <div className="pl-4 text-mac-blue">📄 README.md</div>
                    <div className="pl-4">📁 src/</div>
                    <div className="pl-4">📁 public/</div>
                    <div className="pl-4">📄 package.json</div>
                    <div className="pl-4">📄 tsconfig.json</div>
                    <div className="pl-4">📄 .env</div>
                  </div>

                  <p className="text-foreground-muted/60 uppercase tracking-wider text-[9px] mt-5 mb-2">
                    Stack
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {projects[active].techs.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="px-1.5 py-0.5 rounded bg-background-2 text-foreground-muted text-[9px]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Main */}
                <div className="col-span-12 md:col-span-9">
                  {/* Screenshot */}
                  <motion.div
                    layoutId={`thumb-${active}`}
                    className="aspect-[16/9] overflow-hidden bg-stone-900 border-b border-mac-divider"
                  >
                    <img
                      src={projects[active].image}
                      alt={projects[active].title}
                      className="w-full h-full object-cover object-top"
                    />
                  </motion.div>

                  <div className="p-6 md:p-8">
                    <div>
                      <p className="font-mono text-xs text-primary">
                        {projects[active].period} · {projects[active].company}
                      </p>
                      <h3 className="font-display text-4xl mt-1">
                        {projects[active].title}
                      </h3>
                    </div>

                    {/* JSDoc-style description */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mt-5 font-mono text-xs bg-background-2 border border-mac-divider rounded-lg p-4"
                    >
                      <div className="text-git-green">/**</div>
                      <div className="text-foreground-muted text-[11px] leading-relaxed pl-3">
                        {projects[active].description.split(". ").map((s, i) => (
                          <div key={i}>
                            <span className="text-git-green">* </span>
                            {s}
                            {i < projects[active].description.split(". ").length - 1 && "."}
                          </div>
                        ))}
                      </div>
                      <div className="text-git-green">*/</div>
                    </motion.div>

                    {/* npm install tags */}
                    <div className="mt-5">
                      <p className="font-mono text-xs text-foreground-muted mb-2">
                        $ npm install
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {projects[active].techs.map((t, j) => (
                          <motion.span
                            key={t}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + j * 0.04 }}
                            className="font-mono text-xs px-2.5 py-1 rounded-md bg-term-bg border border-term-border text-term-text"
                          >
                            <span className="text-git-magenta">+</span> {t}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <motion.a
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      href={projects[active].link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-mono text-sm font-medium hover:opacity-90 transition-opacity shadow-paper"
                    >
                      <span className="text-primary-foreground/70">$</span>
                      open {projects[active].link.replace(/https?:\/\//, "")}
                      <ExternalLink size={14} />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
