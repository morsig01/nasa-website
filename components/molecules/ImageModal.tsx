import Image from "next/image";
import { X } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { useState } from "react";

interface ImageModalProps {
  src: string | null;
  title: string | null;
  description?: string;
  dateCreated?: string;
  center?: string;
  keywords?: string[];
  nasaId?: string;
  onClose: () => void;
}

export function ImageModal({ 
  src, 
  title, 
  description,
  dateCreated,
  center,
  keywords,
  nasaId,
  onClose 
}: ImageModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  if (!src) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      {/* Window Container */}      
      <div className="relative z-50 bg-background/75 backdrop-blur-[2px] shadow-2xl w-[95vw] max-w-[1200px] h-[85vh] max-h-[800px]">
        {/* Window Title Bar */}
        <div className="flex items-center justify-between bg-muted/95 rounded-t-xs px-4 py-2 border-b border-border">
          <h3 className="font-medium text-foreground truncate max-w-[80%] md:max-w-[90%]" title={title || ""}>
            {title || "NASA Image"}
          </h3>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-muted-foreground/10 transition-colors"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
        
        {/* Image Container */}
        <div className="relative flex-1 h-[calc(100%-11rem)] overflow-hidden bg-muted/20">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Skeleton className="w-full h-full" />
            </div>
          )}
          <Image
            src={src}
            alt={title || "NASA Image"}
            fill
            className={`object-contain p-4 duration-700 ease-in-out ${
              isLoading ? 'scale-110 blur-xl grayscale' : 'scale-100 blur-0 grayscale-0'
            }`}
            quality={85}
            loading="eager"
            onLoadingComplete={() => setIsLoading(false)}
            sizes="(max-width: 1200px) 95vw, 1200px"
          />
        </div>

        {/* Metadata Section */}
        <div className="bg-muted/95 px-4 py-3 rounded-b-xs border-t border-border h-32 overflow-y-auto">
          {/* Description */}
          {description && (
            <p className="text-sm text-foreground/90 leading-relaxed mb-3">
              {description}
            </p>
          )}
          
          {/* Metadata Grid */}
          <div className="grid grid-cols-3 text-sm gap-2">
            {dateCreated && (
              <div>
                <span className="text-foreground/70">Date:</span>{" "}
                <span className="text-foreground/90">{new Date(dateCreated).toLocaleDateString()}</span>
              </div>
            )}
            {center && (
              <div>
                <span className="text-foreground/70">Center:</span>{" "}
                <span className="text-foreground/90">{center}</span>
              </div>
            )}
            {nasaId && (
              <div>
                <span className="text-foreground/70">NASA ID:</span>{" "}
                <span className="font-mono text-xs text-foreground/90">{nasaId}</span>
              </div>
            )}
          </div>
          
          {/* Keywords */}
          {keywords && keywords.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {keywords.map((keyword, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-foreground/10 text-foreground/80"
                >
                  {keyword}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
