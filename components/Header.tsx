"use client";

import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-card p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Replacement */}
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">Austin Mans | Web Development</h1>
        </div>

        <nav className="flex items-center gap-4">
          <ul className="hidden sm:flex gap-4">
            <li
              className="cursor-pointer hover:text-primary"
              onClick={() => scrollToSection("top")}
            >
              Top
            </li>
            <li
              className="cursor-pointer hover:text-primary"
              onClick={() => scrollToSection("about")}
            >
              About
            </li>
            <li
              className="cursor-pointer hover:text-primary"
              onClick={() => scrollToSection("showcase")}
            >
              Showcase
            </li>
          </ul>

          {/* Contact Me Button */}
          <button
            className="px-4 py-2 bg-accent text-accent-foreground rounded-md hover:bg-primary transition-colors"
            onClick={() => scrollToSection("contact")}
          >
            Contact Me
          </button>
        </nav>
      </div>
    </header>
  );
}
