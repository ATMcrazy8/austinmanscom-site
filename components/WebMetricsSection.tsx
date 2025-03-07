"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Rocket, Eye, Handshake } from "lucide-react";

const webMetrics = [
  { title: "Performance", description: "Fast-loading sites keep users engaged and improve SEO.", icon: Rocket },
  { title: "Accessibility", description: "Reach more users by ensuring everyone can access your content.", icon: Eye },
  { title: "Engagement", description: "Beautiful, intuitive design keeps users exploring your site longer.", icon: Handshake },
];

export default function WebMetricsSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 60%"],
  });

  return (
    <div ref={ref} className="flex flex-col md:flex-row w-full md:w-auto gap-8 justify-between overflow-hidden">
      {webMetrics.map(({ title, description, icon: Icon }, index) => {
        
        const delayFactor = index * 0.3; // Staggered based on index

        // Apply parallax effect
        const opacity = useTransform(scrollYProgress, [0 + delayFactor, 0.4 + delayFactor], [0, 1]); // Fade
        const y = useTransform(scrollYProgress, [0 + delayFactor, 0.4 + delayFactor], [150, 0]); // Slide

        return (
          <motion.div
            key={title}
            style={{ opacity, y }}
            className="p-6 bg-card rounded-lg shadow flex flex-col items-start justify-start text-start gap-2"
          >
            <div className="flex flex-row items-center text-start gap-4">
              <Icon className="w-5 h-5 text-primary" />
              <h3 className="text-xl text-secondary-foreground font-bold">{title}</h3>
            </div>
            <p className="text-card-foreground">{description}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
