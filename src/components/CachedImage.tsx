"use client";

import React, { useState, useEffect } from "react";
import { getCachedImage } from "@/app/utils/imageCache";

interface CachedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

const CachedImage: React.FC<CachedImageProps> = ({ src, ...props }) => {
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    let isMounted = true;
    let objectUrl: string | null = null;

    const loadImage = async () => {
      const cachedUrl = await getCachedImage(src);
      if (isMounted) {
        setImageSrc(cachedUrl);
        if (cachedUrl.startsWith("blob:")) {
          objectUrl = cachedUrl;
        }
      }
    };

    loadImage();

    return () => {
      isMounted = false;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [src]);

  return <img src={imageSrc} {...props} />;
};

export default CachedImage;
