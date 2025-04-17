"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import WebMetricsSection from "./WebMetricsSection";

export default function WhyWebMatters() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section className="flex items-center justify-center py-16 min-h-[100vh] backdrop-blur-xl bg-gradient-to-r from-ring/60 via-ring/40 via-20% to-ring/10">
      <div className="w-[calc(100%-40px)] max-w-[1520px] flex flex-col items-center justify-center mx-auto text-center gap-8">
        
        <WebMetricsSection />
        
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full flex flex-col items-start p-6 bg-card rounded-lg gap-4 shadow-lg overflow-hidden text-start"
        >
          {/* Spotlight Layer */}
          <motion.div
            className="absolute pointer-events-none z-0"
            style={{
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: `radial-gradient(200px circle at ${coords.x}px ${coords.y}px, hsl(var(--primary) / 10%), transparent 70%)`,
            }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          {/* Content Layer */}
          <div className="relative z-10 flex flex-col gap-4">
            <h2 className="text-3xl text-monotone-foreground font-semibold">
              Prioritizing Your Web Presence:{" "}
              <i className="text-card-foreground">Why It Matters</i>
            </h2>

            <p className="text-base text-card-foreground">
              A well-designed website is more than just <b>visual appeal</b> —
              it's the foundation of your <b>brand's online success</b>.
              Performance, accessibility, and user experience{" "}
              <b>directly influence customer retention and SEO rankings</b>.
            </p>

            {[
              {
                heading: "Site Speed & Performance",
                body:
                  "Users expect pages to load in under 3 seconds. Any delay leads to lost conversions and a lower ranking in Google's search results.",
              },
              {
                heading: "SEO & Discoverability",
                body:
                  "A strong web presence ensures search engines rank your site higher, bringing in new customers. Without proper SEO, your business risks being invisible online.",
              },
              {
                heading: "User Experience & Retention",
                body:
                  "A poorly designed site—confusing navigation, slow load times, or clashing colors—can push visitors away in seconds. Good design builds trust and drives engagement.",
              },
              {
                heading: "Smart Web Strategies for Growth",
                body:
                  "Whether your site needs a redesign, optimization, or small tweaks, I help businesses build high-performance websites that stand out, rank higher, and drive results.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.heading}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.2 + i * 0.2 }}
                className="space-y-1"
              >
                <h3 className="text-lg font-medium text-foreground">
                  {item.heading}
                </h3>
                <p className="text-sm text-muted-foreground">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
