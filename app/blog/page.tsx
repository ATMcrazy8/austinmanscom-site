import Link from "next/link";

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const blogPosts = [
  {
    slug: "referee-stats-tracking",
    title: "Building a Referee Performance Analytics Platform",
    description: "How I built a data-driven platform to analyze and visualize referee performance metrics in professional hockey.",
    date: "2024-04-20",
    tags: ["Web Development", "Projects", "Data Analysis", "Data Visualization"],
  },
  {
    slug: "welcome",
    title: "Welcome to My Blog",
    description: "Join me as I share my journey through web development, data analysis, and the intersection of technology and sports.",
    date: "2024-03-19",
    tags: ["Web Development", "Blog"],
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-[calc(100vh-4rem-1rem)] flex flex-col">
      <div className="w-[calc(100%-40px)] max-w-[800px] mx-auto py-8 flex-1">
        <h1 className="text-4xl font-medium mb-8">Blog</h1>
        
        <div className="grid gap-8">
          {blogPosts.map((post) => {
            const [year, month, day] = post.date.split('-').map(Number);
            const formattedDate = `${months[month - 1]} ${day}, ${year}`;
            
            return (
              <Link 
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block px-4 py-3 rounded-lg border border-border hover:scale-[1.02] hover:border-primary duration-200 transition-all"
              >
                <h2 className="text-2xl text-card-foreground font-medium mb-2 group-hover:text-primary transition-colors duration-200">{post.title}</h2>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
                  <time dateTime={post.date}>{formattedDate}</time>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="px-2 py-[2px] bg-ring/10 text-ring/90 text-xs rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-foreground mt-2 p-2">{post.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
} 