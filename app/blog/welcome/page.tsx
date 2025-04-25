import { Metadata } from "next";
import { BlogPostLayout } from "@/components/blog/BlogPostLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Welcome to My Blog",
  description: "A space to build, break, and learn out loud.",
  openGraph: {
    title: "Welcome to My Blog",
    description: "A space to build, break, and learn out loud.",
    type: "article",
    publishedTime: "2024-03-19",
    tags: ["Web Development", "Blog"],
  },
};

export default function WelcomePost() {
  return (
    <BlogPostLayout
      title="Welcome to My Blog"
      date="2024-03-19"
      tags={["Web Development", "Blog"]}
    >
      <h2 className="text-4xl font-medium mb-8">Hey, I'm Austin — Glad You're Here</h2>

      <p className="text-xl mb-8">
        Thanks for dropping in! I built this blog as a space to document what I'm working on,
        share how I'm building things, and maybe help someone else along the way.
        If you’re into clean code, cool tools, and learning in public — you’ll feel right at home here.
      </p>

      <section className="mb-12">
        <h3 className="text-2xl font-medium mb-4">What You’ll Find Here</h3>
        <p className="mb-4">This isn't just a portfolio — it’s a workbench. Expect posts on:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Breakdowns of projects I've worked on</li>
          <li>UI, UX, and the decisions behind them</li>
          <li>Data. Because I'm a nerd at heart and I can’t help myself</li>
          <li>And maybe some other things as they relate to my career and the development world in general</li>
        </ul>

        <p className="mt-6 mb-4">I'm especially interested in:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Building smooth, fast web apps that feel good to use</li>
          <li>Turning messy data into something useful</li>
          <li>Designing tools that solve real-world problems</li>
          <li>Making technical stuff a little easier to understand</li>
          <li>Styling and creativity in design. I'm still learning a lot here but the more I play around in this realm, the more I realize how much I still have to learn.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h3 className="text-2xl font-medium mb-4">Why I’m Writing</h3>
        <p className="mb-4">
          This blog isn’t just about showing off the final product — it's about sharing the process. I want to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Write down what I’m learning (so I actually remember it)</li>
          <li>Offer useful ideas or patterns to anyone facing similar challenges</li>
          <li>Learn from feedback and different perspectives</li>
        </ul>
      </section>

      <section className="mb-12">
        <h3 className="text-2xl font-medium mb-4">What I’m Building With</h3>
        <p className="mb-4">Right now, most of my stack looks like this:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Next.js (App Router, React.js, TypeScript, Tailwind CSS) for routing and structuring the site</li>
          <li>Framer Motion for animations</li>
          <li>A mix of libraries for data wrangling and visualization (like Recharts)</li>
          <li>Shadcn/ui for components</li>
          <li>Vercel for hosting</li>
        </ul>
        <p className="mt-4">
          I’m always experimenting though, so things may evolve over time.
        </p>
      </section>

      <section className="mb-12">
        <h3 className="text-2xl font-medium mb-4">Let’s Stay in Touch</h3>
        <p className="mb-4">
          I’d love to hear from you — whether it’s a question, suggestion, or just a quick hello.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Use the <Link href="/#contact" className="hover:text-primary">contact methods</Link> on the homepage
          </li>
          <li>
            Or reach out on socials. I don't post very often but I do check <a href="https://x.com/ATMcrazy8" target="_blank" rel="noopener noreferrer" className="hover:text-primary">X (Twitter)</a> and <a href="https://www.tiktok.com/@austinmans" target="_blank" rel="noopener noreferrer" className="hover:text-primary">TikTok</a>.</li>
        </ul>
      </section>

      <p className="text-xl mt-12">
        I appreciate you checking out the blog. Let’s build some cool stuff and learn something along the way.
      </p>
    </BlogPostLayout>
  );
}
