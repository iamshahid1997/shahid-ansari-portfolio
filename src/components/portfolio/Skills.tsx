import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Folder,
  FolderOpen,
  Home,
  Cloud,
  Send,
  Tag,
  ChevronRight,
  LayoutGrid,
  List,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { skillCategories } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { CloudPane } from "./skills/CloudPane";
import { AirdropPane } from "./skills/AirdropPane";

type View = "list" | "grid";
type Pane = "shahid" | "icloud" | "airdrop";

export const Skills = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [activeTag, setActiveTag] = useState<number | null>(null);
  const [view, setView] = useState<View>("list");

  // Pane navigation w/ history stack for back/forward arrows
  const [history, setHistory] = useState<Pane[]>(["shahid"]);
  const [hIdx, setHIdx] = useState(0);
  const pane = history[hIdx];

  const goTo = (p: Pane) => {
    if (p === pane) return;
    const next = history.slice(0, hIdx + 1).concat(p);
    setHistory(next);
    setHIdx(next.length - 1);
  };
  const back = () => hIdx > 0 && setHIdx(hIdx - 1);
  const forward = () => hIdx < history.length - 1 && setHIdx(hIdx + 1);

  const filtered =
    activeTag === null
      ? skillCategories
      : skillCategories.filter((_, i) => i === activeTag);

  const sidebarItems: { icon: typeof Home; label: string; id: Pane }[] = [
    { icon: Home, label: "shahid", id: "shahid" },
    { icon: Cloud, label: "iCloud", id: "icloud" },
    { icon: Send, label: "AirDrop", id: "airdrop" },
  ];

  const titleFor = (p: Pane) =>
    p === "shahid" ? "shahid › skills" : p === "icloud" ? "iCloud Drive" : "AirDrop";

  return (
    <section id="skills" className="relative py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-baseline gap-4 mb-3">
          <span className="font-mono text-sm text-foreground-muted">~/skills</span>
        </div>
        <h2 className="font-display text-5xl md:text-6xl mb-4">
          Tools in my folder.
        </h2>
        <p className="text-foreground-muted max-w-xl mb-12">
          A look inside Finder. Click around — every sidebar item is alive.
        </p>

        {/* Finder window */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 80 }}
          className="mac-window overflow-hidden"
        >
          {/* Title bar */}
          <div className="flex items-center px-3 py-2.5 border-b border-mac-divider bg-mac-window">
            <div className="flex items-center gap-2 w-24 md:w-32">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff5f57]/80 cursor-pointer" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e] cursor-pointer" />
              <span className="w-3 h-3 rounded-full bg-[#28c840] cursor-pointer" />
            </div>
            <div className="flex-1 flex items-center justify-center gap-2 font-mono text-[11px] md:text-xs text-foreground-muted">
              <button
                onClick={back}
                disabled={hIdx === 0}
                className="disabled:opacity-30 hover:text-foreground transition-colors"
                aria-label="Back"
              >
                <ArrowLeft size={12} />
              </button>
              <button
                onClick={forward}
                disabled={hIdx === history.length - 1}
                className="disabled:opacity-30 hover:text-foreground transition-colors"
                aria-label="Forward"
              >
                <ArrowRight size={12} />
              </button>
              <span className="ml-1 md:ml-2 truncate max-w-[160px] md:max-w-none">
                {titleFor(pane)}
              </span>
            </div>
            <div className="w-24 md:w-32 flex items-center justify-end gap-1">
              {pane === "shahid" && (
                <>
                  <button
                    onClick={() => setView("list")}
                    className={cn(
                      "p-1 rounded text-foreground-muted hover:text-foreground transition-colors",
                      view === "list" && "bg-mac-divider text-foreground"
                    )}
                  >
                    <List size={13} />
                  </button>
                  <button
                    onClick={() => setView("grid")}
                    className={cn(
                      "p-1 rounded text-foreground-muted hover:text-foreground transition-colors",
                      view === "grid" && "bg-mac-divider text-foreground"
                    )}
                  >
                    <LayoutGrid size={13} />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile: sidebar collapses to top scroll-strip */}
          <div className="md:hidden flex gap-2 overflow-x-auto px-3 py-2 border-b border-mac-divider bg-mac-sidebar scrollbar-hide">
            {sidebarItems.map((it) => (
              <button
                key={it.id}
                onClick={() => goTo(it.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[11px] whitespace-nowrap transition-colors",
                  pane === it.id
                    ? "bg-mac-blue text-white"
                    : "bg-background-2 text-foreground-muted"
                )}
              >
                <it.icon size={11} />
                {it.label}
              </button>
            ))}
            {pane === "shahid" &&
              skillCategories.map((cat, i) => {
                const colors = [
                  "bg-mac-blue", "bg-git-green", "bg-git-yellow",
                  "bg-git-magenta", "bg-git-cyan", "bg-git-red",
                ];
                return (
                  <button
                    key={cat.title}
                    onClick={() => setActiveTag(activeTag === i ? null : i)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[11px] whitespace-nowrap transition-colors",
                      activeTag === i
                        ? "bg-foreground text-background"
                        : "bg-background-2 text-foreground-muted"
                    )}
                  >
                    <span className={cn("w-1.5 h-1.5 rounded-full", colors[i % colors.length])} />
                    {cat.title}
                  </button>
                );
              })}
          </div>

          <div className="grid grid-cols-12 min-h-[440px]">
            {/* Sidebar (desktop) */}
            <aside className="hidden md:block col-span-3 bg-mac-sidebar border-r border-mac-divider p-3 font-mono text-xs">
              <p className="text-foreground-muted/60 uppercase tracking-wider text-[10px] px-2 mb-1.5">
                Favorites
              </p>
              <ul className="space-y-0.5">
                {sidebarItems.map((it) => (
                  <li key={it.id}>
                    <button
                      onClick={() => goTo(it.id)}
                      className={cn(
                        "w-full flex items-center gap-2 px-2 py-1 rounded text-left transition-colors",
                        pane === it.id
                          ? "bg-mac-blue text-white"
                          : "hover:bg-mac-divider/60 text-foreground"
                      )}
                    >
                      <it.icon size={12} className={pane === it.id ? "" : "text-mac-blue"} />
                      <span>{it.label}</span>
                      {it.id === "icloud" && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-git-green animate-pulse" />
                      )}
                      {it.id === "airdrop" && (
                        <span className="ml-auto text-[9px] opacity-70">4</span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>

              {pane === "shahid" && (
                <>
                  <p className="text-foreground-muted/60 uppercase tracking-wider text-[10px] px-2 mt-5 mb-1.5">
                    Tags
                  </p>
                  <ul className="space-y-0.5">
                    <li
                      onClick={() => setActiveTag(null)}
                      className={cn(
                        "flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-mac-divider/60",
                        activeTag === null && "bg-mac-divider/60 text-foreground"
                      )}
                    >
                      <Tag size={11} className="text-foreground-muted" />
                      <span>All</span>
                    </li>
                    {skillCategories.map((cat, i) => {
                      const colors = [
                        "bg-mac-blue", "bg-git-green", "bg-git-yellow",
                        "bg-git-magenta", "bg-git-cyan", "bg-git-red",
                      ];
                      return (
                        <li
                          key={cat.title}
                          onClick={() => setActiveTag(activeTag === i ? null : i)}
                          className={cn(
                            "flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-mac-divider/60",
                            activeTag === i && "bg-mac-divider/60 text-foreground"
                          )}
                        >
                          <span className={cn("w-2 h-2 rounded-full", colors[i % colors.length])} />
                          <span className="truncate">{cat.title}</span>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </aside>

            {/* Main pane */}
            <div className="col-span-12 md:col-span-9 bg-background-2/50">
              <AnimatePresence mode="wait">
                <motion.div
                  key={pane}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.2 }}
                >
                  {pane === "icloud" && <CloudPane />}
                  {pane === "airdrop" && <AirdropPane />}
                  {pane === "shahid" &&
                    (view === "list" ? (
                      <ListView
                        filtered={filtered}
                        openIdx={openIdx}
                        setOpenIdx={setOpenIdx}
                      />
                    ) : (
                      <GridView
                        filtered={filtered}
                        openIdx={openIdx}
                        setOpenIdx={setOpenIdx}
                      />
                    ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Status bar */}
          <div className="px-4 py-1.5 border-t border-mac-divider bg-mac-window font-mono text-[10px] text-foreground-muted text-center">
            {pane === "shahid" && (
              <>
                {filtered.reduce((a, c) => a + c.skills.length, 0)} skills,{" "}
                {filtered.length} categor{filtered.length === 1 ? "y" : "ies"} ·
                currently {activeTag === null ? "all" : skillCategories[activeTag].title}
              </>
            )}
            {pane === "icloud" && "iCloud Drive · 5.6 GB of 200 GB used"}
            {pane === "airdrop" && "AirDrop is on · 4 devices nearby"}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* -------------------- List View -------------------- */
const ListView = ({
  filtered,
  openIdx,
  setOpenIdx,
}: {
  filtered: typeof skillCategories;
  openIdx: number | null;
  setOpenIdx: (n: number | null) => void;
}) => (
  <div className="font-mono text-xs">
    <div className="grid grid-cols-12 px-4 py-2 border-b border-mac-divider text-foreground-muted/70 uppercase tracking-wider text-[10px]">
      <div className="col-span-6">Name</div>
      <div className="col-span-2 hidden sm:block">Kind</div>
      <div className="col-span-3 sm:col-span-2">Size</div>
      <div className="col-span-3 sm:col-span-2">Last opened</div>
    </div>
    <ul>
      {filtered.map((cat) => {
        const realIdx = skillCategories.indexOf(cat);
        const isOpen = openIdx === realIdx;
        return (
          <li key={cat.title}>
            <button
              onClick={() => setOpenIdx(isOpen ? null : realIdx)}
              className={cn(
                "w-full grid grid-cols-12 items-center px-4 py-2 text-left transition-colors",
                isOpen ? "bg-mac-blue text-white" : "hover:bg-mac-divider/40 text-foreground"
              )}
            >
              <div className="col-span-6 flex items-center gap-2">
                <ChevronRight size={11} className={cn("transition-transform shrink-0", isOpen && "rotate-90")} />
                {isOpen ? (
                  <FolderOpen size={14} className="text-mac-blue brightness-200" />
                ) : (
                  <Folder size={14} className="text-mac-blue" />
                )}
                <span className="truncate">{cat.title}</span>
              </div>
              <div className="col-span-2 opacity-80 hidden sm:block">Folder</div>
              <div className="col-span-3 sm:col-span-2 opacity-80">{cat.skills.length} items</div>
              <div className="col-span-3 sm:col-span-2 opacity-80">Today</div>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden bg-background-2/80"
                >
                  <div className="px-6 sm:px-10 py-4 flex flex-wrap gap-2">
                    {cat.skills.map((s, j) => (
                      <motion.span
                        key={s}
                        initial={{ opacity: 0, y: -6, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: j * 0.04, type: "spring", stiffness: 280 }}
                        className="font-mono text-xs px-2.5 py-1 rounded-md bg-term-bg border border-term-border text-term-text"
                      >
                        <span className="text-term-prompt">$</span> {s}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  </div>
);

/* -------------------- Grid View -------------------- */
const GridView = ({
  filtered,
  openIdx,
  setOpenIdx,
}: {
  filtered: typeof skillCategories;
  openIdx: number | null;
  setOpenIdx: (n: number | null) => void;
}) => (
  <div className="p-6 md:p-8">
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
      {filtered.map((cat) => {
        const realIdx = skillCategories.indexOf(cat);
        const isOpen = openIdx === realIdx;
        return (
          <motion.button
            key={cat.title}
            onClick={() => setOpenIdx(isOpen ? null : realIdx)}
            whileHover={{ scale: 1.05, y: -4 }}
            animate={{ scale: isOpen ? 1.05 : 1 }}
            className={cn(
              "flex flex-col items-center gap-1.5 p-3 rounded-lg transition-colors",
              isOpen ? "bg-mac-blue/15 ring-1 ring-mac-blue/40" : "hover:bg-mac-divider/30"
            )}
          >
            <motion.div
              animate={{ rotateY: isOpen ? 15 : 0, y: isOpen ? -2 : 0 }}
              transition={{ type: "spring", stiffness: 220 }}
            >
              {isOpen ? (
                <FolderOpen size={56} className="text-mac-blue brightness-200 drop-shadow-lg" />
              ) : (
                <Folder size={56} className="text-mac-blue drop-shadow-lg" />
              )}
            </motion.div>
            <span
              className={cn(
                "font-mono text-xs text-center px-2 py-0.5 rounded",
                isOpen ? "bg-mac-blue text-white" : "text-foreground"
              )}
            >
              {cat.title}
            </span>
            <span className="font-mono text-[10px] text-foreground-muted">
              {cat.skills.length} items
            </span>
          </motion.button>
        );
      })}
    </div>

    <AnimatePresence mode="wait">
      {openIdx !== null && filtered.includes(skillCategories[openIdx]) && (
        <motion.div
          key={openIdx}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-8 overflow-hidden"
        >
          <div className="rounded-lg border border-mac-divider bg-term-bg/60 p-5">
            <p className="font-mono text-[10px] uppercase tracking-wider text-foreground-muted mb-3">
              ▾ {skillCategories[openIdx].title} — {skillCategories[openIdx].skills.length} items
            </p>
            <div className="flex flex-wrap gap-2">
              {skillCategories[openIdx].skills.map((s, j) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, y: -8, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: j * 0.04, type: "spring", stiffness: 280 }}
                  className="font-mono text-xs px-2.5 py-1 rounded-md bg-term-bg border border-term-border text-term-text"
                >
                  <span className="text-term-prompt">$</span> {s}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);
