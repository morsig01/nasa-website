import Image from "next/image";
import { X } from "lucide-react";

interface ImageModalProps {
  src: string | null;
  title: string | null;
  onClose: () => void;
}

export function ImageModal({ src, title, onClose }: ImageModalProps) {
  if (!src) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
        {/* Window Container */}      <div className="relative z-50 bg-background/75 backdrop-blur-[2px] rounded-sm shadow-2xl w-[95vw] max-w-[1200px] h-[85vh] max-h-[800px]">
        {/* Window Title Bar */}
        <div className="flex items-center justify-between bg-muted/95 px-4 py-2 rounded-t-lg border-b border-border">
          <h3 className="font-medium text-foreground truncate max-w-[80%] md:max-w-[90%]" title={title || ""}>
            {title || "NASA Image"}
          </h3>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-muted-foreground/10 transition-colors"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>        {/* Image Container */}
        <div className="relative flex-1 h-[calc(100%-3rem)] rounded-b-lg overflow-hidden bg-muted/20">
          <Image
            src={src}
            alt={title || "NASA Image"}
            fill
            className="object-contain p-4"
            quality={100}
            priority
            sizes="800px"
          />
        </div>

        {/* Window Border Effect */}
        <div className="absolute inset-0 rounded-lg border border-border pointer-events-none" />
      </div>
    </div>
  );
}
