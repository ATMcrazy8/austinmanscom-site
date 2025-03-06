// ThemeProvider.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

type ThemeConfig = {
  hue: number;
};

// Define themes
const themes: Record<string, ThemeConfig> = {
  mint: { hue: 150 },
  ocean: { hue: 190 },
  meadow: { hue: 85 },
  lava: { hue: 360 },
  space: { hue: 280 },
};

// Create Context
const ThemeContext = createContext({
  theme: "mint",
  isDarkMode: false,
  setTheme: (_theme: string) => {},
  toggleDarkMode: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<string | null>(null); // Delay theme setting until useEffect runs
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const isMounted = theme !== null; // Only render children when theme is set

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") || "mint";
      const savedMode = localStorage.getItem("mode") === "dark";
      
      document.documentElement.style.setProperty("--hue", themes[savedTheme]?.hue.toString());

      setTheme(savedTheme);
      setIsDarkMode(savedMode);
      document.documentElement.classList.toggle("dark", savedMode);
    }
  }, []);

  const applyTheme = (theme: string) => {
    if (typeof window !== "undefined") {
      document.documentElement.style.setProperty("--hue", themes[theme]?.hue.toString());
      setTheme(theme);
      localStorage.setItem("theme", theme);
    }
  };

  const toggleDarkMode = () => {
    if (typeof window !== "undefined") {
      const newMode = !isDarkMode;
      setIsDarkMode(newMode);
      document.documentElement.classList.toggle("dark", newMode);
      localStorage.setItem("mode", newMode ? "dark" : "light");
    }
  };

  if (!isMounted) return null;

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, setTheme: applyTheme, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
