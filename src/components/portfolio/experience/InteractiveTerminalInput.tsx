import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { experience } from "@/data/portfolio";

const fakeHash = (s: string) =>
  Array.from(s)
    .reduce((acc, c) => acc + c.charCodeAt(0), 0)
    .toString(16)
    .padStart(7, "a")
    .slice(-7);

interface Line {
  type: "cmd" | "out" | "err";
  text: string;
}

interface Props {
  onShowCommit: (idx: number) => void;
}

export const InteractiveTerminalInput = ({ onShowCommit }: Props) => {
  const [history, setHistory] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [history]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;

    setCmdHistory((h) => [...h, cmd]);
    setHIdx(-1);

    const lines: Line[] = [{ type: "cmd", text: cmd }];

    const lower = cmd.toLowerCase();

    if (lower === "clear") {
      setHistory([]);
      return;
    }
    if (lower === "help") {
      lines.push(
        { type: "out", text: "available commands:" },
        { type: "out", text: "  git log               — show all commits" },
        { type: "out", text: "  git show <hash>       — expand a commit (try the hashes above)" },
        { type: "out", text: "  whoami                — about me" },
        { type: "out", text: "  ls                    — list current jobs" },
        { type: "out", text: "  cat resume.pdf        — fetch resume" },
        { type: "out", text: "  clear                 — clear the screen" },
        { type: "out", text: "  sudo hire-me          — what you came for" }
      );
    } else if (lower === "whoami") {
      lines.push({
        type: "out",
        text: "shahid — frontend engineer · 4y · ships polished web apps for breakfast",
      });
    } else if (lower === "ls") {
      experience.forEach((e) =>
        lines.push({ type: "out", text: `${e.company.padEnd(28)} ${e.period}` })
      );
    } else if (lower === "git log" || lower === "git log --all") {
      experience.forEach((e) =>
        lines.push({
          type: "out",
          text: `${fakeHash(e.company)}  feat: ${e.role.toLowerCase()}`,
        })
      );
    } else if (lower.startsWith("git show ")) {
      const hash = lower.slice(9).trim();
      const idx = experience.findIndex((e) => fakeHash(e.company) === hash);
      if (idx >= 0) {
        onShowCommit(idx);
        lines.push({
          type: "out",
          text: `commit ${hash} expanded above ↑`,
        });
      } else {
        lines.push({
          type: "err",
          text: `fatal: bad object ${hash}`,
        });
      }
    } else if (lower === "cat resume.pdf") {
      lines.push({
        type: "err",
        text: "permission denied: nice try 😏 — request a copy via email instead",
      });
    } else if (lower === "sudo hire-me") {
      lines.push(
        { type: "out", text: "[sudo] authenticating intent... ✓" },
        { type: "out", text: "scroll down to /freelance to send your brief 🚀" }
      );
    } else if (lower === "exit" || lower === "quit") {
      lines.push({ type: "out", text: "you can never truly leave the terminal." });
    } else {
      lines.push({
        type: "err",
        text: `zsh: command not found: ${cmd.split(" ")[0]} — try 'help'`,
      });
    }

    setHistory((h) => [...h, ...lines]);
    setInput("");
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(cmdHistory.length - 1, hIdx + 1);
      setHIdx(next);
      setInput(cmdHistory[cmdHistory.length - 1 - next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(-1, hIdx - 1);
      setHIdx(next);
      setInput(next === -1 ? "" : cmdHistory[cmdHistory.length - 1 - next] ?? "");
    }
  };

  const focus = () => inputRef.current?.focus();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      onClick={focus}
      className="font-mono text-xs sm:text-sm mt-6 cursor-text"
    >
      {history.map((l, i) => (
        <div key={i} className="break-all">
          {l.type === "cmd" && (
            <>
              <span className="text-git-green">shahid@portfolio</span>
              <span className="text-foreground-muted">:</span>
              <span className="text-git-cyan">~/career</span>
              <span className="text-foreground-muted">$ </span>
              <span className="text-foreground">{l.text}</span>
            </>
          )}
          {l.type === "out" && (
            <span className="text-foreground/85 pl-2">{l.text}</span>
          )}
          {l.type === "err" && (
            <span className="text-git-red pl-2">{l.text}</span>
          )}
        </div>
      ))}

      {/* live prompt */}
      <div className="flex items-center break-all">
        <span className="text-git-green shrink-0">shahid@portfolio</span>
        <span className="text-foreground-muted">:</span>
        <span className="text-git-cyan shrink-0">~/career</span>
        <span className="text-foreground-muted">$&nbsp;</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          aria-label="terminal input"
          className="flex-1 bg-transparent border-0 outline-none font-mono text-foreground caret-primary"
          placeholder="type 'help'"
        />
      </div>
      <div ref={scrollRef} />
    </motion.div>
  );
};
