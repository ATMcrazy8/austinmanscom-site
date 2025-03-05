"use client";

import { useTheme } from "@/app/context/ThemeProvider";

const themeOptions = ["green", "space", "ocean"];

export default function ColorShowcase() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Choose a Theme</h2>
      <div className="flex gap-4 justify-center">
        {themeOptions.map((themeOption) => (
          <button
            key={themeOption}
            onClick={() => setTheme(themeOption)}
            className={`px-4 py-2 rounded-lg text-white`}
            style={{ backgroundColor: `hsl(var(--hue), 90%, 40%)` }}
          >
            {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
