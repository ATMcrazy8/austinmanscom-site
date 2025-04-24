import { notFound } from "next/navigation";
import { BlogPostLayout } from "@/components/blog/BlogPostLayout";

// Define the blog posts metadata
const blogPosts = [
  {
    slug: "welcome",
    title: "Welcome to My Blog",
    date: "2024-03-19",
    tags: ["welcome", "blog"],
  },
  {
    slug: "referee-stats-tracking",
    title: "From Game Data to Fairness Metrics",
    date: "2024-04-20",
    tags: ["referees", "nhl", "analytics"],
  },
];

// Generate static params for all blog posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Get blog post metadata
async function getBlogPost(slug: string) {
  const post = blogPosts.find((post) => post.slug === slug);
  if (!post) return null;
  return post;
}

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function BlogPost({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const search = await searchParams;
  const post = await getBlogPost(slug);
  
  if (!post) {
    notFound();
  }

  return (
    <BlogPostLayout
      title={post.title}
      date={post.date}
      tags={post.tags}
    >
      {post.slug === "welcome" && (
        <>
          <h2>Welcome to My Blog</h2>
          <p>
            Welcome to my blog where I share my thoughts on software development, hockey, and more.
          </p>
          <p>
            I'm Austin, a software developer with a passion for building things and analyzing data.
            I created this blog to share my experiences, projects, and insights with others.
          </p>
          <p>
            You can expect to find posts about:
          </p>
          <ul>
            <li>Software development and programming</li>
            <li>Data analysis and visualization</li>
            <li>Hockey analytics and statistics</li>
            <li>Personal projects and experiences</li>
          </ul>
          <p>
            I hope you find something interesting here. Feel free to reach out if you have any questions or suggestions!
          </p>
        </>
      )}

      {post.slug === "referee-stats-tracking" && (
        <>
          <h2>From Game Data to Fairness Metrics</h2>
          <p>
            As a hockey fan and data enthusiast, I've always been fascinated by the role of referees in the game.
            Their decisions can significantly impact the outcome of a match, and I wanted to explore whether we could
            quantify their performance using data.
          </p>
          <h3>The Project</h3>
          <p>
            I built a platform that collects and analyzes NHL referee statistics to calculate fairness scores.
            The system looks at various metrics like:
          </p>
          <ul>
            <li>Penalties per game</li>
            <li>Home vs. away penalty distribution</li>
            <li>Game outcomes and their correlation with referee assignments</li>
            <li>Consistency in penalty calling</li>
          </ul>
          <h3>The Technology</h3>
          <p>
            The platform is built using Next.js, TypeScript, and Tailwind CSS. It features:
          </p>
          <ul>
            <li>Real-time data processing</li>
            <li>Interactive visualizations</li>
            <li>Responsive design for all devices</li>
            <li>Type-safe API endpoints</li>
          </ul>
          <h3>The Results</h3>
          <p>
            The system assigns each referee a fairness score based on their statistical performance.
            This helps identify patterns and potential biases in officiating, providing valuable insights
            for fans, analysts, and the league itself.
          </p>
          <p>
            You can check out the live platform at the Referee Stats section of this site.
          </p>
        </>
      )}
    </BlogPostLayout>
  );
} 