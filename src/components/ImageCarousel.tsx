import React, { useState, useEffect } from "react";

interface ImageCarouselProps {
  images?: string[];
  autoPlayInterval?: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ 
  images = [], 
  autoPlayInterval = 2500 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [images, autoPlayInterval]);

  const handleCenterItemClick = () => {
    console.log(`Center item ${currentIndex + 1} clicked!`);
  };

  const getItemStyle = ({
    itemIndex,
  }: {
    itemIndex: number;
  }): React.CSSProperties => {
    const len = images.length;
    const centerIndex = currentIndex;
    const leftIndex = (currentIndex - 1 + len) % len;
    const rightIndex = (currentIndex + 1) % len;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const isTablet = typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024;

    let style: React.CSSProperties = {
      transition: "all 1s ease-in-out",
      opacity: 0,
      transform: "scale(0.5)",
      zIndex: 0,
      position: "absolute",
    };

    if (itemIndex === centerIndex) {
      style = {
        ...style,
        opacity: 1,
        transform: isMobile ? "translateX(0) scale(1)" : "translateX(0) scale(1.2)",
        zIndex: 10,
        cursor: "pointer",
      };
    } else if (itemIndex === leftIndex) {
      style = {
        ...style,
        opacity: isMobile ? 0.4 : 0.6,
        transform: isMobile 
          ? "translateX(-60%) scale(0.6)" 
          : isTablet 
            ? "translateX(-70%) scale(0.7)"
            : "translateX(-80%) scale(0.8)",
        zIndex: 5,
      };
    } else if (itemIndex === rightIndex) {
      style = {
        ...style,
        opacity: isMobile ? 0.4 : 0.6,
        transform: isMobile 
          ? "translateX(60%) scale(0.6)" 
          : isTablet 
            ? "translateX(70%) scale(0.7)"
            : "translateX(80%) scale(0.8)",
        zIndex: 5,
      };
    }

    return style;
  };

  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-96">
        <p className="text-gray-500">No images provided</p>
      </div>
    );
  }

  return (
    <div
      className="relative flex items-center justify-center w-full lg:justify-end lg:mr-52 px-4 sm:px-8 md:px-12 lg:px-0"
      style={{ height: "60vh", minHeight: "300px", maxHeight: "500px" }}
    >
      {images.map((imageUrl, index) => (
        <div
          key={index}
          className="border-2 border-gray-400 shadow-xl rounded-sm overflow-hidden bg-gray-200"
          style={{
            height: "clamp(200px, 40vh, 50vh)",
            width: "clamp(150px, 30vh, 35vh)",
            ...getItemStyle({ itemIndex: index }),
          }}
          onClick={() => {
            if (index === currentIndex) {
              handleCenterItemClick();
            }
          }}
        >
          <img 
            src={imageUrl} 
            alt={`Carousel item ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};
export default ImageCarousel;
