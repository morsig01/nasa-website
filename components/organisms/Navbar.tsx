"use client";
 
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Sun, Moon } from "lucide-react";
 
export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
 
  // useEffect to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
 
  if (!mounted) {
    return (
      <nav className="fixed w-full top-0 z-50 backdrop-blur-sm bg-white/75 dark:bg-black border-b border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-bold">
              APOD
            </Link>
            <Link href="/history" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white">
              History
            </Link>
            <Link href="/library" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white">
              Library
            </Link>
          </div>
          <div className="w-10 h-10"></div>
        </div>
      </nav>
    );
  }
 
  return (
    <nav className="fixed w-full top-0 z-50 backdrop-blur-sm bg-white dark:bg-black/75 border-b border-neutral-200 dark:border-neutral-800">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold">
            APOD
          </Link>
          <Link href="/history" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white">
            History
          </Link>
          <Link href="/library" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white">
            Library
          </Link>
        </div>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
      </div>
    </nav>
  );
}