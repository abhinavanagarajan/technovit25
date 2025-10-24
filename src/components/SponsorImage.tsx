"use client";

import Image from "next/image";

interface SponsorImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const SponsorImage = ({ src, alt, className }: SponsorImageProps) => {
  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain"
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
