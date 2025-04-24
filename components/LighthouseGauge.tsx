"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

export default function LighthouseGauge() {
  const [displayedScore, setDisplayedScore] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });
  const controls = useAnimation();

  const finalScore = 100;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (isInView) {
      controls.start("visible");

      // Counter animation synced with circle animation
      let start = 0;
      const duration = 1500; // ms
      const interval = 10;
      const steps = duration / interval;
      const increment = finalScore / steps;

      const counter = setInterval(() => {
        start += increment;
        if (start >= finalScore) {
          start = finalScore;
          clearInterval(counter);
        }
        setDisplayedScore(Math.round(start));
      }, interval);

      return () => clearInterval(counter);
    }
  }, [isInView, controls]);

  const getColor = (score: number) => {
    if (score >= 90) return "hsl(142, 76%, 36%)"; // Green
    if (score >= 50) return "hsl(45, 93%, 47%)"; // Yellow
    return "hsl(0, 84%, 60%)"; // Red
  };

  return (
    <div ref={containerRef} className="relative w-[300px] h-[300px] flex items-center justify-center">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth="8"
        />

        {/* Animated score circle */}
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={getColor(finalScore)}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={controls}
          variants={{
            visible: {
              strokeDashoffset: 0,
              transition: { duration: 1.5, ease: "easeOut" }
            }
          }}
        />

        {/* Score text */}
        <motion.text
            x="50"
            y="45"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="14"
            fontWeight="700"
            fill="hsl(var(--foreground))"
            initial={{ opacity: 0 }}
            animate={controls}
            variants={{
                visible: { opacity: 1, transition: { delay: 0.4, duration: 0.4 } }
            }}
        >
          {displayedScore}
        </motion.text>

        {/* Label */}
        <motion.text
            x="50"
            y="60"
            textAnchor="middle"
            fontSize="10"
            fill="hsl(var(--muted-foreground))"
            initial={{ opacity: 0 }}
            animate={controls}
            variants={{
                visible: { opacity: 1, transition: { delay: 0.2, duration: 0.2 } }
            }}
        >
          Performance
        </motion.text>
      </svg>
    </div>
  );
}
