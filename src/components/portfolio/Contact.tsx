import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Copy, Check, Linkedin, Github, Mail, Phone, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { socialLinks } from "@/data/portfolio";
import { toast } from "sonner";

type Channel = {
  key: string;
  label: string;
  handle: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  copyable: boolean;
  accent: string;
  meta: string;
};

const channels: Channel[] = [
  {
    key: "email",
    label: "EMAIL",
    handle: "@ansari.shah28",
    value: socialLinks.email,
    icon: Mail,
    href: `mailto:${socialLinks.email}`,
    copyable: true,
    accent: "hsl(var(--primary))",
    meta: "fastest. expect a reply ≤24h",
  },
  {
    key: "phone",
    label: "PHONE",
    handle: "+91 86191 80325",
    value: socialLinks.phone,
    icon: Phone,
    href: `tel:${socialLinks.phone.replace(/\s/g, "")}`,
    copyable: true,
    accent: "hsl(var(--git-green))",
    meta: "ist · mon–fri · 10:00–19:00",
  },
  {
    key: "linkedin",
    label: "LINKEDIN",
    handle: "in/shahid-ansari12",
    value: "shahid-ansari12",
    icon: Linkedin,
    href: socialLinks.linkedin,
    copyable: false,
    accent: "hsl(var(--git-cyan))",
    meta: "best for opportunities & intros",
  },
  {
    key: "github",
    label: "GITHUB",
    handle: "@iamshahid1997",
    value: "iamshahid1997",
    icon: Github,
    href: socialLinks.github,
    copyable: false,
    accent: "hsl(var(--git-yellow))",
    meta: "code, side-quests & dotfiles",
  },
];

/* ---------- Magnetic card ---------- */
const ChannelCard = ({ c, onCopied }: { c: Channel; onCopied: (k: string) => void }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [8, -8]), { stiffness: 200, damping: 18 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-8, 8]), { stiffness: 200, damping: 18 });
  const glowX = useTransform(mx, [-1, 1], ["0%", "100%"]);
  const glowY = useTransform(my, [-1, 1], ["0%", "100%"]);
  const Icon = c.icon;
  const [copied, setCopied] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  const onLeave = () => { mx.set(0); my.set(0); };

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(c.value);
    setCopied(true);
    onCopied(c.key);
    toast.success(`Copied ${c.label.toLowerCase()}`);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <motion.a
      ref={ref}
      href={c.href}
      target={c.href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 md:p-6 block"
    >
      {/* glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: `radial-gradient(400px circle at ${glowX} ${glowY}, ${c.accent}22, transparent 60%)`,
        }}
      />
      {/* corner ticks */}
      <span className="absolute top-2 left-2 font-mono text-[10px] text-foreground-muted tracking-widest">{c.label}</span>
      <span className="absolute top-2 right-2 font-mono text-[10px] text-foreground-muted">0{channels.indexOf(c) + 1}/04</span>

      <div className="mt-6 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5 mb-1">
            <span
              className="w-9 h-9 rounded-lg grid place-items-center"
              style={{ background: `${c.accent}1f`, color: c.accent }}
            >
              <Icon className="w-4 h-4" />
            </span>
            <div className="font-display text-2xl md:text-3xl truncate" style={{ transform: "translateZ(20px)" }}>
              {c.handle}
            </div>
          </div>
          <p className="font-mono text-[11px] text-foreground-muted mt-2">{c.meta}</p>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {c.copyable && (
            <button
              onClick={handleCopy}
              className="p-2 rounded-md border border-border hover:border-primary/50 hover:bg-background transition-colors"
              aria-label={`Copy ${c.label}`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span key="ok" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }}>
                    <Check className="w-4 h-4 text-[hsl(var(--git-green))]" />
                  </motion.span>
                ) : (
                  <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <Copy className="w-4 h-4 text-foreground-muted" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          )}
          <span className="p-2 rounded-md border border-border group-hover:border-primary/50 group-hover:bg-background transition-colors">
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
          </span>
        </div>
      </div>

      {/* underline accent */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" style={{ background: c.accent }} />
    </motion.a>
  );
};

/* ---------- Live time clock ---------- */
const useNowIST = () => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const fmt = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const hour = Number(new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", hour12: false }).format(now));
  const status = hour >= 10 && hour < 19 ? { label: "online", color: "hsl(var(--git-green))" } : { label: "offline · away", color: "hsl(var(--git-yellow))" };
  return { time: fmt.format(now), status };
};

/* ---------- Mailto composer ---------- */
const QuickCompose = () => {
  const [topic, setTopic] = useState("project");
  const [message, setMessage] = useState("");
  const subjects: Record<string, string> = {
    project: "New project — let's build something",
    role: "Full-time role · frontend",
    chat: "Just saying hi 👋",
    other: "Quick question",
  };
  const open = () => {
    const subject = encodeURIComponent(subjects[topic]);
    const body = encodeURIComponent(`Hey Shahid,\n\n${message || "..."}\n\n—`);
    window.location.href = `mailto:${socialLinks.email}?subject=${subject}&body=${body}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="rounded-2xl border border-border bg-card p-5 md:p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[10px] tracking-widest text-foreground-muted">QUICK COMPOSE</span>
        <span className="font-mono text-[10px] text-foreground-muted">→ ansari.shah28@gmail.com</span>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {Object.keys(subjects).map((k) => (
          <button
            key={k}
            onClick={() => setTopic(k)}
            className={`px-3 py-1.5 rounded-full font-mono text-[11px] border transition-all ${topic === k ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:border-primary/50"}`}
          >
            #{k}
          </button>
        ))}
      </div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="type your idea, role, or just say hi…"
        rows={4}
        className="w-full bg-background border border-border rounded-lg p-3 font-mono text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-primary/60 transition-colors resize-none"
      />
      <div className="flex items-center justify-between mt-3">
        <span className="font-mono text-[10px] text-foreground-muted">{message.length} chars</span>
        <button
          onClick={open}
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background font-mono text-xs hover:bg-primary transition-colors"
        >
          send via mail
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:rotate-45" />
        </button>
      </div>
    </motion.div>
  );
};

export const Contact = () => {
  const [, setLastCopied] = useState<string | null>(null);
  const { time, status } = useNowIST();

  return (
    <section id="contact" className="relative py-24 md:py-32 px-6 overflow-hidden">
      {/* decorative big watermark */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-end justify-end opacity-[0.04]">
        <span className="font-display text-[18rem] md:text-[28rem] leading-none -mb-20 -mr-10 select-none">hi.</span>
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* status header */}
        <div className="flex flex-wrap items-center gap-3 mb-4 font-mono text-[11px]">
          <span className="text-foreground-muted">~/contact</span>
          <span className="text-foreground-muted">·</span>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-border">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: status.color }} />
            <span style={{ color: status.color }}>{status.label}</span>
          </span>
          <span className="text-foreground-muted">·</span>
          <span className="text-foreground-muted">bengaluru, IST {time}</span>
        </div>

        {/* headline */}
        <div className="grid md:grid-cols-12 gap-6 items-end mb-10">
          <div className="md:col-span-8">
            <h2 className="font-display text-[3.5rem] md:text-[6rem] leading-[0.9] tracking-tighter">
              let's make
              <br />
              <span className="italic text-primary">something</span> good.
            </h2>
          </div>
          <div className="md:col-span-4">
            <p className="font-mono text-sm text-foreground-muted">
              <span className="text-[hsl(var(--git-green))]">▸</span> open to roles, freelance & collabs.
              <br />
              <span className="text-[hsl(var(--git-green))]">▸</span> usually replies within a day.
              <br />
              <span className="text-[hsl(var(--git-green))]">▸</span> bonus points for cool products.
            </p>
          </div>
        </div>

        {/* cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4">
          {channels.map((c) => (
            <ChannelCard key={c.key} c={c} onCopied={setLastCopied} />
          ))}
        </div>

        {/* quick compose */}
        <QuickCompose />

        {/* marquee */}
        <div className="mt-16 overflow-hidden border-y border-border py-3">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-12 whitespace-nowrap font-display text-3xl md:text-4xl"
          >
            {Array.from({ length: 2 }).flatMap((_, k) =>
              ["available for freelance", "★", "open to full-time", "★", "based in bengaluru", "★", "remote-friendly", "★"].map((w, i) => (
                <span key={`${k}-${i}`} className={i % 2 === 0 ? "text-foreground" : "text-primary"}>{w}</span>
              ))
            )}
          </motion.div>
        </div>

        {/* footer */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mt-12">
          <p className="font-hand text-2xl text-foreground-muted">
            built with React, Tailwind & too much coffee ☕
          </p>
          <p className="font-mono text-xs text-foreground-muted">
            © {new Date().getFullYear()} Shahid Ansari · crafted in bengaluru
          </p>
        </div>
      </div>
    </section>
  );
};
