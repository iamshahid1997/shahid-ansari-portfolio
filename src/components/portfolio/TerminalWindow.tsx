import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export const TerminalWindow = ({ title = "shahid — zsh", children, className }: TerminalWindowProps) => (
  <div
    className={cn(
      "rounded-lg overflow-hidden border border-term-border bg-term-bg shadow-paper font-mono text-sm",
      className
    )}
  >
    <div className="flex items-center gap-2 px-3 py-2 bg-background-2 border-b border-term-border">
      <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
      <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
      <span className="w-3 h-3 rounded-full bg-[#28c840]" />
      <span className="ml-3 text-foreground-muted text-xs">{title}</span>
    </div>
    <div className="p-4 text-term-text">{children}</div>
  </div>
);
