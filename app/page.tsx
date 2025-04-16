"use client";

import { useTheme } from "@/app/context/ThemeProvider";
import AboutSection from "@/components/AboutSection";
import BackgroundStripes from "@/components/BackgroundStripes";
import WebMetricsSection from "@/components/WebMetricsSection";

export default function Home() {
  const { theme } = useTheme();

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
          <h1 className="text-3xl md:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-monotone-foreground via-card-foreground to-monotone-foreground pb-1 text-balance">
            Modern Web Development &amp; Design
          </h1>
          <i className="max-w-[99.24%] sm:max-w-[88.5%] text-balance text-xs md:text-base text-foreground/80 mb-8">
            Custom web development services for fast, accessible, and
            SEO-friendly websites that drive engagement.
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
      <section className="flex items-center justify-center py-16 min-h-[100vh] backdrop-blur-xl bg-gradient-to-r from-ring/60 via-ring/40 via-20% to-ring/10">
        <div className="w-[calc(100%-40px)] max-w-[1520px] flex flex-col items-center justify-center mx-auto text-center gap-8">
          <WebMetricsSection />

          <div className="w-full flex flex-col items-start shadow text-start p-6 bg-card rounded-lg gap-2">
            <h2 className="text-3xl text-monotone-foreground font-semibold">
              Prioritizing Your Web Presence:{" "}
              <i className="text-card-foreground">Why It Matters</i>
            </h2>
            <div className="flex flex-col items-start text-base/[1.4rem] text-card-foreground gap-8">
              <p>
                A well-designed website is more than just <b>visual appeal</b>
                —it&apos;s the foundation of your{" "}
                <b>brand&apos;s online success</b>. Performance, accessibility,
                and user experience{" "}
                <b>directly influence customer retention and SEO rankings</b>.
              </p>
              <div>
                <h3 className="text-lg font-medium text-foreground">
                  Site Speed &amp; Performance:
                </h3>
                <p className="text-sm text-muted-foreground">
                  Users expect pages to load in <b>under 3 seconds</b>. Any
                  delay leads to lost conversions and a lower ranking in
                  Google&apos;s search results.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground">
                  SEO &amp; Discoverability:
                </h3>
                <p className="text-sm text-muted-foreground">
                  A strong web presence ensures{" "}
                  <b>search engines rank your site higher</b>, bringing in new
                  customers. Without <b>proper SEO</b>, your business risks
                  being invisible online.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground">
                  User Experience &amp; Retention:
                </h3>
                <p className="text-sm text-muted-foreground">
                  A poorly designed site—confusing navigation, slow load times,
                  or clashing colors—can push visitors away in <b>seconds</b>.
                  Good design naturally encourages engagement, trust, and
                  conversions.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground">
                  Smart Web Strategies for Growth:
                </h3>
                <p className="text-sm text-muted-foreground">
                  Whether your site needs a{" "}
                  <b>redesign, optimization, or small tweaks</b>, I help
                  businesses build high-performance websites that{" "}
                  <b>stand out, rank higher, and drive results</b>.
                </p>
              </div>

              <b>Let&apos;s build a site that works for you!</b>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="flex items-center justify-center min-h-[50vh] bg-monotone scroll-mt-16"
      >
        <div className="w-[calc(100%-40px)] max-w-[1520px] py-12 flex flex-col items-center justify-between text-start gap-10">
          <div className="flex flex-col items-center text-center gap-4 text-pretty max-w-[28rem]">
            <h2 className="text-3xl md:text-5xl font-semibold text-foreground">
              Still Here?
            </h2>
            <p className="text-sm md:text-lg text-card-foreground mx-auto">
              Let&apos;s Chat. Email or text are usually best, but I can be
              reached at any of the following:
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
                  <p className="w-48 text-end  ml-auto mr-0">
                    austin.t.mans@gmail.com
                  </p>
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
  );
}
