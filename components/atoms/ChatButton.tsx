"use client";

import { MessagesSquare } from "lucide-react";
import Link from "next/link";

export default function ChatButton() {
  return (
    <Link href="/chatbot" className="fixed bottom-6 right-6 z-50">
      <button className="inline-flex items-center justify-center gap-2 bg-black hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-300 dark:text-black text-white rounded-full h-14 px-6 text-base font-medium transition-colors shadow-lg">
        <span>Ask AI</span>
        <MessagesSquare size={24} />
      </button>
    </Link>
  );
}