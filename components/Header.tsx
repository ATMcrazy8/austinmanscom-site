"use client";

import ThemePicker from "./ThemePicker";

export default function Header() {

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-center w-full py-4 shadow-lg bg-ring/25 backdrop-blur-lg">
      <div className="flex w-[calc(100%-40px)] max-w-[1520px] justify-between items-center">
        {/* Logo Replacement */}
        <div className="flex items-center gap-2 border-l-2 pl-1 md:pl-2 border-ring">
          <div className="text-sm/[1rem] md:text-xl/[1.2rem] font-bold text-monotone-foreground">Austin Mans<span className="text-secondary-foreground text-[10px] md:text-sm"><br/>Web Development</span></div>
        </div>

        <nav className="flex items-center gap-4">

          <button
            className="px-4 py-2 bg-primary text-sm md:text-base text-primary-foreground rounded-md hover:bg-ring transition-colors"
            onClick={() => scrollToSection("contact")}
          >
            Contact<span className="hidden md:inline"> Me</span>
          </button>

          <ThemePicker />
          
        </nav>
        
      </div>
    </header>
  );
}
