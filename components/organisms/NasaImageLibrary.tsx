"use client";

import { useState, useEffect } from "react";
import ImageGrid from "../molecules/ImageGrid";
import { Search, Loader2 } from "lucide-react";

const PAGE_SIZE_INITIAL = 21;
const PAGE_SIZE_INCREMENT = 12;

export default function NasaImageLibrary() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [allResults, setAllResults] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE_INITIAL);
  const [loading, setLoading] = useState(false);

  // Fetch default images on first render
  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages(searchQuery: string = "") {
    setLoading(true);
    setVisibleCount(PAGE_SIZE_INITIAL);

    const res = await fetch(
      `https://images-api.nasa.gov/search?q=${encodeURIComponent(
        searchQuery || "nasa"
      )}&media_type=image`
    );

    const data = await res.json();
    const items = data.collection?.items || [];

    const imageUrls = items
      .map((item: any) => item.links?.[0]?.href)
      .filter(Boolean);

    setAllResults(imageUrls);
    setImages(imageUrls.slice(0, PAGE_SIZE_INITIAL));
    setLoading(false);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    fetchImages(query);
  }

  function showMore() {
    const nextCount = visibleCount + PAGE_SIZE_INCREMENT;
    setVisibleCount(nextCount);
    setImages(allResults.slice(0, nextCount));
  }

  return (
    <div className="max-w-5xl mx-auto pt-24"> {/* Added pt-24 for top padding */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {loading ? (
              <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
            ) : (
              <Search className="h-5 w-5 text-black" />
            )}
          </div>
          <input
            type="text"
            placeholder="Search NASA images (e.g. 'nebula', 'moon')"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-black pl-10 pr-4 py-3 border border-gray-200 rounded-full bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 px-6 bg-black text-white rounded-r-full hover:bg-neutral-700 transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {loading && <p className="text-center">Loading images...</p>}

      {!loading && <ImageGrid images={images} />}

      {!loading && images.length < allResults.length && (
        <div className="text-center mt-6">
          <button
            onClick={showMore}
            className="px-6 py-2 bg-neutral-800 text-white rounded-xs hover:bg-neutral-700"
          >
            Show More
          </button>
        </div>
      )}

      {!loading && images.length === 0 && (
        <p className="text-center text-red-500">No images found.</p>
      )}
    </div>
  );
}
