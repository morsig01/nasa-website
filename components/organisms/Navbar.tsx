"use client";
 
import Link from "next/link";
import { ModeToggle } from "../atoms/ModeToggle";
 
export default function Navbar() {
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
        <ModeToggle />
      </div>
    </nav>
  );
}