"use client";

import Image from "next/image";
import { useTheme } from "@/app/context/ThemeProvider";

export default function ThemedHeadshot() {
  const { theme } = useTheme();

  // Retrieve the hue value from the theme
  const themes: Record<string, number> = {
    mint: 150,
    ocean: 190,
    meadow: 85,
    lava: 360,
    space: 280,
  };

  const hue = themes[theme] ?? 150; // Default to mint (150) if undefined
  const hueRotateValue = (hue - 53 + 360) % 360; // Adjust rotation

  return (
    <div className="flex items-center justify-center rounded-full overflow-hidden">
      <Image
        src="/AustinMansHeadshot.jpg"
        width={240}
        height={240}
        alt="Headshot of myself, the site author, Austin Mans"
        style={{ filter: `sepia(100%) hue-rotate(${hueRotateValue}deg)` }}
      />
    </div>
  );
}
