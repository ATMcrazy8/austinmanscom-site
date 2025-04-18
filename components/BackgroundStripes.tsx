"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const stripes = [
  { width: "w-2", opacity: "bg-ring/[1%]" },
  { width: "w-2", opacity: "bg-ring/[2%]" },
  { width: "w-3", opacity: "bg-ring/[3%]" },
  { width: "w-3", opacity: "bg-ring/[4%]" },
  { width: "w-4", opacity: "bg-ring/[5%]" },
  { width: "w-4", opacity: "bg-ring/[6%]" },
  { width: "w-5", opacity: "bg-ring/[7%]" },
  { width: "w-5", opacity: "bg-ring/[8%]" },
  { width: "w-6", opacity: "bg-ring/[9%]" },
  { width: "w-6", opacity: "bg-ring/[10%]" },
];

export default function BackgroundStripes() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev); 
    }, 20000); // Repeat every 20s
  
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-[160px] h-[46rem] flex items-center justify-between bg-none absolute z-0 top-[-4%] md:top-[-8%] right-[20%] md:right-[15%] rotate-[20deg] pointer-events-none">
      {stripes.map(({ width, opacity }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -1000 }}
          animate={
            isVisible
              ? { opacity: 1, x: 0 }
              : { opacity: 0, x: 500 } // ← smooth horizontal slide-out
          }
          transition={{
            duration: 1.2,
            delay: i * 0.1,
            ease: [0.4, 0.2, 0.2, 1],
          }}
          className={`${width} h-[140%] ${opacity}`}
        />
      ))}
    </div>
  );
}
