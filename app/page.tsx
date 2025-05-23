"use client";

import { useTheme } from "@/app/context/ThemeProvider";
import { Phone, Mail, Linkedin } from "lucide-react";
import AboutSection from "@/components/sections/AboutSection";
import BackgroundStripes from "@/components/BackgroundStripes";
import WhyWebMatters from "@/components/sections/WhyWebMatters";
import RisingBlob from "@/components/AnimatedBlob";

export default function Home() {
  const { theme } = useTheme();

  const contactItems = [
    {
      label: "Phone",
      href: "sms:9522884408",
      value: "(952) 288-4408",
      icon: Phone,
    },
    {
      label: "Email",
      href: "mailto:austin.t.mans@gmail.com",
      value: "austin.t.mans@gmail.com",
      icon: Mail,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/austin-mans/",
      value: "/austin-mans",
      icon: Linkedin,
    },
  ];

  if (!theme) return null;

  return (
    <main className="min-h-screen text-foreground bg-background transition-colors duration-500">
      {/* Top Section */}
      <section
        id="top"
        className="h-[38rem] flex flex-col items-center justify-center py-20 bg-gradient-to-r backdrop-blur-xl from-primary/30 to-monotone to-60% md:to-75% text-center scroll-mt-16 overflow-hidden relative"
      >
        <BackgroundStripes />

        <div className="flex flex-col items-center w-full max-w-[calc(100%-40px)] z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-foreground via-secondary-foreground to-foreground pb-2 text-balance not-prose leading-tight">
            Modern Web Development &amp; Design
          </h1>
          <i className="max-w-[99.24%] sm:max-w-[88.5%] text-balance text-xs md:text-base text-foreground/80 mb-8 not-prose">
            Web development services for fast, accessible, and
            SEO-friendly websites.
          </i>
          {/* <button
            onClick={() => document.getElementById("showcase")?.scrollIntoView({ behavior: "smooth" })}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg shadow-lg hover:bg-ring transition-colors">
            View My Work
          </button> */}
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Why Web Matters Section */}
      <WhyWebMatters />

      {/* Contact Section */}
      <section
        id="contact"
        className="flex items-center justify-center min-h-[50vh] bg-monotone scroll-mt-16 relative overflow-hidden"
      >
        {/* Animated Background Blob */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <RisingBlob />
        </div>

        {/* CTA Content */}
        <div className="relative z-10 w-[calc(100%-40px)] max-w-[1520px] py-12 flex flex-col items-center gap-10">
          <div className="text-center max-w-[28rem]">
            <h2 className="text-3xl md:text-5xl font-semibold text-foreground">
              Still Here?
            </h2>
            <p className="text-sm md:text-lg text-card-foreground mt-2">
              Let&apos;s Chat. Email or text are usually best, but I can be reached at any of the following:
            </p>
          </div>

          <ul className="w-full max-w-[28rem] space-y-4">
            {contactItems.map(({ label, href, value, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  className="flex items-center gap-4 p-4 bg-accent-foreground rounded-xl hover:bg-accent-foreground/90 hover:shadow-accent/20 hover:shadow-md hover:scale-[1.02] transition-all duration-300"
                >
                  <Icon className="w-5 h-5 shrink-0 stroke-accent" />
                  <div className="flex flex-col">
                    <span className="text-xs text-accent">{label}</span>
                    <span className="text-primary-foreground text-md font-semibold">{value}</span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
