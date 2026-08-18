import { useEffect, useState } from "react";
import { TerminalWindow } from "../TerminalWindow";

const COMMANDS = [
  { cmd: "whoami", out: "Shahid Ansari · SDE-2 · Bengaluru 🇮🇳" },
  { cmd: "cat skills.txt", out: "react · next · typescript · tailwind · graphql" },
  { cmd: "git log --oneline", out: "a3f9c21 ship exlr8 · 7b2e0cd gamified lms · ..." },
  { cmd: "uptime", out: "5+ years shipping pixel-perfect web apps" },
];

export const CyclingTerminal = () => {
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"typing" | "output" | "pause">("typing");

  useEffect(() => {
    const cur = COMMANDS[idx].cmd;
    if (phase === "typing") {
      if (typed.length < cur.length) {
        const id = setTimeout(() => setTyped(cur.slice(0, typed.length + 1)), 60);
        return () => clearTimeout(id);
      }
      const id = setTimeout(() => setPhase("output"), 400);
      return () => clearTimeout(id);
    }
    if (phase === "output") {
      const id = setTimeout(() => setPhase("pause"), 1600);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => {
      setTyped("");
      setIdx((i) => (i + 1) % COMMANDS.length);
      setPhase("typing");
    }, 600);
    return () => clearTimeout(id);
  }, [typed, phase, idx]);

  return (
    <TerminalWindow title="shahid — zsh" className="w-72">
      <div>
        <span className="text-term-prompt">~ $</span>{" "}
        <span>{typed}</span>
        <span className="inline-block w-2 h-4 bg-term-text align-middle ml-0.5 animate-blink" />
      </div>
      {(phase === "output" || phase === "pause") && (
        <div className="mt-1 text-foreground text-xs">{COMMANDS[idx].out}</div>
      )}
    </TerminalWindow>
  );
};
