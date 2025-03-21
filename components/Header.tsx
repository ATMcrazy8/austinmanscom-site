"use client";

import { useRouter } from "next/navigation";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 flex items-center justify-center w-full py-4 shadow-lg bg-ring/25 backdrop-blur-lg">
      <div className="flex w-[calc(100%-40px)] max-w-[1520px] justify-between items-center">
        
        {/* Logo - Navigates to Homepage */}
        <div 
          id="siteLogo" 
          className="flex items-center gap-2 border-l-2 pl-1 md:pl-2 border-ring cursor-pointer"
          onClick={() => router.push("/")}
        >
          <div className="text-sm/[1rem] md:text-xl/[1.2rem] font-bold text-monotone-foreground">
            Austin Mans
            <span className="text-secondary-foreground text-[10px] md:text-sm"><br/>Web Development</span>
          </div>
        </div>

        {/* Mobile Menu (Replaces Navigation) */}
        <MobileMenu />
      </div>
    </header>
  );
}
