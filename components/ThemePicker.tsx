"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/app/context/ThemeProvider";
import { ChevronDown } from "lucide-react";

const themes = ["mint", "ocean", "ultraviolet", "pink", "heat", "goldenrod"];

export default function ThemePicker() {
  const { theme, setTheme, isDarkMode, toggleDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Detect touch devices to determine hover vs. click interaction
  useEffect(() => {
    const checkIfTouchDevice = () => setIsTouchDevice("ontouchstart" in window);
    checkIfTouchDevice();
    window.addEventListener("resize", checkIfTouchDevice);
    return () => window.removeEventListener("resize", checkIfTouchDevice);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={() => !isTouchDevice && setIsOpen(true)} // Open on hover (desktop)
      onMouseLeave={() => !isTouchDevice && setIsOpen(false)} // Close on hover out (desktop)
    >
      {/* Dropdown Button */}
      <button
        className="flex items-center py-2 gap-1 text-sm md:text-base text-foreground hover:text-primary transition-colors"
        onClick={() => isTouchDevice && setIsOpen((prev) => !prev)} // Toggle on click (mobile)
      >
        Theme
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
          {themes.map((themeName) => (
            <button
              key={themeName}
              onClick={() => {
                setTheme(themeName);
                setIsOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 hover:bg-border transition-colors ${
                theme === themeName
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground"
              }`}
            >
              {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
            </button>
          ))}

          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between px-4 py-2 border-t border-border">
            <span className="text-sm">Dark Mode</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isDarkMode}
                onChange={toggleDarkMode}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-muted rounded-full peer-focus:ring-4 peer-focus:ring-ring dark:bg-muted-foreground peer-checked:bg-primary"></div>
              <span className="absolute left-1 top-1 w-4 h-4 bg-background rounded-full transition-transform peer-checked:translate-x-5"></span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
