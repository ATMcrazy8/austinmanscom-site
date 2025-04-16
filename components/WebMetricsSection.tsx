"use client";

import { Rocket, Eye, Handshake, LucideIcon } from "lucide-react";

type WebMetric = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const webMetrics: WebMetric[] = [
  {
    title: "Boost Speed & Rank Higher",
    description:
      "A fast-loading website improves user engagement and SEO rankings, reducing bounce rates and keeping visitors on your site longer. Search engines like Google prioritize speed, making site performance a critical factor in online visibility.",
    icon: Rocket,
  },
  {
    title: "Maximize Your Audience",
    description:
      "Web accessibility ensures everyone, including users with disabilities, can easily navigate and engage with your content. ADA compliance isn't just ethical—it improves user experience, expands your reach, and even enhances SEO.",
    icon: Eye,
  },
  {
    title: "Design That Captivates",
    description:
      "A visually appealing, user-friendly website builds trust and keeps visitors exploring. Engaging layouts, intuitive navigation, and interactive elements turn casual visitors into loyal customers.",
    icon: Handshake,
  },
];

export default function WebMetricsSection() {
  return (
    <div className="flex flex-col lg:flex-row w-full lg:w-auto gap-8 justify-between">
      {webMetrics.map(({ title, description, icon: Icon }) => (
        <div
          key={title}
          className="p-6 bg-card rounded-lg shadow flex flex-col items-start text-start gap-2"
        >
          <div className="flex flex-row items-center gap-4">
            <Icon className="w-6 h-6 text-primary" />
            <h3 className="text-xl text-secondary-foreground font-bold">{title}</h3>
          </div>
          <p className="text-card-foreground">{description}</p>
        </div>
      ))}
    </div>
  );
}
