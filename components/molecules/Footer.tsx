import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 mt-auto">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} NASA APOD</span>
            <Link href="https://apod.nasa.gov/apod/" className="hover:text-black dark:hover:text-white transition-colors">
              Official Site
            </Link>
            <Link href="https://api.nasa.gov/" className="hover:text-black dark:hover:text-white transition-colors">
              NASA API
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-black dark:hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-black dark:hover:text-white transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}