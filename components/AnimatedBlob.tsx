"use client";

import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";

export default function RisingBlob() {
  const angle = useMotionValue(0);

  useAnimationFrame((t) => {
    angle.set((t / 50) % 360); // Slower loop
  });

  // Wider arc across screen
  const radiusX = 800; // ⬅ adjust for full-screen width coverage
  const radiusY = 600; // Height of the arc

  // Reverse direction by negating cosine
  const x = useTransform(angle, (a) => `${-Math.cos((a * Math.PI) / 180) * radiusX}px`);
  const y = useTransform(angle, (a) => `${-Math.sin((a * Math.PI) / 180) * radiusY}px`);
  const rotate = useTransform(angle, (a) => a);

  return (
    <motion.div
      style={{ x, y, rotate }}
      className="absolute left-[calc(50%-250px)] top-full w-[500px] h-[500px] bg-primary/10 blur-2xl rounded-full z-0 pointer-events-none"
    />
  );
}
