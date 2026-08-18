import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Linkedin, Github, Mail, ArrowUpRight, Terminal } from "lucide-react";
import { navLinks, socialLinks } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const ROUTE_HINT: Record<string, string> = {
  Home: "~/",
  About: "~/about",
  Projects: "~/projects",
  Skills: "~/skills",
  Experience: "~/experience",
  Freelance: "~/freelance",
  Contact: "~/contact",
};

export const Nav = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, [open]);

  const istTime = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Kolkata",
  });

  const handleNavClick = (href: string) => {
    setOpen(false);
    // Wait for menu close animation, then smooth-scroll
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(94vw,76rem)]">
        <div
          className={cn(
            "relative flex items-center justify-between gap-4 px-4 py-2.5 rounded-full border border-border transition-all",
            scrolled
              ? "bg-background-2/85 backdrop-blur-xl shadow-[0_8px_32px_-8px_hsl(var(--primary)/0.35)]"
              : "bg-background-2/70 backdrop-blur-md shadow-[0_4px_24px_-8px_hsl(var(--primary)/0.25)]"
          )}
        >
            <a href="#home" className="group font-display text-xl pl-2 tracking-tight flex items-center gap-1.5">
              <span className="relative inline-flex items-center justify-center">
                <motion.span
                  className="absolute inset-0 rounded-full bg-primary/40 blur-md"
                  animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.9, 1.15, 0.9] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                />
                <span className="relative text-primary">S</span>
              </span>
              <span>hahid</span>
              <span className="font-hand text-foreground-muted ml-1.5 text-base group-hover:text-primary transition-colors">/dev</span>
            </a>

            <nav className="hidden md:flex items-center gap-0.5 relative">
              {navLinks.map((l, i) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="group relative px-3 py-1.5 text-sm text-foreground-muted hover:text-foreground transition-colors"
                >
                  {/* sliding pill on hover */}
                  <span className="absolute inset-0 rounded-full bg-primary/10 scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300" />
                  {/* underline accent */}
                  <span className="absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-primary to-git-cyan scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                  <span className="relative font-mono text-[10px] text-primary/70 mr-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    0{i + 1}
                  </span>
                  <span className="relative">{l.label}</span>
                </a>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-2 pr-1">
              {/* Live status chip */}
              <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-git-green/10 border border-git-green/30">
                <span className="relative flex w-1.5 h-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-git-green opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-git-green" />
                </span>
                <span className="font-mono text-[10px] text-git-green tracking-wider uppercase">Open to work</span>
              </div>

              <div className="flex items-center gap-0.5">
                {[
                  { Icon: Linkedin, href: socialLinks.linkedin, ext: true, label: "LinkedIn" },
                  { Icon: Github, href: socialLinks.github, ext: true, label: "GitHub" },
                  { Icon: Mail, href: `mailto:${socialLinks.email}`, ext: false, label: "Email" },
                ].map(({ Icon, href, ext, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={ext ? "_blank" : undefined}
                    rel={ext ? "noreferrer" : undefined}
                    aria-label={label}
                    className="relative p-2 text-foreground-muted hover:text-primary transition-colors group"
                  >
                    <span className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/10 scale-75 group-hover:scale-100 transition-all duration-300" />
                    <Icon size={15} className="relative" />
                  </a>
                ))}
              </div>
            </div>

            <button
              className="md:hidden relative p-2 z-[80]"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="block"
                  >
                    <X size={22} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="m"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="block"
                  >
                    <Menu size={22} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
      </header>

      {/* ───── Mobile fullscreen menu (rendered as sibling to header) ───── */}
      <AnimatePresence>
        {open && (
          <div className="md:hidden fixed inset-0 z-[70]">
            {/* Curtain panels — purely decorative, sit behind content */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                aria-hidden
                className={cn(
                  "absolute inset-0 pointer-events-none",
                  i === 0 && "bg-primary",
                  i === 1 && "bg-background-2",
                  i === 2 && "bg-background"
                )}
                style={{ zIndex: i + 1 }}
                initial={{ x: "100%" }}
                animate={{ x: "0%" }}
                exit={{ x: "100%" }}
                transition={{
                  duration: 0.55,
                  ease: [0.76, 0, 0.24, 1],
                  delay: i * 0.08,
                }}
              />
            ))}

            {/* Grid + accent (decorative) */}
            <motion.div
              aria-hidden
              className="absolute inset-0 opacity-[0.06] pointer-events-none"
              style={{
                zIndex: 4,
                backgroundImage:
                  "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.06 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            />
            <motion.div
              aria-hidden
              className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl pointer-events-none"
              style={{ zIndex: 5 }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ delay: 0.45, duration: 0.6 }}
            />

            {/* INTERACTIVE CONTENT — explicit high z + auto pointer-events */}
            <motion.div
              className="absolute inset-0 flex flex-col px-6 pt-20 pb-8 overflow-y-auto"
              style={{ zIndex: 10 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.45, duration: 0.3 }}
            >
              {/* Terminal header */}
              <div className="font-mono text-[11px] text-foreground-muted flex items-center justify-between mb-8 border-b border-border pb-3">
                <span className="flex items-center gap-2">
                  <Terminal size={12} className="text-primary" />
                  shahid@portfolio:~$
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-git-green animate-pulse" />
                  IST {istTime}
                </span>
              </div>

              {/* Big route list */}
              <nav className="flex flex-col gap-1">
                {navLinks.map((l, i) => (
                  <motion.button
                    key={l.href}
                    type="button"
                    onClick={() => handleNavClick(l.href)}
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.55 + i * 0.06,
                      type: "spring",
                      stiffness: 120,
                      damping: 18,
                    }}
                    className="group relative flex items-baseline justify-between border-b border-border/50 py-4 overflow-hidden text-left w-full"
                  >
                    <span className="absolute left-0 top-3 font-mono text-[10px] text-primary/70 -translate-x-1">
                      0{i + 1}
                    </span>
                    <span className="absolute inset-0 bg-primary/10 -translate-x-full group-hover:translate-x-0 group-active:translate-x-0 transition-transform duration-300" />
                    <span className="relative pl-7 font-display text-4xl leading-none tracking-tight group-hover:text-primary group-active:text-primary transition-colors">
                      {l.label}
                    </span>
                    <span className="relative font-mono text-[11px] text-foreground-muted flex items-center gap-1.5 pr-1">
                      {ROUTE_HINT[l.label]}
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                      />
                    </span>
                  </motion.button>
                ))}
              </nav>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="font-hand text-2xl text-primary mt-10"
              >
                Let's build something great.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="mt-auto pt-8 grid grid-cols-3 gap-2"
              >
                {[
                  { label: "LinkedIn", icon: Linkedin, href: socialLinks.linkedin, ext: true },
                  { label: "GitHub", icon: Github, href: socialLinks.github, ext: true },
                  { label: "Email", icon: Mail, href: `mailto:${socialLinks.email}`, ext: false },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.ext ? "_blank" : undefined}
                    rel={s.ext ? "noreferrer" : undefined}
                    onClick={() => setOpen(false)}
                    className="group relative flex flex-col items-start gap-2 rounded-xl border border-border bg-background-2/60 p-3 hover:border-primary hover:bg-primary/5 transition-all"
                  >
                    <s.icon size={16} className="text-primary" />
                    <span className="font-mono text-[10px] text-foreground-muted group-hover:text-foreground">
                      {s.label}
                    </span>
                    <ArrowUpRight
                      size={10}
                      className="absolute top-2 right-2 text-foreground-muted opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </a>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                className="font-mono text-[10px] text-foreground-muted mt-4 flex items-center gap-1"
              >
                $ <span className="inline-block w-2 h-3 bg-primary animate-blink" />
                <span className="ml-auto">esc to close</span>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
