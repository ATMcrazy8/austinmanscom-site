"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "framer-motion";

export default function RisingBlob() {
  const angle = useMotionValue(0);

  useAnimationFrame((t) => {
    angle.set((t / 50) % 360); // Slow orbit
  });

  const radiusX = 800;
  const radiusY = 600;

  const x = useTransform(angle, (a) => `${-Math.cos((a * Math.PI) / 180) * radiusX}px`);
  const y = useTransform(angle, (a) => `${-Math.sin((a * Math.PI) / 180) * radiusY}px`);
  const rotate = useTransform(angle, (a) => a);

  return (
    <>
      {/* Circle (sun/orbit) */}
      <motion.div
        style={{ x, y, rotate }}
        className="absolute left-[calc(50%-250px)] top-full w-[200px] h-[200px] bg-chart-3/15 blur-md rounded-full -z-100 pointer-events-none"
      />

      {/* Triangle (bobbing motion) */}
      <motion.div
        initial={{ 
          y: 0, 
          rotate: "0deg"
         }}
        animate={{ 
          y: [0, -60, 0, 40, 0],
          rotate: "360deg"
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[20%] left-[15%] w-0 h-0 border-l-[80px] border-r-[80px] border-b-[140px] border-l-transparent border-r-transparent border-b-chart-5/15 blur-md -z-100 pointer-events-none"
      />

      {/* Square (linear path) */}
      <motion.div
      initial={{ y: "-20vh" }}
        animate={{
          x: ["-10vw", "80vw", "-10vw"],   // Bounce horizontally
          scale: [1, 0.3, 1],              // Scale up at edges
          rotate: ["10deg", "-10deg", "10deg"], // Optional: subtle spin
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",              // Smooth bounce
        }}
        className="absolute top-[70%] w-[200px] h-[200px] bg-chart-1/15 blur-md -z-100 pointer-events-none"
      />
    </>
  );
}
