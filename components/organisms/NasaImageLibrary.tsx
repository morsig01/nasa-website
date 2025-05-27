"use client";

import { useState, useEffect } from "react";
import ImageGrid from "../molecules/ImageGrid";
import { Search, Loader2 } from "lucide-react";
import { ImageModal } from "../molecules/ImageModal";

interface NasaImage {
  url: string;
  title: string;
  description?: string;
  dateCreated?: string;
  center?: string;
  keywords?: string[];
  nasaId?: string;
}

const PAGE_SIZE_INITIAL = 21;
const PAGE_SIZE_INCREMENT = 12;

export default function NasaImageLibrary() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState<NasaImage[]>([]);
  const [allResults, setAllResults] = useState<NasaImage[]>([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE_INITIAL);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<NasaImage | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages(searchQuery: string = "") {
    setLoading(true);
    setVisibleCount(PAGE_SIZE_INITIAL);

    try {
      const res = await fetch(
        `https://images-api.nasa.gov/search?q=${encodeURIComponent(
          searchQuery || "nasa"
        )}&media_type=image`
      );

      if (!res.ok) {
        throw new Error(`NASA API responded with status: ${res.status}`);
      }

      const data = await res.json();
      const items = data.collection?.items || [];

      const imageData = items
        .map((item: any) => {
          const imageLink =
            item.links?.find(
              (link: any) =>
                link.render === "image" && link.href.includes("~large")
            ) ||
            item.links?.find((link: any) => link.render === "image") ||
            item.links?.[0];
          const url = imageLink?.href;
          const metadata = item.data?.[0] || {};

          return {
            url,
            title: metadata.title || "Untitled NASA Image",
            description: metadata.description,
            dateCreated: metadata.date_created,
            center: metadata.center,
            keywords: metadata.keywords,
            nasaId: metadata.nasa_id,
          };
        })
        .filter((item: NasaImage) => Boolean(item.url));

      setAllResults(imageData);
      setImages(imageData.slice(0, PAGE_SIZE_INITIAL));
    } catch (error) {
      console.error("Error fetching NASA images:", error);
    } finally {
      setLoading(false);
    }
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

  function handleImageClick(image: NasaImage) {
    setSelectedImage(image);
  }

  return (
    <div className="max-w-5xl mx-auto pt-24">
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

      {loading && (
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="mt-2">Loading images...</p>
        </div>
      )}

      {!loading && <ImageGrid images={images} onImageClick={handleImageClick} />}

      {!loading && images.length < allResults.length && (
        <div className="text-center mt-6">
          <button
            onClick={showMore}
            className="px-6 py-2 bg-neutral-800 text-white rounded-md hover:bg-neutral-700 transition-colors"
          >
            Show More
          </button>
        </div>
      )}

      {!loading && images.length === 0 && (
        <p className="text-center text-red-500">No images found.</p>
      )}

      {selectedImage && (
        <ImageModal
          src={selectedImage.url}
          title={selectedImage.title}
          description={selectedImage.description}
          dateCreated={selectedImage.dateCreated}
          center={selectedImage.center}
          keywords={selectedImage.keywords}
          nasaId={selectedImage.nasaId}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}
