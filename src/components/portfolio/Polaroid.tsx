import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PolaroidProps {
  children?: ReactNode;
  caption?: string;
  rotate?: number;
  className?: string;
  onClick?: () => void;
}

export const Polaroid = ({ children, caption, rotate = 0, className, onClick }: PolaroidProps) => (
  <div
    onClick={onClick}
    style={{ transform: `rotate(${rotate}deg)` }}
    className={cn(
      "bg-[#f5f1ea] p-3 pb-5 shadow-paper rounded-sm transition-transform duration-300 hover:scale-[1.03] hover:rotate-0",
      onClick && "cursor-pointer",
      className
    )}
  >
    <div className="bg-background-2 overflow-hidden">{children}</div>
    {caption && (
      <p className="font-hand text-xl text-stone-800 text-center mt-3">{caption}</p>
    )}
  </div>
);
