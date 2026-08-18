import { motion, useMotionValue } from "framer-motion";
import { ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

interface DraggablePropProps {
  children: ReactNode;
  className?: string;
  initialRotate?: number;
  bobDelay?: number;
}

/** Draggable, idle-bobbing desk prop. Constrained to nearest "section" parent. */
export const DraggableProp = ({
  children,
  className,
  initialRotate = 0,
  bobDelay = 0,
}: DraggablePropProps) => {
  const constraintsRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  return (
    <motion.div
      ref={constraintsRef}
      drag
      dragMomentum={false}
      dragElastic={0.18}
      whileTap={{ scale: 1.05, cursor: "grabbing" }}
      whileHover={{ scale: 1.04, rotate: initialRotate + 2 }}
      style={{ x, y, rotate: initialRotate }}
      animate={{ y: [0, -8, 0] }}
      transition={{
        y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: bobDelay },
      }}
      className={cn("cursor-grab select-none touch-none", className)}
    >
      {children}
    </motion.div>
  );
};
