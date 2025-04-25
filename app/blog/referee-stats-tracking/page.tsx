import { Metadata } from "next";
import { BlogPostLayout } from "@/components/blog/BlogPostLayout";
import LighthouseGauge from "@/components/LighthouseGauge";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Building a Referee Performance Analytics Platform",
  description: "How I built a data-driven platform to analyze and visualize referee performance metrics in professional hockey.",
  openGraph: {
    title: "Building a Referee Performance Analytics Platform",
    description: "How I built a data-driven platform to analyze and visualize referee performance metrics in professional hockey.",
    type: "article",
    publishedTime: "2024-04-20",
    tags: ["Web Development", "Projects", "Data Analysis", "Data Visualization"],
  },
};

export default function RefereeStatsPost() {
  return (
    <BlogPostLayout
      title="Building a Referee Performance Analytics Platform"
      date="2024-04-20"
      tags={["Web Development", "Projects", "Data Analysis", "Data Visualization"]}
    >
      <h2 className="text-4xl font-medium mb-8">From Game Data to Fairness Metrics: Comparatively Analyzing NHL Officiating</h2>
      
      <p className="text-xl mb-8">
        As a hockey fan, I've always been fascinated by the patterns and trends in the NHL. One point that gets a lot of attention is the impact referees have on the game. But I noticed something odd. The conversation is almost always purely discourse and subjective, rarely do comments include things like referee historical data, or trends between referees.
      </p>
      <p className="text-xl mb-8">
        While this project began as a simple idea to track basic stats, it eventually evolved into a comprehensive platform that transforms real game data from the NHL season into meaningful insights about the performance of the officials.
      </p>
      <Link href="/referee-stats" className="text-xl mb-8">
        View the full referee stat tracker
      </Link>


      <Image 
        src="/blog-assets/ref-stats/ref_stat_heading.webp"
        alt="Referee Stats Tracking"
        width={800}
        height={400}
        className="rounded-xl border border-border"
      />

      <section className="mb-12">
        <h3 className="text-2xl font-medium mb-4">Ideation</h3>
        <p className="mb-4">
          So back in about 2014, I had little to no interest in hockey—or watching pro sports in general for that matter. I was in school at UW Eau Claire and made friends with some guys down the hall from me who were from a small town in Wisconsin. I would occasionally find myself in their dorm and they would have hockey on. The Minnesota Wild were a spunky team that had some newfound hope, and they had a young core that started to make an impact and the team made the Stanley Cup Playoffs. I had no idea what to expect from a playoff game, or a playoff series, but as round 1 wore on, I couldn't pull myself away from the games.
        </p>
        <p className="mb-4">
          The Wild found themselves in game 7 of the first round against the Colorado Avalanche and my buddies and I were in the on-campus cafeteria. It was a back and forth affair that the Wild couldn't seem to find themselves on top of.The third period was winding down and the Wild were down 4-3. With 2:27 left in the game, Jared Spurgeon scored the tying goal, sniping it over the shoulder of Varlamov. Overtime. Heatley over to Neiderreiter. PING. Nino sealed the comeback, and the Wild pulled off an incredible upset against the top-seeded Avalanche.
        </p>
        <p className="mb-4">
          So, yeah. I was hooked. I started watching more and more games, and began learning the rules. As I became more familiar with the 'how's and 'why's something odd stuck out to me. Refs have a lot of sway in how games unfold. Some games, especially playoff games, the refs are completely swallowing their whistles. Others, they try to control the teams' emotions by calling more penalties than usual and punishing unwanted behavior. They can even be part of plays—That is, if they officials interfere with a play, it is treated the same as hitting a stantion or the back of the net—just another part of the arena.
        </p>
        <p className="mb-4">
          I don't like to blame refs for the outcome of a game, but they are human and can have a huge impact, and I wanted to see if I could find any trends to better predict how a game might flow before it even begins. And so, I started this project.
        </p>
      </section>

      <section className="mb-12">
        <h3 className="text-2xl font-medium mb-4">The Challenge</h3>
        <p className="mb-4">
          So for those of you that don't know, the NHL has 82-game seasons and 32 teams. This means there are 1,312 games in a season—up to 16 games in a single day—and each with a different set of officials. That is way too much data for me to track on my own. Luckily, I found a great dataset that was already compiled and ready to go over at <a href="https://scoutingtherefs.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">Scouting The Refs</a>. This meant I could focus on the fun part: presenting the data.
        </p>
        <p className="mb-4">
          Processing and analyzing referee performance data incurred several unique challenges:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Converting raw game statistics into meaningful metrics</li>
          <li>Creating fair and unbiased performance evaluations (as best I can)</li>
          <li>Presenting complex data in an accessible format</li>
          <li>Ensuring consistent updates without performance degradation</li>
        </ul>
      </section>

      <section className="mb-12">
        <h3 className="text-2xl font-medium mb-4">Technical Implementation</h3>
        <p className="mb-4">Built with Next.js and TypeScript, the platform features:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Dynamic Route Generation</strong>: Each referee has a dedicated page with a clean, URL-friendly slug (This same system is used for the blog posts)</li>
          <li><strong>Daily Data Processing</strong>: Updates every 24 hours as new games are added by scraping data from an outside source as mentioned above</li>
          <li><strong>Freindly Design</strong>: Digestible information, stat breakdowns, theme compatibility, and a seamless experience across all devices</li>
        </ul>

        <div className="mt-8">
          <h3 className="text-2xl font-medium mb-4">Key Features</h3>
          
          <div className="flex flex-col-reverse items-center sm:flex-row gap-4">
            <div>
              <Image 
                src="/blog-assets/ref-stats/performance_chart.webp"
                alt="Referee Stats Tracking"
                width={300}
                height={300}
                className="rounded-xl border border-border"
              />
            </div>
            <div className="flex flex-col gap-1 w-full sm:w-auto">
              <h5 className="text-lg font-medium">1. Data Visualization</h5>
              <ul className="list-disc pl-6 text-sm">
                <li>Interactive performance trend graphing using recharts' radar chart</li>
                <li>Individual referee metrics overlayed on the league average values for comparison</li>
                <li>Tooltips to show actual values in numerical format</li>
                <li>Responsive design and appealing color contrast for optimal viewing on all devices</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center sm:flex-row gap-4 mt-8">
            <div className="flex flex-col gap-1 w-full sm:w-auto">
              <h5 className="text-lg font-medium">2. Fairness Scoring System</h5>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>Analyzes penalty distribution, game flow, and consistency metrics</li>
                <li>Weighted values and standard deviations for unbiased analysis</li>
                <li>Comprehensive performance grading with color-coded ranges</li>
                <li>Statistical normalization to ensure fair comparisons across officials</li>
              </ul>
            </div>
            <div>
              <Image 
                src="/blog-assets/ref-stats/fairness_grade.webp"
                alt="Fairness Scoring System"
                width={300}
                height={300}
                className="rounded-xl border border-border"
              />
            </div>
          </div>

          <div className="flex flex-col-reverse items-center sm:flex-row gap-4 mt-8">
            <LighthouseGauge />
            <div className="flex flex-col gap-1 w-full sm:w-auto">
              <h5 className="text-lg font-medium">3. Performance Optimization</h5>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>Server-side rendering for fast initial page loads</li>
                <li>Efficient data caching strategies</li>
                <li>Optimized image handling and delivery</li>
                <li>Minimal client-side JavaScript for better performance</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      <section className="mb-12">
        <h3 className="text-2xl font-medium mb-4">Technical Challenges</h3>
        
        <div className="flex flex-col sm:flex-row justify-start gap-0 sm:gap-4 mb-6">
          <div>
            <h4 className="text-xl font-medium mb-2">1. Data Processing</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>Normalizing inconsistent data formats</li>
              <li>Creating a unified analysis model</li>
              <li>Implementing robust error handling</li>
              <li>Maintaining data consistency</li>
              <li>Optimizing performance</li>
              <li>Typescript type safety</li>
            </ul>
          </div>

          <div className="w-auto sm:mx-auto">
            <h4 className="text-xl font-medium mb-2">2. User Experience</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>Easy to understand metrics</li>
              <li>Intuitive interactions</li>
              <li>Responsive design</li>
              <li>Accessibility compliance</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h3 className="text-2xl font-medium mb-4">Lessons Learned</h3>
        <p className="mb-4">I chose a project like this intentionally, partially because I have a genuine interest and some background knowledge about the NHL and hockey, and partially because I wanted to challenge myself to learn new things. This project taught me many valuable lessons.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Working with real-world data:</strong>
            <br />
            I had to figure out how to scrape stats from an external source, clean it up, shape it into something usable, and store it in a way that was both efficient and easy to work with inside the app.
          </li>
          <li>
            <strong>Visualizing data that actually means something:</strong>
            <br />
            I dove into libraries like Recharts and shadcn/ui to build a dual-layer radar chart that could clearly compare a ref’s numbers to the league average. One tricky bit was making the visual style consistent across themes — blending dynamic user-set colors with a fixed one for the league average wasn’t exactly plug-and-play. Took some trial and error, but I’m happy with where it landed.
          </li>
          <li>
            <strong>Keeping things fast, even with a lot of data:</strong>
            <br />
            When you’re working with large datasets, performance matters. While this isn't the most data intensive project when compared to enterprise level applications, I quickly learned that I'd need to strike a balance between client-side calculations and server-side rendering and caching strategies to keep load times quick and keep the project up to date and accurate. I also leverage some GitHub Actions to automate the process of scraping the data and updating the project.
          </li>
          <li>
            <strong>Making complexity feel simple:</strong>
            <br />
            There’s a lot going on under the hood, but the goal was always to make the experience feel effortless for users. I kept refining little details — like adding tooltips, sort/filter controls, and a single “fairness score” that rolls multiple advanced stats into one digestible grade — so the whole thing feels intuitive without watering down the data.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h3 className="text-2xl font-medium mb-4">Professional Impact</h3>
        <p className="mb-4">This project showcases my ability to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Solve complex problems with elegant solutions</li>
          <li>Handle large datasets and dynamic data processing</li>
          <li>Create intuitive interfaces for complex information</li>
          <li>Balance technical and practical requirements</li>
        </ul>
        <p className="mt-4">
          It exemplifies my development approach: understanding problems deeply, building robust solutions, 
          and creating user-friendly experiences.
        </p>
      </section>
    </BlogPostLayout>
  );
} 