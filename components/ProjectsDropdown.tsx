"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

const projects = [
  { name: "Referee Stats", path: "/referee-stats" },
  // Add more projects as needed
];

export default function ProjectsDropdown() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Detect if device is a touch device (for mobile interactions)
  useEffect(() => {
    const checkIfTouchDevice = () => setIsTouchDevice("ontouchstart" in window);
    checkIfTouchDevice();
    window.addEventListener("resize", checkIfTouchDevice);
    return () => window.removeEventListener("resize", checkIfTouchDevice);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
      onMouseEnter={() => !isTouchDevice && setIsOpen(true)}
      onMouseLeave={() => !isTouchDevice && setIsOpen(false)}
    >
      {/* Dropdown Button */}
      <button
        className="flex items-center py-2 gap-1 text-sm md:text-base text-foreground hover:text-primary transition-colors"
        onClick={() => isTouchDevice && setIsOpen((prev) => !prev)}
      >
        Projects
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
          {projects.map(({ name, path }) => (
            <button
              key={name}
              className="block w-full text-left px-4 py-2 hover:bg-border transition-colors text-foreground"
              onClick={() => {
                router.push(path);
                setIsOpen(false);
              }}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
