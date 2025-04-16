"use client";

import { ThemeProvider } from "./context/ThemeProvider";
import Header from "@/components/Header";
import SiteFooter from "@/components/Footer";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceMono.variable}`}>
      <head>
        <title>Austin Mans | Web Development</title>
        <meta
          name="description"
          content="Austin Mans is a web developer specializing in modern, responsive, and high-performance websites to elevate your business."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Web Development by Austin Mans",
              url: "https://austinmanscom-site.vercel.app/",
              description: "Modern, high-performance web development services.",
              author: {
                "@type": "Person",
                name: "Austin Mans",
              },
            }),
          }}
        />
      </head>

      <body className="bg-background text-foreground min-h-screen font-sans">
        <ThemeProvider>
          <Header />
          {children}
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
