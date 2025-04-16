"use client";

export default function SiteFooter() {
    return (
        <footer className="w-full p-2 flex items-center justify-center bg-card text-center">
            <p className="max-w-[calc(100%-40px)] text-[8px] md:text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Austin Mans Portfolio. All rights
            reserved.
            </p>
        </footer>
    )
}