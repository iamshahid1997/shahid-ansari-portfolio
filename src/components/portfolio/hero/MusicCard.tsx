import { motion, useAnimationFrame } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Play, Pause, SkipForward } from "lucide-react";

const TRACKS = [
  { title: "lofi.beats", artist: "shahid in flow" },
  { title: "console.log('focus')", artist: "deep work fm" },
  { title: "midnight.refactor", artist: "the dev hours" },
  { title: "useEffect blues", artist: "react therapy" },
];

const BAR_COUNT = 14;

export const MusicCard = () => {
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  const startTime = useRef(Date.now());
  const [trackIdx, setTrackIdx] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setTrackIdx((i) => (i + 1) % TRACKS.length), 5000);
    return () => clearInterval(id);
  }, [playing]);

  useAnimationFrame(() => {
    const t = (Date.now() - startTime.current) / 1000;
    barRefs.current.forEach((el, i) => {
      if (!el) return;
      const base = playing
        ? 30 + Math.abs(Math.sin(t * 3 + i * 0.6)) * 60 + Math.abs(Math.sin(t * 7 + i)) * 20
        : 15;
      el.style.height = `${Math.min(100, base)}%`;
    });
  });

  const track = TRACKS[trackIdx];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: 4 }}
      animate={{ opacity: 1, y: 0, rotate: 4 }}
      transition={{ delay: 0.6, type: "spring" }}
      whileHover={{ rotate: 0, scale: 1.03 }}
      className="mac-window w-72 p-0 overflow-hidden font-mono"
    >
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-mac-divider">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-[10px] text-foreground-muted">now-playing.app</span>
      </div>

      <div className="p-4 flex gap-3">
        {/* Vinyl */}
        <motion.div
          animate={{ rotate: playing ? 360 : 0 }}
          transition={{
            duration: 4,
            repeat: playing ? Infinity : 0,
            ease: "linear",
          }}
          className="shrink-0 w-16 h-16 rounded-full bg-vinyl relative shadow-paper"
          style={{
            backgroundImage:
              "repeating-radial-gradient(circle, hsl(var(--vinyl)) 0, hsl(var(--vinyl)) 2px, hsl(0 0% 12%) 2px, hsl(0 0% 12%) 3px)",
          }}
        >
          <div className="absolute inset-0 m-auto w-5 h-5 rounded-full bg-primary" />
          <div className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-vinyl" />
        </motion.div>

        <div className="min-w-0 flex-1">
          <p className="text-[10px] text-git-green">$ now playing</p>
          <motion.p
            key={track.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-foreground truncate mt-0.5"
          >
            {track.title}
          </motion.p>
          <motion.p
            key={track.artist}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] text-foreground-muted truncate"
          >
            — {track.artist}
          </motion.p>
        </div>
      </div>

      {/* Equalizer */}
      <div className="px-4 pb-3">
        <div className="flex items-end gap-[3px] h-10">
          {Array.from({ length: BAR_COUNT }).map((_, i) => (
            <div
              key={i}
              ref={(el) => (barRefs.current[i] = el)}
              className="flex-1 rounded-sm bg-gradient-to-t from-primary to-git-yellow"
              style={{ height: "20%" }}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="px-4 pb-3 flex items-center justify-between border-t border-mac-divider pt-2">
        <button
          onClick={() => setPlaying((p) => !p)}
          className="text-foreground-muted hover:text-primary transition-colors"
        >
          {playing ? <Pause size={14} /> : <Play size={14} />}
        </button>
        <div className="flex-1 mx-3 h-0.5 bg-mac-divider rounded-full overflow-hidden">
          <motion.div
            key={trackIdx}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "linear" }}
            className="h-full bg-primary"
          />
        </div>
        <button
          onClick={() => setTrackIdx((i) => (i + 1) % TRACKS.length)}
          className="text-foreground-muted hover:text-primary transition-colors"
        >
          <SkipForward size={14} />
        </button>
      </div>
    </motion.div>
  );
};
