"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import ThemedHeadshot from "@/components/ThemedHeadshot";
import AnimatedLogo from "../AnimatedLogo";

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-16 bg-monotone scroll-mt-16 overflow-hidden"
    >
      {/* Animated Logo */}
      <AnimatedLogo />
      
      {/* Actual content */}
      <div className="relative z-10 max-w-[calc(100%-40px)] flex flex-col md:flex-row container items-center justify-center mx-auto text-start gap-12">
        {/* Floating Headshot */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <ThemedHeadshot />
        </motion.div>

        {/* Text Section */}
        <div>
          <h2 className="text-3xl font-semibold mb-4">A Bit About Me</h2>
          <p className="text-lg text-card-foreground max-w-3xl mx-auto mb-4">
            Hello! I&apos;m Austin. I am a web developer based in Hudson, WI. I build modern, responsive websites that look great and function flawlessly across devices.
          </p>
          <p className="text-lg text-card-foreground max-w-3xl mx-auto mb-4">
            Whether you need a refresh, an upgrade, or a brand-new site, I can help. Let&apos;s create something that works for you.
          </p>
          <p className="w-auto text-lg text-card-foreground max-w-3xl mx-auto">
            If your website needs a lift,
            <a href="#contact" className="text-ring underline px-[4px] mx-[2px] rounded-sm">
              reach out
            </a>
            and let&apos;s get started.
          </p>
        </div>
      </div>
    </section>
  );
}
