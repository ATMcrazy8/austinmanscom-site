"use client";

import { Rocket, Eye, Handshake, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

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
      {webMetrics.map(({ title, description, icon: Icon }, index) => (
        <MetricCard
          key={title}
          title={title}
          description={description}
          Icon={Icon}
          index={index}
        />
      ))}
    </div>
  );
}


function MetricCard({
  title,
  description,
  Icon,
  index,
}: {
  title: string;
  description: string;
  Icon: LucideIcon;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        duration: 0.5,
        delay: index * 0.2,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="relative p-6 bg-card rounded-lg shadow-md flex flex-col items-start text-start gap-2 overflow-hidden group"
    >
      {/* Spotlight gradient */}
      <motion.div
        className="absolute pointer-events-none z-0"
        style={{
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, hsl(var(--primary) / 10%), transparent 70%)`,
        }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      {/* Content (above the spotlight) */}
      <div className="relative z-10">
        <div className="flex flex-row items-center gap-4 mb-2">
          <Icon className="w-6 h-6 text-primary" />
          <h3 className="text-xl text-secondary-foreground font-bold">{title}</h3>
        </div>
        <p className="text-card-foreground">{description}</p>
      </div>
    </motion.div>
  );
}
