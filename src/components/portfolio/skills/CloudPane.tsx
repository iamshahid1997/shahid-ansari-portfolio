import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Cloud, FileAudio, FileText, ListTodo, Lightbulb, Check, type LucideIcon } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { cn } from "@/lib/utils";

type FileItem = {
  id: string;
  name: string;
  icon: LucideIcon;
  size: string;
  type: "audio" | "todo" | "note" | "ideas";
};

const files: FileItem[] = [
  { id: "audio", name: "currently-listening.m4a", icon: FileAudio, size: "3.4 MB", type: "audio" },
  { id: "todo", name: "side-projects.todo", icon: ListTodo, size: "1.1 KB", type: "todo" },
  { id: "note", name: "reading-list.md", icon: FileText, size: "812 B", type: "note" },
  { id: "ideas", name: "ideas.draft", icon: Lightbulb, size: "401 B", type: "ideas" },
];

const initialTodos = [
  { id: 1, label: "Build a Next.js boilerplate w/ auth + payments" },
  { id: 2, label: "Write a blog post: 'TanStack Query gotchas'" },
  { id: 3, label: "OSS: tiny React drag-n-drop primitive" },
  { id: 4, label: "Learn WebGL shaders properly" },
];

const ideas = [
  "a music visualizer that reacts to your terminal commands",
  "a cron job that emails me a haiku every monday",
  "react-quote: pull-quotes as a component, with citation",
  "a portfolio review bot trained on awwwards SOTDs",
];

const reading = [
  "Designing Data-Intensive Applications — M. Kleppmann",
  "Refactoring UI — Adam Wathan & Steve Schoger",
  "The Pragmatic Programmer — Hunt & Thomas",
  "Tao Te Ching — Lao Tzu (because, balance)",
];

export const CloudPane = () => {
  const [active, setActive] = useState<string | null>("audio");
  const [todos, setTodos] = useLocalStorage<number[]>("shahid:todos", []);
  const [seconds, setSeconds] = useState(0);
  const [ideaIdx, setIdeaIdx] = useState(0);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  // Cycle ideas with typewriter
  useEffect(() => {
    if (active !== "ideas") return;
    setTyped("");
    let i = 0;
    const idea = ideas[ideaIdx];
    const id = setInterval(() => {
      i++;
      setTyped(idea.slice(0, i));
      if (i >= idea.length) {
        clearInterval(id);
        setTimeout(() => setIdeaIdx((x) => (x + 1) % ideas.length), 2200);
      }
    }, 28);
    return () => clearInterval(id);
  }, [active, ideaIdx]);

  const toggle = (id: number) =>
    setTodos((t) => (t.includes(id) ? t.filter((x) => x !== id) : [...t, id]));

  return (
    <div className="font-mono text-xs">
      {/* Sync header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-mac-divider bg-background-2/30">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Cloud size={14} className="text-mac-blue" />
          </motion.div>
          <span className="text-foreground/90">iCloud Drive</span>
          <span className="text-foreground-muted/60">· shahid@icloud.com</span>
        </div>
        <span className="text-foreground-muted/60 text-[10px]">
          ⟳ Last synced {seconds}s ago
        </span>
      </div>

      {/* File list */}
      <div className="grid grid-cols-12 px-4 py-2 border-b border-mac-divider text-foreground-muted/70 uppercase tracking-wider text-[10px]">
        <div className="col-span-7">Name</div>
        <div className="col-span-3">Status</div>
        <div className="col-span-2 text-right">Size</div>
      </div>

      <ul>
        {files.map((f) => {
          const isOpen = active === f.id;
          return (
            <li key={f.id}>
              <button
                onClick={() => setActive(isOpen ? null : f.id)}
                className={cn(
                  "w-full grid grid-cols-12 items-center px-4 py-2.5 text-left transition-colors",
                  isOpen
                    ? "bg-mac-blue text-white"
                    : "hover:bg-mac-divider/40"
                )}
              >
                <div className="col-span-7 flex items-center gap-2">
                  <f.icon size={14} className={isOpen ? "" : "text-mac-blue"} />
                  <span>{f.name}</span>
                </div>
                <div className="col-span-3 flex items-center gap-1.5 text-[10px]">
                  <span className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    isOpen ? "bg-white" : "bg-git-green"
                  )} />
                  Synced
                </div>
                <div className="col-span-2 text-right opacity-80">{f.size}</div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden bg-term-bg/50"
                  >
                    <div className="px-6 py-4">
                      {f.type === "audio" && (
                        <div>
                          <p className="text-foreground/90 mb-3">
                            <span className="text-git-cyan">♪</span> Lo-fi · "Coding at 2am" — Idealism
                          </p>
                          <div className="flex items-end gap-1 h-10">
                            {Array.from({ length: 40 }).map((_, i) => (
                              <motion.span
                                key={i}
                                animate={{
                                  height: [
                                    `${20 + Math.random() * 60}%`,
                                    `${20 + Math.random() * 80}%`,
                                    `${20 + Math.random() * 60}%`,
                                  ],
                                }}
                                transition={{
                                  duration: 0.6 + Math.random() * 0.5,
                                  repeat: Infinity,
                                  delay: i * 0.03,
                                }}
                                className="flex-1 bg-gradient-to-t from-mac-blue to-git-cyan rounded-sm"
                              />
                            ))}
                          </div>
                          <p className="mt-3 text-foreground-muted text-[10px]">
                            01:23 / 03:47 · ▶ ⏸ ⏭
                          </p>
                        </div>
                      )}

                      {f.type === "todo" && (
                        <ul className="space-y-1.5">
                          {initialTodos.map((t) => {
                            const done = todos.includes(t.id);
                            return (
                              <li key={t.id}>
                                <button
                                  onClick={() => toggle(t.id)}
                                  className="w-full flex items-center gap-3 group text-left"
                                >
                                  <motion.span
                                    whileTap={{ scale: 0.85 }}
                                    className={cn(
                                      "w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors",
                                      done
                                        ? "bg-git-green border-git-green"
                                        : "border-foreground-muted/50 group-hover:border-foreground"
                                    )}
                                  >
                                    {done && <Check size={10} className="text-background" />}
                                  </motion.span>
                                  <span
                                    className={cn(
                                      "text-foreground/85 transition-all",
                                      done && "line-through opacity-50"
                                    )}
                                  >
                                    {t.label}
                                  </span>
                                </button>
                              </li>
                            );
                          })}
                          <p className="pt-2 text-[10px] text-foreground-muted/70 italic">
                            ✓ ticked items persist across visits
                          </p>
                        </ul>
                      )}

                      {f.type === "note" && (
                        <ul className="space-y-1.5">
                          {reading.map((r) => (
                            <li key={r} className="flex items-start gap-2 text-foreground/85">
                              <span className="text-git-magenta">📖</span>
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {f.type === "ideas" && (
                        <div className="min-h-[60px]">
                          <p className="text-foreground-muted text-[10px] mb-2">
                            // shower-thought #{ideaIdx + 1}
                          </p>
                          <p className="text-foreground/90 text-sm">
                            {typed}
                            <span className="inline-block w-1.5 h-3 bg-primary align-middle animate-pulse ml-px" />
                          </p>
                        </div>
                      )}
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
};
