"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Rocket, Eye, Handshake } from "lucide-react";

const webMetrics = [
  { title: "Performance", description: "Fast-loading sites keep users engaged and improve SEO.", icon: Rocket },
  { title: "Accessibility", description: "Reach more users by ensuring everyone can access your content.", icon: Eye },
  { title: "Engagement", description: "Beautiful, intuitive design keeps users exploring your site longer.", icon: Handshake },
];

export default function WebMetricsSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 60%"],
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Stagger each child animation
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 100 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.5 }} // Trigger when 50% visible
      className="flex flex-col md:flex-row w-full md:w-auto gap-8 justify-between overflow-hidden"
    >
      {webMetrics.map(({ title, description, icon: Icon }) => (
        <motion.div
          key={title}
          variants={itemVariants}
          className="p-6 bg-card rounded-lg shadow flex flex-col items-start justify-start text-start gap-2"
        >
          <div className="flex flex-row items-center text-start gap-4">
            <Icon className="w-5 h-5 text-primary" />
            <h3 className="text-xl text-secondary-foreground font-bold">{title}</h3>
          </div>
          <p className="text-card-foreground">{description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
