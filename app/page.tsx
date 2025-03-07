"use client";

import { useTheme } from "@/app/context/ThemeProvider";
import ThemedHeadshot from "@/components/ThemedHeadshot";
import WebMetricsSection from "@/components/WebMetricsSection";

export default function Home() {
  const { theme } = useTheme();

  if (!theme) return null;

  return (
    <div className="min-h-screen text-foreground bg-background transition-colors duration-500"> {/* bg-background */}
      <main>
        {/* Top Section */}
        <section id="top" className="flex flex-col items-center py-20 bg-gradient-to-r from-ring/60 to-background text-center scroll-mt-16">
          <div className="flex flex-col items-center w-full max-w-[calc(100%-40px)]">
            <h1 className="text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-foreground via-card-foreground to-foreground pb-1">Crafting Modern Web Experiences</h1>
            <p className="w-max-[75%] text-xl text-foreground/80 mb-8">
              Custom fast, accessible, and responsive websites that leave an impression.
            </p>
            <button
              onClick={() => document.getElementById("showcase")?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg shadow-lg hover:bg-ring transition-colors">
              View My Work
            </button>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 bg-background scroll-mt-16">
          <div className="max-w-[calc(100%-40px)] flex flex-col md:flex-row container items-center justify-center mx-auto text-start gap-12">
            {/* Themed Headshot Component */}
            <ThemedHeadshot />

            <div>
              <h2 className="text-3xl font-semibold mb-4">Hi, Nice To Meet You</h2>
              <p className="text-lg text-card-foreground max-w-3xl mx-auto mb-4">
                I’m Austin—a web developer based in Hudson, WI. I build modern, responsive websites that look great and function flawlessly across all devices.
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
        <section className="py-16 bg-gradient-to-r from-ring/60 to-background">
          <div className="max-w-[calc(100%-40px)] flex flex-col items-start justify-center container mx-auto text-center gap-8">
            <WebMetricsSection />
            
            <div className="w-full flex flex-col items-start shadow text-start px-6 py-3 bg-card rounded-lg gap-4">
              <h2 className="text-3xl font-semibold">Prioritizing Your Web Presence Matters</h2>
              <div className="flex flex-col items-start text-lg text-card-foreground gap-8">
                <p>
                  A well-designed website is more than just aesthetics—it’s about performance, accessibility, and a seamless user experience. In a world where attention spans are short, slow load times, poor navigation, or clashing colors can be the difference between gaining a customer or losing them to the ‘back’ button.
                </p>
                <p>
                  Beyond user experience, a strong web presence directly impacts search rankings. Many businesses, especially smaller ones, struggle with SEO because it’s complex, time-consuming, and often expensive. But neglecting it means missing out on potential customers who never find you in the first place.
                </p>
                <p>
                  If your site needs a refresh, an upgrade, or just a few strategic improvements, don’t waste time guessing—I can help you optimize your site to meet both user expectations and business goals. Let’s build something that works.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="flex items-center justify-center py-16 bg-background scroll-mt-16">
          <div className="max-w-[calc(100%-40px)] flex flex-col lg:flex-row container w-full items-center justify-between text-start">
            <div className="flex flex-col p-6 gap-4 w-full lg:w-3/5">
              <h2 className="text-5xl font-semibold text-secondary-foreground">Let&apos;s Chat!</h2>
              <p className="text-lg text-foreground mx-auto">
                My preferred method of communication for inquiries is email or text. However, If you have a project you&apos;d like to discuss you can call or message me at any of the following:
              </p>
            </div>
            <div className="block mx-auto">
              <ul className="w-[24rem] bg-card text-secondary-foreground p-2 border-2 border-border/45 rounded-lg">
                <li className="mb-2">
                  <a 
                    className="flex flex-row items-center justify-between gap-4 p-2 rounded-md hover:bg-card-foreground/5"
                    href="sms:9522884408"
                  >
                    <h3>Phone: </h3>
                    <p className="font-mono">(952)288-4408</p>
                  </a>
                </li>
                <li className="mb-2">
                  <a 
                    className="flex flex-row items-center justify-between gap-4 p-2 rounded-md hover:bg-card-foreground/5"
                    href="mailto:austin.t.mans@gmail.com" 
                    target="_blank"
                  >
                    <h3>Email: </h3>
                    <p className="font-mono">austin.t.mans@gmail.com</p>
                  </a>
                </li>
                <li>
                  <a 
                    className="flex flex-row items-center justify-between gap-4 p-2 rounded-md hover:bg-card-foreground/5"
                    href="https://www.linkedin.com/in/austin-mans/"
                    target="_blank"
                  >
                    <h3>LinkedIn: </h3>
                    <p className="font-mono">/austin-mans</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-2 bg-card text-center">
        <p className="max-w-[calc(100%-40px)] text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Austin Mans Portfolio. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
