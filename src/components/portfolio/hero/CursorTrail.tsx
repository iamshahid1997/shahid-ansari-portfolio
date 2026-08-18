import { useEffect, useRef } from "react";

const GLYPHS = ["<", ">", "{", "}", ";", "/", "*", "()", "=>"];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  glyph: string;
  rot: number;
}

/**
 * Subtle character-trail that follows the cursor on desktop only.
 * Disabled on touch and prefers-reduced-motion.
 */
export const CursorTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const raf = useRef<number>();

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    let last = 0;
    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - last < 50) return; // throttle
      last = now;
      particles.current.push({
        x: e.clientX,
        y: e.clientY,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -0.4 - Math.random() * 0.6,
        life: 1,
        glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        rot: (Math.random() - 0.5) * 30,
      });
      if (particles.current.length > 40) particles.current.shift();
    };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current = particles.current.filter((p) => p.life > 0);
      particles.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.font = "12px JetBrains Mono, monospace";
        ctx.fillStyle = `hsla(24, 75%, 64%, ${p.life * 0.55})`;
        ctx.fillText(p.glyph, 0, 0);
        ctx.restore();
      });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[60]"
      aria-hidden
    />
  );
};
