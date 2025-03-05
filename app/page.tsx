"use client";

import { useTheme } from "@/app/context/ThemeProvider";
import ThemedHeadshot from "@/components/ThemedHeadshot";

const themes = ["mint", "ocean", "meadow", "lava", "space"];

export default function Home() {
  const { theme, setTheme, isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <main>
        {/* Top Section */}
        <section id="top" className="py-20 bg-background text-center scroll-mt-16">
          <div className="container mx-auto">
            <h1 className="text-5xl font-bold mb-6">Crafting Modern Web Experiences</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Building fast, accessible, and responsive websites that leave an impression.
            </p>
            <button
              onClick={() => document.getElementById("showcase")?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg shadow-lg hover:bg-secondary transition-colors">
              View My Work
            </button>
          </div>
        </section>

        {/* Why Web Matters Section */}
        <section className="py-16 bg-card">
          <div className="flex flex-col md:flex-row items-center justify-center container mx-auto text-center gap-8">
            <div className="flex flex-col items-start text-start p-4 bg-secondary rounded-lg">
              <h2 className="text-3xl font-semibold mb-4">Prioritize Your Web Presence</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                A well-designed and developed website isn't just about aesthetics—it's about user experience, accessibility, and performance. It helps you stand out, engage users, and convert visitors into customers.
              </p>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                Users will feel a reaction from visiting your site. Some sites don't have intuitive navigation, some sites have colors that clash unpleasantly, some sites have long load times. With the ever-shortening attention span of today's average web user, any one of these things could be the difference between a lifelong client and a quick hit of the 'back' button.
              </p>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                A great web presence sets companies apart from one another, not only in the eyes of users, but also with search engines like Google and Bing. Prioritizing your Search Engine Optimization (SEO) is paramount to converting new viewers into first-time customers. Companies, especially smaller ones, tend to neglect this because its either too confusing or requires too much time and money to properly address.
              </p>
            </div>

            <div className="flex flex-col w-full md:w-auto gap-8 justify-between">
              {["1. Performance", "2. Accessibility", "3. Engagement"].map((feature) => (
                <div key={feature} className="p-6 bg-secondary rounded-lg shadow text-start md:text-center">
                  <h3 className="text-xl text-secondary-foreground font-bold mb-2">{feature}</h3>
                  <p className="text-card-foreground">
                    {feature === "1. Performance"
                      ? "Fast-loading sites keep users engaged and improve SEO."
                      : feature === "2. Accessibility"
                      ? "Reach more users by ensuring everyone can access your content."
                      : "Beautiful, intuitive design keeps users exploring your site longer."}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 bg-card scroll-mt-16">
          <div className="flex flex-row container items-center justify-center mx-auto text-start gap-12">
            {/* Themed Headshot Component */}
            <ThemedHeadshot />

            <div>
              <h2 className="text-3xl font-semibold mb-4">So, Who Am I?</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-4">
                My name is Austin, I'm a passionate web developer based in Hudson, WI.
                I specialize in crafting modern, responsive websites that not only
                look great but also perform seamlessly across platforms.
              </p>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-4">
                Whether you need a refresh, an upgrade, or a brand-new site, I’d love
                to chat. 
                <button 
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-ring underline px-[4px] mx-[2px] rounded-sm"
                >
                  Reach out
                </button>
                and let's get the ball rolling!
              </p>
            </div>
          </div>
        </section>

        {/* Theme Picker Section */}
        <section id="showcase" className="py-16 scroll-mt-16">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-6">Customize Your Experience</h2>
            <div className="flex flex-col items-center gap-4">
              {/* Theme Selector */}
              <div className="flex gap-4">
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
        <section id="contact" className="py-16 bg-card scroll-mt-16">
          <div className="flex flex-col w-full items-center mx-auto text-start">
            <h2 className="text-3xl font-semibold mb-4">So, Who Am I?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-4">
              My name is Austin, I'm a passionate web developer based in Hudson, WI. I specialize in crafting modern, responsive websites that not only look great but also perform seamlessly across platforms.
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-4">
              Whether you need a refresh, an upgrade, or a brand-new site, I’d love to chat. 
              <button 
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="text-link underline px-[4px] mx-[2px] rounded-sm"
              >
                Reach out
              </button>
              and let's get the ball rolling!
            </p>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-4 bg-card text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Austin Mans Portfolio. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
