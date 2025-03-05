"use client";

import { createContext, useContext, useEffect, useState } from "react";

type ThemeConfig = {
  hue: number;
};

// Define themes with different hues
const themes: Record<string, ThemeConfig> = {
  mint: { hue: 150 },
  ocean: { hue: 190 },
  meadow: { hue: 85 },
  lava: { hue: 360 },
  space: { hue: 280 },
};

// Create the Theme Context
const ThemeContext = createContext({
  theme: "mint",
  hue: 150, // Store hue for use elsewhere
  isDarkMode: false,
  setTheme: (_theme: string) => {},
  toggleDarkMode: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<string>("mint");
  const [hue, setHue] = useState<number>(themes.mint.hue); // Store hue separately
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Apply theme hue
  const applyTheme = (theme: string) => {
    const themeData = themes[theme] ?? themes.mint;
    document.documentElement.style.setProperty("--hue", themeData.hue.toString());

    setTheme(theme);
    setHue(themeData.hue); // Update hue
    localStorage.setItem("theme", theme);
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("mode", newMode ? "dark" : "light");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "mint";
    const savedMode = localStorage.getItem("mode") === "dark";

    applyTheme(savedTheme);
    setIsDarkMode(savedMode);
    document.documentElement.classList.toggle("dark", savedMode);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, hue, isDarkMode, setTheme: applyTheme, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for using theme context
export function useTheme() {
  return useContext(ThemeContext);
}
