"use client";

interface SponsorImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const SponsorImage = ({ src, alt, className }: SponsorImageProps) => {
  return (
    <div className={`relative ${className}`}>
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-contain"
        loading="lazy"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = src.replace(
            "https://cdn.a2ys.dev",
            "https://saving-vit.vercel.app"
          );
        }}
      />
    </div>
  );
};
