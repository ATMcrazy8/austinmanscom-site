"use client";

import { motion } from "framer-motion";

export default function AnimatedLogo() {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      className="absolute left-1/4 top-[-25%] w-[1000px] h-[1000px] z-0 pointer-events-none -translate-x-1/2 text-ring"
    >
      <motion.g
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="miter"
        fill="none"
      >
        {/*** A Paths ***/}
        {/* Lead A */}
        <motion.path
          d="M40 88 L64 24 L88 88"
          animate={{ y: [200, 0, -200] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "loop",
            ease: [0.45, 0.02, 0.15, 1],
          }}
          strokeOpacity={0.1}
        />

        {/* Middle A */}
        <motion.path
          d="M40 88 L64 24 L88 88"
          animate={{ y: [200, 0, -200] }}
          transition={{
            duration: 24,
            repeat: Infinity,
            repeatType: "loop",
            ease: [0.45, 0.02, 0.15, 1],
            delay: 0.5,
          }}
          strokeOpacity={0.06}
        />

        {/* Trailing A */}
        <motion.path
          d="M40 88 L64 24 L88 88"
          animate={{ y: [200, 0, -200] }}
          transition={{
            duration: 42,
            repeat: Infinity,
            repeatType: "loop",
            ease: [0.45, 0.02, 0.15, 1],
            delay: 1,
          }}
          strokeOpacity={0.03}
        />

        {/*** M Paths ***/}
        {/* Lead M */}
        <motion.path
          d="M24 88 L48 24 L64 60 L80 24 L104 88"
          animate={{ y: [-200, 0, 200] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "loop",
            ease: [0.45, 0.02, 0.15, 1],
          }}
          strokeOpacity={0.1}
        />

        {/* Middle M */}
        <motion.path
          d="M24 88 L48 24 L64 60 L80 24 L104 88"
          animate={{ y: [-200, 0, 200] }}
          transition={{
            duration: 24,
            repeat: Infinity,
            repeatType: "loop",
            ease: [0.45, 0.02, 0.15, 1],
            delay: 0.5,
          }}
          strokeOpacity={0.06}
        />

        {/* Trailing M */}
        <motion.path
          d="M24 88 L48 24 L64 60 L80 24 L104 88"
          animate={{ y: [-200, 0, 200] }}
          transition={{
            duration: 42,
            repeat: Infinity,
            repeatType: "loop",
            ease: [0.45, 0.02, 0.15, 1],
            delay: 1,
          }}
          strokeOpacity={0.03}
        />
      </motion.g>
    </motion.svg>
  );
}
