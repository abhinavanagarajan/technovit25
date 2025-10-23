"use client";

import Image from "next/image";

interface SponsorImageProps {
  src: string;
  alt: string;
}

export const SponsorImage = ({ src, alt }: SponsorImageProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-contain rounded-sm"
      onError={(e) => {
        e.currentTarget.src = src.replace(
          "https://cdn.a2ys.dev",
          "https://saving-vit.vercel.app"
        );
      }}
    />
  );
};
