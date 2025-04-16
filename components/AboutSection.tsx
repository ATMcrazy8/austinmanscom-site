"use client";

import { motion } from "framer-motion";
import ThemedHeadshot from "@/components/ThemedHeadshot";

export default function AboutSection() {
  return (
    <section id="about" className="relative py-16 bg-monotone scroll-mt-16 overflow-visible">
      {/* Decorative Blob Background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="pointer-events-none absolute top-[-150px] left-[-150px] w-[500px] h-[500px] bg-ring blur-3xl rounded-full -z-10"
      />

      <div className="max-w-[calc(100%-40px)] flex flex-col md:flex-row container items-center justify-center mx-auto text-start gap-12">
        {/* Floating Themed Headshot */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <ThemedHeadshot />
        </motion.div>

        {/* Staggered Text Content */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="flex flex-col"
        >
          <motion.h2
            className="text-3xl font-semibold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            A Bit About Me
          </motion.h2>

          {[
            "Hello! I’m Austin. I am a web developer based in Hudson, WI. I build modern, responsive websites that look great and function flawlessly across devices.",
            "Whether you need a refresh, an upgrade, or a brand-new site, I can help. Let’s create something that works for you.",
            "If your website needs a lift, reach out and let’s get started.",
          ].map((text, idx) => (
            <motion.p
              key={idx}
              className="text-lg text-card-foreground max-w-3xl mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + idx * 0.2 }}
            >
              {text.includes("reach out") ? (
                <>
                  If your website needs a lift,
                  <a
                    href="#contact"
                    className="text-ring underline px-[4px] mx-[2px] rounded-sm"
                  >
                    reach out
                  </a>
                  and let’s get started.
                </>
              ) : (
                text
              )}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
