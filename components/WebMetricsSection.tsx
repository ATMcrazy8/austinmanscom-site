"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Rocket, Eye, Handshake } from "lucide-react";

const webMetrics = [
  { title: "Boost Speed & Rank Higher", description: "A fast-loading website improves user engagement and SEO rankings, reducing bounce rates and keeping visitors on your site longer. Search engines like Google prioritize speed, making site performance a critical factor in online visibility.", icon: Rocket },
  { title: "Maximize Your Audience", description: "Web accessibility ensures everyone, including users with disabilities, can easily navigate and engage with your content. ADA compliance isn't just ethical—it improves user experience, expands your reach, and even enhances SEO.", icon: Eye },
  { title: "Design That Captivates", description: "A visually appealing, user-friendly website builds trust and keeps visitors exploring. Engaging layouts, intuitive navigation, and interactive elements turn casual visitors into loyal customers.", icon: Handshake },
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
      className="flex flex-col lg:flex-row w-full lg:w-auto gap-8 justify-between overflow-hidden"
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
