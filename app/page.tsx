"use client";

import { useTheme } from "@/app/context/ThemeProvider";
import ThemedHeadshot from "@/components/ThemedHeadshot";
import WebMetricsSection from "@/components/WebMetricsSection";

const themes = ["mint", "ocean", "meadow", "lava", "space"];

export default function Home() {
  const { theme, setTheme, isDarkMode, toggleDarkMode } = useTheme();

  if (!theme) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-ring to-background text-foreground transition-colors duration-500"> {/* bg-background */}
      <main>
        {/* Top Section */}
        <section id="top" className="flex flex-col items-center py-20 bg-background text-center scroll-mt-16">
          <div className="flex flex-col items-center w-full max-w-[calc(100%-40px)]">
            <h1 className="text-5xl font-bold mb-6 ">Crafting <span className="text-transparent bg-clip-text bg-gradient-to-br from-foreground via-primary to-foreground to-90%">Modern</span> Web Experiences</h1>
            <p className="w-max-[75%] text-xl text-muted-foreground mb-8">
              Building fast, accessible, and responsive websites that leave an impression.
            </p>
            <button
              onClick={() => document.getElementById("showcase")?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg shadow-lg hover:bg-ring transition-colors">
              View My Work
            </button>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 bg-card scroll-mt-16">
          <div className="max-w-[calc(100%-40px)] flex flex-col md:flex-row container items-center justify-center mx-auto text-start gap-12">
            {/* Themed Headshot Component */}
            <ThemedHeadshot />

            <div>
              <h2 className="text-3xl font-semibold mb-4">So, Who <i>Are</i> You?</h2>
              <p className="text-lg text-card-foreground max-w-3xl mx-auto mb-4">
                Hi, I’m Austin—a web developer based in Hudson, WI. I build modern, responsive websites that look great and function flawlessly across all devices.
              </p>
              <p className="text-lg text-card-foreground max-w-3xl mx-auto mb-4">
                Whether you need a refresh, an upgrade, or a brand-new site, I can help. Let’s create something that works for you.
              </p>
              <p className="w-auto text-lg text-card-foreground max-w-3xl mx-auto">
                If your site needs a lift,
                <a
                  href="#contact"
                  className="text-ring underline px-[4px] mx-[2px] rounded-sm"
                >
                  reach out
                </a>
                and let's get started.
              </p>
            </div>
          </div>
        </section>


        {/* Why Web Matters Section */}
        <section className="py-16 bg-background">
          <div className="max-w-[calc(100%-40px)] flex flex-col items-start justify-center container mx-auto text-center gap-8">
            <WebMetricsSection />
            
            <div className="w-full flex flex-col items-start shadow text-start px-6 py-3 bg-secondary rounded-lg gap-4">
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

        {/* Theme Picker Section */}
        <section id="showcase" className="py-16 scroll-mt-16">
          <div className="container mx-auto text-center max-w-[calc(100%-40px)]">
            <h2 className="text-3xl font-semibold mb-6">Customize Your Experience</h2>
            <div className="flex flex-col items-center gap-4">
              {/* Theme Selector */}
              <div className="flex gap-4 flex-wrap items-center justify-center">
                {themes.map((themeName) => (
                  <button
                    key={themeName}
                    onClick={() => setTheme(themeName)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      theme === themeName
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                  </button>
                ))}
              </div>

              {/* Light/Dark Mode Switch */}
              <div className="flex items-center gap-2">
                <span>Light</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isDarkMode}
                    onChange={toggleDarkMode}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-muted rounded-full peer-focus:ring-4 peer-focus:ring-ring dark:bg-muted-foreground peer-checked:bg-primary"></div>
                  <span className="absolute left-1 top-1 w-4 h-4 bg-background rounded-full transition-transform peer-checked:translate-x-5"></span>
                </label>
                <span>Dark</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="flex items-center justify-center py-16 bg-card scroll-mt-16">
          <div className="max-w-[calc(100%-40px)] flex flex-col md:flex-row container w-full items-center justify-between text-start">
            <div className="flex flex-col p-6 gap-4">
              <h2 className="text-3xl font-semibold">Let's Chat</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                My preferred method of communication for inquiries is email or text. However, If you have a project you'd like to discuss you can reach me at any of the following:
              </p>
            </div>
            <ul className="w-[300px] bg-gradient-to-br from-secondary-foreground to-ring text-card text-[12px] p-4 rounded-lg">
              <li className="mb-2">
                <a 
                  className="flex flex-row items-center justify-between gap-4 p-2 rounded-md hover:bg-card/20"
                  href="sms:9522884408"
                >
                  <h3>Phone: </h3>
                  <p className="font-mono">(952)288-4408</p>
                </a>
              </li>
              <li className="mb-2">
                <a 
                  className="flex flex-row items-center justify-between gap-4 p-2 rounded-md hover:bg-card/20"
                  href="mailto:austin.t.mans@gmail.com" 
                  target="_blank"
                >
                  <h3>Email: </h3>
                  <p className="font-mono">austin.t.mans@gmail.com</p>
                </a>
              </li>
              <li>
                <a 
                  className="flex flex-row items-center justify-between gap-4 p-2 rounded-md hover:bg-card/20"
                  href="https://www.linkedin.com/in/austin-mans/"
                  target="_blank"
                >
                  <h3>LinkedIn: </h3>
                  <p className="font-mono">/austin-mans</p>
                </a>
              </li>
            </ul>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-4 bg-card text-center">
        <p className="max-w-[calc(100%-40px)] text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Austin Mans Portfolio. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
