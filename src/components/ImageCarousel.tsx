import React, { useState, useEffect, useMemo } from "react";

interface ImageCarouselProps {
  images?: string[];
  autoPlayInterval?: number;
}

const getWindowWidth = () => {
  return typeof window !== "undefined" ? window.innerWidth : 0;
};

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images = [],
  autoPlayInterval = 2500,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(getWindowWidth());

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const deviceType = useMemo(() => {
    if (windowWidth < 768) return "mobile";
    if (windowWidth >= 768 && windowWidth < 1024) return "tablet";
    return "desktop";
  }, [windowWidth]);

  useEffect(() => {
    if (!images || images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [images, autoPlayInterval]);

  const handleCenterItemClick = () => {
    window.open(
      "https://chennaievents.vit.ac.in/technovit/",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const getItemStyle = (itemIndex: number): React.CSSProperties => {
    const len = images.length;
    const centerIndex = currentIndex;
    const leftIndex = (currentIndex - 1 + len) % len;
    const rightIndex = (currentIndex + 1) % len;

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
        transform:
          deviceType === "mobile"
            ? "translateX(0) scale(1)"
            : "translateX(0) scale(1.2)",
        zIndex: 10,
        cursor: "pointer",
      };
    } else if (itemIndex === leftIndex) {
      style = {
        ...style,
        opacity: deviceType === "mobile" ? 0.4 : 0.6,
        transform:
          deviceType === "mobile"
            ? "translateX(-60%) scale(0.6)"
            : deviceType === "tablet"
            ? "translateX(-70%) scale(0.7)"
            : "translateX(-80%) scale(0.8)",
        zIndex: 5,
      };
    } else if (itemIndex === rightIndex) {
      style = {
        ...style,
        opacity: deviceType === "mobile" ? 0.4 : 0.6,
        transform:
          deviceType === "mobile"
            ? "translateX(60%) scale(0.6)"
            : deviceType === "tablet"
            ? "translateX(70%) scale(0.7)"
            : "translateX(80%) scale(0.8)",
        zIndex: 5,
      };
    }

    return style;
  };

  if (!images || images.length === 0) {
    return <div className="flex items-center justify-center w-full h-96"></div>;
  }

  return (
    <div
      className="relative flex items-center justify-center w-full lg:justify-end lg:mr-52 px-4 sm:px-8 md:px-12 lg:px-0"
      style={{ height: "60vh", minHeight: "300px", maxHeight: "500px" }}
    >
      {images.map((imageUrl, index) => (
        <div
          key={index}
          className="border-0 border-gray-400 shadow-xl overflow-hidden bg-gray-200"
          style={{
            height: "clamp(200px, 40vh, 50vh)",
            width: "clamp(150px, 30vh, 35vh)",
            ...getItemStyle(index),
          }}
          onClick={() => {
            if (index === currentIndex) {
              handleCenterItemClick();
            }
          }}
        >
          <img
            src={imageUrl || "https://cdn.a2ys.dev/images/defaultPoster.png"}
            alt={`Carousel item ${index + 1}`}
            className="w-full h-full object-fill border border-white"
            onError={(e) => {
              e.currentTarget.src = imageUrl.replace(
                "https://cdn.a2ys.dev",
                "https://saving-vit.vercel.app"
              );
            }}
          />
        </div>
      ))}
    </div>
  );
};
export default React.memo(ImageCarousel);
