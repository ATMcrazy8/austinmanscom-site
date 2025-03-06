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
    <header className="sticky top-0 z-50 w-full p-4 shadow-lg bg-ring/25 backdrop-blur-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Replacement */}
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">Austin Mans | Web</h1>
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
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-ring transition-colors"
            onClick={() => scrollToSection("contact")}
          >
            Contact Me
          </button>
        </nav>
      </div>
    </header>
  );
}
