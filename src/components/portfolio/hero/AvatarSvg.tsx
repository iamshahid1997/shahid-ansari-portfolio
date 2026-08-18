import { motion } from "framer-motion";

interface Props {
  smiling?: boolean;
}

/**
 * Stylized illustrated dev avatar.
 * - Default: neutral mouth, eyes open
 * - smiling=true: curved smile, headphones bounce, eyes squint
 */
export const AvatarSvg = ({ smiling = false }: Props) => {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="hsl(var(--primary) / 0.35)" />
          <stop offset="100%" stopColor="hsl(var(--background-2))" />
        </radialGradient>
        <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8b894" />
          <stop offset="100%" stopColor="#c8966f" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="95" fill="url(#bgGrad)" />

      {/* Neck */}
      <rect x="86" y="140" width="28" height="24" rx="6" fill="url(#skinGrad)" />
      {/* T-shirt */}
      <path
        d="M 60 175 Q 100 155 140 175 L 145 200 L 55 200 Z"
        fill="hsl(var(--primary))"
      />
      <text
        x="100"
        y="192"
        textAnchor="middle"
        fontFamily="JetBrains Mono"
        fontSize="9"
        fontWeight="700"
        fill="hsl(var(--primary-foreground))"
      >
        {"<dev/>"}
      </text>

      {/* Head */}
      <ellipse cx="100" cy="100" rx="42" ry="46" fill="url(#skinGrad)" />

      {/* Hair */}
      <path
        d="M 60 88 Q 60 55 100 55 Q 140 55 140 90 Q 140 76 130 72 Q 120 60 100 60 Q 78 60 70 75 Q 60 80 60 88 Z"
        fill="#1a0f0a"
      />

      {/* Glasses */}
      <g stroke="#2a2520" strokeWidth="2.5" fill="none">
        <circle cx="84" cy="100" r="11" fill="hsl(var(--background) / 0.3)" />
        <circle cx="116" cy="100" r="11" fill="hsl(var(--background) / 0.3)" />
        <line x1="95" y1="100" x2="105" y2="100" />
      </g>

      {/* Eyes */}
      <motion.g
        animate={
          smiling
            ? { scaleY: 0.3 }
            : { scaleY: [1, 1, 0.1, 1, 1] }
        }
        transition={
          smiling
            ? { duration: 0.25 }
            : { duration: 4, repeat: Infinity, times: [0, 0.92, 0.95, 0.98, 1] }
        }
        style={{ transformOrigin: "100px 100px", transformBox: "fill-box" as const }}
      >
        <circle cx="84" cy="100" r="2.6" fill="#1a0f0a" />
        <circle cx="116" cy="100" r="2.6" fill="#1a0f0a" />
      </motion.g>

      {/* Mouth — morphs to smile when smiling */}
      <motion.path
        animate={{
          d: smiling
            ? "M 88 122 Q 100 134 112 122"
            : "M 90 124 Q 100 126 110 124",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        stroke="#5a2818"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Headphones — bounce on smile */}
      <motion.g
        animate={smiling ? { y: [-2, -5, -2] } : { y: 0 }}
        transition={
          smiling
            ? { duration: 0.4, repeat: Infinity, repeatType: "reverse" }
            : {}
        }
      >
        <path
          d="M 58 100 Q 58 56 100 56 Q 142 56 142 100"
          stroke="#2a2520"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        <rect x="50" y="92" width="14" height="22" rx="5" fill="#2a2520" />
        <rect x="136" y="92" width="14" height="22" rx="5" fill="#2a2520" />
        <rect x="52" y="96" width="10" height="14" rx="3" fill="hsl(var(--primary))" />
        <rect x="138" y="96" width="10" height="14" rx="3" fill="hsl(var(--primary))" />
      </motion.g>

      {/* Cheek blush when smiling */}
      <motion.g animate={{ opacity: smiling ? 0.6 : 0 }}>
        <ellipse cx="74" cy="115" rx="5" ry="3" fill="#f08070" />
        <ellipse cx="126" cy="115" rx="5" ry="3" fill="#f08070" />
      </motion.g>
    </svg>
  );
};
