"use client";

import { motion } from "framer-motion";
import { Rocket, Eye, Handshake, LucideIcon } from "lucide-react";

type WebMetric = {
  title: string;
  description: string;
  icon: LucideIcon; // Explicitly define the type for icons
};

const webMetrics: WebMetric[] = [
  { title: "Boost Speed & Rank Higher", description: "A fast-loading website improves user engagement and SEO rankings, reducing bounce rates and keeping visitors on your site longer. Search engines like Google prioritize speed, making site performance a critical factor in online visibility.", icon: Rocket },
  { title: "Maximize Your Audience", description: "Web accessibility ensures everyone, including users with disabilities, can easily navigate and engage with your content. ADA compliance isn't just ethical—it improves user experience, expands your reach, and even enhances SEO.", icon: Eye },
  { title: "Design That Captivates", description: "A visually appealing, user-friendly website builds trust and keeps visitors exploring. Engaging layouts, intuitive navigation, and interactive elements turn casual visitors into loyal customers.", icon: Handshake },
];

// ✅ Single Web Metric Component
const WebMetricItem = ({ title, description, icon: Icon, index }: { title: string; description: string; icon: LucideIcon; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}  // Start hidden & off-screen
      whileInView={{ opacity: 1, y: 0 }} // Animate in when visible
      viewport={{ once: false, amount: 0.5 }} // Trigger when 50% in view
      transition={{ duration: 0.6, delay: index * 0.2, ease: [0.4, 0, 0.2, 1] }} // Stagger effect
      className="p-6 bg-card rounded-lg shadow flex flex-col items-start justify-start text-start gap-2"
    >
      <div className="flex flex-row items-center text-start gap-4">
        <Icon className="w-6 h-6 text-primary" />
        <h3 className="text-xl text-secondary-foreground font-bold">{title}</h3>
      </div>
      <p className="text-card-foreground">{description}</p>
    </motion.div>
  );
};

// ✅ Web Metrics Section
export default function WebMetricsSection() {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.5 }}
      variants={{
        hidden: { opacity: 1 }, // Keep the wrapper visible, just stagger children
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.3 }, // Stagger children when visible
        },
      }}
      className="flex flex-col lg:flex-row w-full lg:w-auto gap-8 justify-between overflow-hidden"
    >
      {webMetrics.map((metric, index) => (
        <WebMetricItem key={metric.title} {...metric} index={index} />
      ))}
    </motion.div>
  );
}
