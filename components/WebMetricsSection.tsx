import { Rocket, Eye, Handshake } from "lucide-react";

const webMetrics = [
  { title: "Performance", description: "Fast-loading sites keep users engaged and improve SEO.", icon: Rocket },
  { title: "Accessibility", description: "Reach more users by ensuring everyone can access your content.", icon: Eye },
  { title: "Engagement", description: "Beautiful, intuitive design keeps users exploring your site longer.", icon: Handshake },
];

export default function WebMetricsSection() {
  return (
    <div className="flex flex-col md:flex-row w-full md:w-auto gap-8 justify-between">
      {webMetrics.map(({ title, description, icon: Icon }) => (
        <div key={title} className="p-6 bg-card rounded-lg shadow flex flex-col items-start justify-start text-start gap-2">
          <div className="flex flex-row items-center text-start gap-4">
            <Icon className="w-5 h-5 text-primary" /> {/* Icon */}
            <h3 className="text-xl text-secondary-foreground font-bold">{title}</h3>
          </div>
          <p className="text-card-foreground">{description}</p>
        </div>
      ))}
    </div>
  );
}
