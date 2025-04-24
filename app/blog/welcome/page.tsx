import { Metadata } from "next";
import { BlogPostLayout } from "@/components/blog/BlogPostLayout";

export const metadata: Metadata = {
  title: "Welcome to My Blog",
  description: "Join me as I share my journey through web development, data analysis, and the intersection of technology and sports.",
  openGraph: {
    title: "Welcome to My Blog",
    description: "Join me as I share my journey through web development, data analysis, and the intersection of technology and sports.",
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
      <h2 className="text-4xl font-medium mb-8">Hey There! Let's Build Something Together</h2>
      
      <p className="text-xl mb-8">
        Welcome to my corner of the internet! I'm Austin, and I'm excited to share my journey with you through this blog. 
        Whether you're a fellow developer, a sports enthusiast, or just someone curious about technology, 
        I hope you'll find something interesting here.
      </p>

      <section className="mb-12">
        <h3 className="text-2xl font-medium mb-4">What to Expect</h3>
        <p className="mb-4">This blog will be a mix of:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Deep dives into my projects (like the referee stats tracker)</li>
          <li>Technical tutorials and how-tos</li>
          <li>Thoughts on web development and data analysis</li>
          <li>The occasional sports analytics post (because why not combine my passions?)</li>
        </ul>

        <p className="mt-6 mb-4">I'm particularly passionate about:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Building clean, efficient web applications</li>
          <li>Turning raw data into meaningful insights</li>
          <li>Creating tools that solve real problems</li>
          <li>Making complex topics accessible and interesting</li>
        </ul>
      </section>

      <section className="mb-12">
        <h3 className="text-2xl font-medium mb-4">Why I'm Writing</h3>
        <p className="mb-4">
          I believe in learning in public and sharing knowledge. Each post will be a chance to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Document my learning process</li>
          <li>Share solutions to interesting problems</li>
          <li>Get feedback from the community</li>
          <li>Help others who might be facing similar challenges</li>
        </ul>
      </section>

      <section className="mb-12">
        <h3 className="text-2xl font-medium mb-4">The Tech Stack</h3>
        <p className="mb-4">Most of my projects use:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Next.js for the frontend</li>
          <li>TypeScript for type safety</li>
          <li>Tailwind CSS for styling</li>
          <li>Various data processing and visualization libraries</li>
        </ul>
        <p className="mt-4">
          But I'm always exploring new tools and technologies, so expect to see some experimentation along the way!
        </p>
      </section>

      <section className="mb-12">
        <h3 className="text-2xl font-medium mb-4">Let's Connect</h3>
        <p className="mb-4">
          I'd love to hear your thoughts, questions, or suggestions. Feel free to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Reach out through the contact form</li>
          <li>Connect on social media</li>
          <li>Share your own experiences and insights</li>
        </ul>
      </section>

      <p className="text-xl mt-12">
        Thanks for stopping by, and I hope you'll join me on this journey of building, learning, and sharing!
      </p>
    </BlogPostLayout>
  );
} 