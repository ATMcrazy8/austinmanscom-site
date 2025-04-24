import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface BlogPostLayoutProps {
  title: string;
  date: string;
  tags: string[];
  children: React.ReactNode;
}

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function BlogPostLayout({ title, date, tags, children }: BlogPostLayoutProps) {

  const [year, month, day] = date.split('-').map(Number);
  const formattedDate = `${months[month - 1]} ${day}, ${year}`;

  return (
    <div className="min-h-[calc(100vh-4rem-1rem)] flex flex-col">
      <div className="w-[calc(100%-40px)] max-w-[800px] mx-auto py-8 flex-1">
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Directory
        </Link>

        <div className="mb-8">
          <h1 className="text-2xl font-medium mb-2">{title}</h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
            <time dateTime={date}>{formattedDate}</time>
            <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
                <span key={tag} className="px-2 py-[2px] bg-ring/10 text-ring/90 text-xs rounded-md">
                {tag}
                </span>
            ))}
            </div>
        </div>
        </div>

        <article className="prose prose-lg dark:prose-invert max-w-none">
          {children}
        </article>
      </div>
    </div>
  );
} 