"use client";

import Image from "next/image";
import { useTheme } from "@/app/context/ThemeProvider";
import { motion } from "framer-motion";

export default function ThemedHeadshot() {
  const { theme } = useTheme();

  // Theme hues
  const themes: Record<string, number> = {
    mint: 160,
    ocean: 190,
    ultraviolet: 265,
    pink: 330,
    heat: 360,
    goldenrod: 50,
  };

  const hue = themes[theme] ?? 150;
  const hueRotateValue = (hue - 53 + 360) % 360;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.5 }}
      className="flex items-center justify-center border-4 border-monotone-foreground rounded-full overflow-hidden shadow-lg"
    >
      <Image
        src="/AustinMansHeadshot.jpg"
        width={240}
        height={240}
        alt="Austin Mans - Web Developer based in Hudson, WI"
        className="rounded-full"
        style={{
          filter: `sepia(100%) hue-rotate(${hueRotateValue}deg)`,
          transition: "filter 0.5s ease",
        }}
      />
    </motion.div>
  );
}
