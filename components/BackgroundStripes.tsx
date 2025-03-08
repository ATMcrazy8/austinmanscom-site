import { motion } from "framer-motion";

export default function BackgroundStripes() {
    return (
        <div className="w-[160px] h-[46rem] flex items-center justify-between bg-none absolute z-0 top-[-4%] md:top-[-8%] right-[20%] md:right-[15%] rotate-[20deg]">
            <motion.div
                initial={{ opacity: 0, x: -1000, rotate: -180 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{
                duration: 1.2,
                delay: 0.1,
                ease: [0.2, 0.9, 0.5, 1.03],
                }}
                className="w-2 h-[140%] bg-ring/[2%]"
            ></motion.div>
            <motion.div
                initial={{ opacity: 0, x: -1000, rotate: -165 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{
                duration: 1.2,
                delay: 0.15,
                ease: [0.25, 0.9, 0.45, 1.03],
                }}
                className="w-2 h-[140%] bg-ring/[4%]"
            ></motion.div>
            <motion.div
                initial={{ opacity: 0, x: -1000, rotate: -150 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{
                duration: 1.2,
                delay: 0.2,
                ease: [0.3, 0.7, 0.4, 1.03],
                }}
                className="w-3 h-full bg-ring/[6%]"
            ></motion.div>
            <motion.div
                initial={{ opacity: 0, x: -1000, rotate: -135 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{
                duration: 1.2,
                delay: 0.25,
                ease: [0.35, 0.7, 0.35, 1.1],
                }}
                className="w-3 h-[140%] bg-ring/[8%]"
            ></motion.div>
            <motion.div
                initial={{ opacity: 0, x: -1000, rotate: -120 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{
                duration: 1.2,
                delay: 0.3,
                ease: [0.4, 0.5, 0.3, 1.1],
                }}
                className="w-4 h-[140%] bg-ring/[10%]"
            ></motion.div>
            <motion.div
                initial={{ opacity: 0, x: -1000, rotate: -105 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{
                duration: 1.2,
                delay: 0.35,
                ease: [0.45, 0.5, 0.25, 1.1],
                }}
                className="w-4 h-[140%] bg-ring/[12%]"
            ></motion.div>
            <motion.div
                initial={{ opacity: 0, x: -1000, rotate: -90 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{
                duration: 1.2,
                delay: 0.4,
                ease: [0.5, 0.3, 0.2, 1.1],
                }}
                className="w-5 h-[140%] bg-ring/[14%]"
            ></motion.div>
            <motion.div
                initial={{ opacity: 0, x: -1000, rotate: -75 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{
                duration: 1.2,
                delay: 0.45,
                ease: [0.55, 0.3, 0.15, 1.1],
                }}
                className="w-5 h-[140%] bg-ring/[16%]"
            ></motion.div>
            <motion.div
                initial={{ opacity: 0, x: -1000, rotate: -60 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{
                duration: 1.2,
                delay: 0.5,
                ease: [0.6, 0.1, 0.1, 1.1],
                }}
                className="w-6 h-[140%] bg-ring/[18%]"
            ></motion.div>
            <motion.div
                initial={{ opacity: 0, x: -1000, rotate: -45 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{
                duration: 1.2,
                delay: 0.55,
                ease: [0.65, 0.1, 0.05, 1.1],
                }}
                className="w-6 h-[140%] bg-ring/[20%]"
            ></motion.div>
        </div>
    )
}