"use client";

import Image from "next/image";

interface MemberImageProps {
  src: string;
  alt: string;
}

export const MemberImage = ({ src, alt }: MemberImageProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={400}
      height={400}
      className="w-full h-64 object-contain transition-transform duration-300 group-hover:scale-110"
      onError={(e) => {
        e.currentTarget.src = src.replace(
          "https://cdn.a2ys.dev",
          "https://saving-vit.vercel.app"
        );
      }}
    />
  );
};
