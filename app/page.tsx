"use client";

import { useTheme } from "@/app/context/ThemeProvider";
import ThemedHeadshot from "@/components/ThemedHeadshot";
import { motion } from "framer-motion"; 
import WebMetricsSection from "@/components/WebMetricsSection";

export default function Home() {
  const { theme } = useTheme();

  if (!theme) return null;

  return (
    <div className="min-h-screen text-foreground bg-background transition-colors duration-500"> {/* bg-background */}
      <main>
        {/* Top Section */}
        <section id="top" className="h-[40rem] flex flex-col items-center justify-center py-20 bg-gradient-to-r backdrop-blur-xl from-primary/30 to-monotone to-60% md:to-75% text-center scroll-mt-16 overflow-hidden relative">

          {/* Stripe Gradients */}
          <div className="w-[160px] h-[150vh] flex items-center justify-between bg-none absolute z-0 top-[-5vh] md:top-[-10vh] right-[20%] md:right-[15%] rotate-[20deg]">
            <motion.div
              initial={{ opacity: 0, x: -1000, rotate: -180 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.2, 0.9, 0.5, 1.03]}}
              className="w-2 h-full bg-ring/[2%]"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, x: -1000, rotate: -165 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.15, ease: [0.25, 0.9, 0.45, 1.03]}}
              className="w-2 h-full bg-ring/[4%]"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, x: -1000, rotate: -150 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.3, 0.7, 0.4, 1.03]}}
              className="w-3 h-full bg-ring/[6%]"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, x: -1000, rotate: -135 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.25, ease: [0.35, 0.7, 0.35, 1.1]}}
              className="w-3 h-full bg-ring/[8%]"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, x: -1000, rotate: -120 }}
              animate={{ opacity: 1, x: 0, rotate: 0}}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.4, 0.5, 0.3, 1.1]}}
              className="w-4 h-full bg-ring/[10%]"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, x: -1000, rotate: -105 }}
              animate={{ opacity: 1, x: 0, rotate: 0}}
              transition={{ duration: 1.2, delay: 0.35, ease: [0.45, 0.5, 0.25, 1.1]}}
              className="w-4 h-full bg-ring/[12%]"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, x: -1000, rotate: -90 }}
              animate={{ opacity: 1, x: 0, rotate: 0}}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.5, 0.3, 0.2, 1.1]}}
              className="w-5 h-full bg-ring/[14%]"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, x: -1000, rotate: -75 }}
              animate={{ opacity: 1, x: 0, rotate: 0}}
              transition={{ duration: 1.2, delay: 0.45, ease: [0.55, 0.3, 0.15, 1.1]}}
              className="w-5 h-full bg-ring/[16%]"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, x: -1000, rotate: -60 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.6, 0.1, 0.1, 1.1]}}
              className="w-6 h-full bg-ring/[18%]"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, x: -1000, rotate: -45 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.55, ease: [0.65, 0.1, 0.05, 1.1]}}
              className="w-6 h-full bg-ring/[20%]"
            ></motion.div>
          </div>

          <div className="flex flex-col items-center w-full max-w-[calc(100%-40px)] z-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-monotone-foreground via-card-foreground to-monotone-foreground pb-1 text-balance">
              Crafting Modern Web Experiences
            </h1>
            <p className="max-w-[99.24%] sm:max-w-[88.5%] text-balance text-sm md:text-xl text-foreground/80 mb-8">
              Custom fast, accessible, and responsive websites that leave an impression.
            </p>
            {/* <button
              onClick={() => document.getElementById("showcase")?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg shadow-lg hover:bg-ring transition-colors">
              View My Work
            </button> */}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 bg-monotone scroll-mt-16">
          <div className="max-w-[calc(100%-40px)] flex flex-col md:flex-row container items-center justify-center mx-auto text-start gap-12">
            {/* Themed Headshot Component */}
            <ThemedHeadshot />

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
                <a
                  href="#contact"
                  className="text-ring underline px-[4px] mx-[2px] rounded-sm"
                >
                  reach out
                </a>
                and let&apos;s get started.
              </p>
            </div>
          </div>
        </section>


        {/* Why Web Matters Section */}
        <section className="flex items-center justify-center py-16 min-h-[100vh] backdrop-blur-xl bg-gradient-to-r from-ring/60 via-ring/40 via-20% to-ring/10">
          <div className="w-[calc(100%-40px)] max-w-[1520px] flex flex-col items-center justify-center mx-auto text-center gap-8">
            <WebMetricsSection />
            
            <div className="w-full flex flex-col items-start shadow text-start p-6 bg-card rounded-lg gap-4">
              <h2 className="text-3xl text-monotone-foreground/85 font-semibold">Prioritizing Your Web Presence Matters</h2>
              <div className="flex flex-col items-start text-base/[1.4rem] text-card-foreground gap-8">
                <p>
                  A well-designed website is more than just aesthetics—it&apos;s about performance, accessibility, and a seamless user experience. In a world where attention spans are short, slow load times, poor navigation, or clashing colors can be the difference between gaining a customer or losing them to the &apos;back&apos; button.
                </p>
                <p>
                  Beyond user experience, a strong web presence directly impacts search rankings. Many businesses, especially smaller ones, struggle with SEO because it&apos;s complex, time-consuming, and often expensive. But neglecting it means missing out on potential customers who never find you in the first place.
                </p>
                <p>
                  If your site needs a refresh, an upgrade, or just a few strategic improvements, don&apos;t waste time guessing—I can help you optimize your site to meet both user expectations and business goals. Let&apos;s build something that works.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="flex items-center justify-center min-h-[50vh] bg-monotone scroll-mt-16">
          <div className="w-[calc(100%-40px)] max-w-[1520px] flex flex-col items-center justify-between text-start gap-10">
            <div className="flex flex-col items-center text-center gap-4 text-pretty max-w-[28rem]">
              <h2 className="text-3xl md:text-5xl font-semibold text-foreground">Let&apos;s Talk!</h2>
              <p className="text-sm md:text-lg text-card-foreground mx-auto">
                Email or text are usually best, but I can be reached at any of the following:
              </p>
            </div>
            <div className="block w-full max-w-[28rem] mx-auto">
              <ul className="w-full bg-primary/80 text-sm md:text-base text-primary-foreground p-2 shadow rounded-lg">
                <li className="mb-2">
                  <a 
                    className="flex flex-row flex-wrap items-center justify-between gap-4 p-2 rounded-md hover:bg-card-foreground/10"
                    href="sms:9522884408"
                  >
                    <h3 className="w-16">Phone: </h3>
                    <p className="w-48 text-end ml-auto mr-0">(952)288-4408</p>
                  </a>
                </li>
                <li className="mb-2">
                  <a 
                    className="flex flex-row flex-wrap items-center justify-between gap-4 p-2 rounded-md hover:bg-card-foreground/10"
                    href="mailto:austin.t.mans@gmail.com" 
                    target="_blank"
                  >
                    <h3 className="w-16">Email: </h3>
                    <p className="w-48 text-end  ml-auto mr-0">austin.t.mans@gmail.com</p>
                  </a>
                </li>
                <li>
                  <a 
                    className="flex flex-row flex-wrap items-center justify-between gap-4 p-2 rounded-md hover:bg-card-foreground/10"
                    href="https://www.linkedin.com/in/austin-mans/"
                    target="_blank"
                  >
                    <h3 className="w-16">LinkedIn: </h3>
                    <p className="w-48 text-end  ml-auto mr-0">/austin-mans</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full p-2 flex items-center justify-center bg-card text-center">
        <p className="max-w-[calc(100%-40px)] text-[8px] md:text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Austin Mans Portfolio. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
