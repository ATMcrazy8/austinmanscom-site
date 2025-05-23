"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/app/context/ThemeProvider";

const themes = ["mint", "ocean", "ultraviolet", "pink", "heat", "goldenrod"];

export default function MobileMenu() {
  const router = useRouter();
  const { theme, setTheme, isDarkMode, toggleDarkMode } = useTheme();

  return (
    <Sheet >
      {/* Hamburger Button - Opens Sheet */}
      <SheetTrigger asChild>
        <button 
          aria-label="Open menu"
          className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </SheetTrigger>

      {/* Sidebar Menu Content */}
      <SheetContent
        side="right"
        className="w-full sm:w-96 bg-background shadow-lg overflow-y-auto"
      >
        {/* Navigation Links */}
        <nav className="flex flex-col mt-12">
          {/* Home Button */}
          <SheetClose asChild>
            <button
              className="flex items-center py-4 px-2 text-lg font-semibold text-foreground hover:text-primary hover:bg-muted/20 transition-colors rounded-md"
              onClick={() => router.push("/")}
            >
              Home
            </button>
          </SheetClose>

          {/* Navigation Accordion */}
          <Accordion type="single" collapsible className="w-full">
            {/* Projects Section */}
            <AccordionItem value="projects" className="border-none">
              <AccordionTrigger className="text-lg text-foreground font-semibold py-4 px-2 hover:text-primary hover:bg-muted/20 transition-colors rounded-md">
                Projects
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2">
                <SheetClose asChild>
                  <button
                    className="w-full text-left py-2 px-4 hover:text-primary hover:bg-muted/20 transition-colors rounded-md"
                    onClick={() => router.push("/referee-stats")}
                  >
                    Referee Stats
                  </button>
                </SheetClose>
              </AccordionContent>
            </AccordionItem>

            {/* Blog Section */}
            <SheetClose asChild>
              <button
                className="flex items-center py-4 px-2 text-lg font-semibold text-foreground hover:text-primary hover:bg-muted/20 transition-colors rounded-md w-full"
                onClick={() => router.push("/blog")}
              >
                Blog
              </button>
            </SheetClose>

            {/* Theme Section */}
            <AccordionItem value="theme" className="border-none">
              <AccordionTrigger className="text-lg text-foreground font-semibold py-4 px-2 hover:text-primary hover:bg-muted/20 transition-colors rounded-md">
                Theme
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2">
                {/* Theme Options (No SheetClose - Keeps the menu open) */}
                {themes.map((themeName) => (
                  <button
                    key={themeName}
                    className={`w-full text-left py-2 px-4 hover:text-primary hover:bg-muted/20 transition-colors rounded-md ${
                      theme === themeName
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground"
                    }`}
                    onClick={() => setTheme(themeName)}
                  >
                    {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                  </button>
                ))}

                {/* Dark Mode Toggle */}
                <div className="flex items-center justify-between py-2 px-4 border-t border-border">
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
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Contact Button */}
          <SheetClose asChild>
            <button
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-ring transition-colors mt-4"
              onClick={() => router.push("/#contact")}
            >
              Contact Me
            </button>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
