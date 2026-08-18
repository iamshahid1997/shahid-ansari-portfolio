import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { IdLanyard } from "./hero/IdLanyard";
import { MusicCard } from "./hero/MusicCard";
import { BoardingPass } from "./hero/BoardingPass";
import { SportsArcade } from "./hero/SportsArcade";
import { CyclingTerminal } from "./hero/CyclingTerminal";
import { CursorTrail } from "./hero/CursorTrail";
import { KonamiEasterEgg } from "./hero/KonamiEasterEgg";

const FIRST = "Shahid";
const LAST = "Ansari";
const GLYPHS = "@#$%&*<>{}/\\";

const Letter = ({ char, delay }: { char: string; delay: number }) => {
  const [shuffling, setShuffling] = useState(false);
  const [display, setDisplay] = useState(char);

  const shuffle = () => {
    if (shuffling) return;
    setShuffling(true);
    let n = 0;
    const id = setInterval(() => {
      n++;
      setDisplay(GLYPHS[Math.floor(Math.random() * GLYPHS.length)]);
      if (n > 6) {
        clearInterval(id);
        setDisplay(char);
        setShuffling(false);
      }
    }, 60);
  };

  return (
    <motion.span
      initial={{ y: 120, opacity: 0, rotate: 8 }}
      animate={{ y: 0, opacity: 1, rotate: 0 }}
      transition={{ delay, type: "spring", stiffness: 90, damping: 14 }}
      whileHover={{
        y: -10,
        rotate: -3,
        color: "hsl(var(--primary))",
        transition: { type: "spring", stiffness: 300 },
      }}
      onClick={shuffle}
      className="inline-block cursor-pointer select-none"
    >
      {display === " " ? "\u00a0" : display}
    </motion.span>
  );
};

export const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const nameScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden pt-20"
    >
      <CursorTrail />
      <KonamiEasterEgg />
      {/* Atmospheric background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_80%,hsl(var(--git-cyan)/0.08),transparent_50%)]" />
        {/* Animated grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Floating sparkles */}
        {[
          { x: "15%", y: "20%", d: 0 },
          { x: "75%", y: "30%", d: 1.2 },
          { x: "40%", y: "80%", d: 2.4 },
          { x: "90%", y: "55%", d: 0.8 },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0], y: [0, -30, 0] }}
            transition={{
              duration: 6,
              delay: s.d,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ left: s.x, top: s.y }}
            className="absolute w-1.5 h-1.5 rounded-full bg-primary"
          />
        ))}
      </div>

      {/* Desktop layout — 12-col grid, two rows */}
      <div className="relative max-w-[1400px] mx-auto px-8 hidden md:grid grid-cols-12 gap-x-6 gap-y-10 min-h-[calc(100vh-5rem)] pb-12">
        {/* Row 1 ─ Left: ID lanyard */}
        <div className="col-span-3 row-start-1 flex justify-start pt-0">
          <IdLanyard />
        </div>

        {/* Row 1 ─ Center: name + tagline */}
        <motion.div
          style={{ y: nameY, scale: nameScale, opacity: nameOpacity }}
          className="col-span-6 row-start-1 flex flex-col justify-center pl-4"
        >
          <h1 className="font-display leading-[0.85] tracking-tighter">
            <div className="text-[7rem] lg:text-[9rem] xl:text-[12rem]">
              {FIRST.split("").map((c, i) => (
                <Letter key={i} char={c} delay={0.4 + i * 0.05} />
              ))}
            </div>
            <div className="text-[7rem] lg:text-[9rem] xl:text-[12rem] text-primary/95 -mt-4 lg:-mt-6">
              {LAST.split("").map((c, i) => (
                <Letter key={i} char={c} delay={0.7 + i * 0.05} />
              ))}
            </div>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="mt-8 flex items-center gap-4"
          >
            <span className="font-mono text-git-green text-sm">{">"}</span>
            <p className="font-mono text-base text-foreground-muted">
              frontend engineer
              <span className="inline-block w-2 h-4 bg-foreground-muted align-middle ml-1 animate-blink" />
            </p>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7 }}
            className="font-hand text-3xl text-primary mt-3 ml-7"
          >
            building polished, fast, web apps.
          </motion.p>
        </motion.div>

        {/* Row 1 ─ Right: boarding pass on top, music card directly below */}
        <div className="col-span-3 row-start-1 flex flex-col items-end gap-6 pt-4">
          <BoardingPass />
          <MusicCard />
        </div>

        {/* Row 2 ─ Left: terminal under the lanyard */}
        <div className="col-span-5 row-start-2 flex items-end justify-start">
          <CyclingTerminal />
        </div>

        {/* Row 2 ─ Spacer to push arcade to the bottom-right */}
        <div className="col-span-3 row-start-2" aria-hidden />

        {/* Row 2 ─ Right: sports arcade anchored bottom-right */}
        <div className="col-span-4 row-start-2 flex items-end justify-end">
          <SportsArcade />
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden flex flex-col items-center text-center px-5 pt-2 gap-6 pb-16">
        <div className="w-full flex justify-center">
          <IdLanyard />
        </div>
        <h1 className="font-display text-[clamp(3.25rem,17vw,6rem)] leading-[0.85] tracking-tighter">
          {FIRST.split("").map((c, i) => (
            <Letter key={i} char={c} delay={0.4 + i * 0.05} />
          ))}
          <br />
          <span className="text-primary">
            {LAST.split("").map((c, i) => (
              <Letter key={i} char={c} delay={0.7 + i * 0.05} />
            ))}
          </span>
        </h1>
        <div className="flex items-center gap-2">
          <span className="font-mono text-git-green text-sm">{">"}</span>
          <p className="font-mono text-sm text-foreground-muted">
            frontend engineer
            <span className="inline-block w-2 h-4 bg-foreground-muted align-middle ml-1 animate-blink" />
          </p>
        </div>
        <p className="font-hand text-2xl text-primary px-2">
          building polished, fast, web apps.
        </p>
        <div className="w-full flex flex-col items-center gap-6">
          <BoardingPass />
          <MusicCard />
          <SportsArcade />
          <CyclingTerminal />
        </div>
      </div>
    </section>
  );
};
