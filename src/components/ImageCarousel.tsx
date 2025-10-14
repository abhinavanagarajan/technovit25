import React, { useState, useEffect } from "react";

const carouselItems = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const handleCenterItemClick = () => {
    console.log(`Center item ${currentIndex + 1} clicked!`);
  };

  // The function expects an object { itemIndex: number } as its argument
  const getItemStyle = ({
    itemIndex,
  }: {
    itemIndex: number;
  }): React.CSSProperties => {
    const len = carouselItems.length;
    const centerIndex = currentIndex;
    const leftIndex = (currentIndex - 1 + len) % len;
    const rightIndex = (currentIndex + 1) % len;

    // Explicitly typing the 'style' object with React.CSSProperties
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
        transform: "translateX(0) scale(1.2)",
        zIndex: 10,
        cursor: "pointer",
      };
    } else if (itemIndex === leftIndex) {
      style = {
        ...style,
        opacity: 0.6,
        transform: "translateX(-80%) scale(0.8)",
        zIndex: 5,
      };
    } else if (itemIndex === rightIndex) {
      style = {
        ...style,
        opacity: 0.6,
        transform: "translateX(80%) scale(0.8)",
        zIndex: 5,
      };
    }

    return style;
  };

  return (
    <div
      className="relative flex items-center justify-end w-full mr-52" // Adjusted justify-center and removed margin for better alignment
      style={{ height: "70vh" }}
    >
      {carouselItems.map((color, index) => (
        <div
          key={index}
          className={`border-2 border-gray-400 shadow-xl ${color}`}
          style={{
            height: "50vh",
            width: "35vh",
            // FIX: Pass an object to the function call as expected
            ...getItemStyle({ itemIndex: index }),
          }}
          onClick={() => {
            if (index === currentIndex) {
              handleCenterItemClick();
            }
          }}
        >
          <div className="flex items-center justify-center h-full text-white text-4xl font-bold">
            {index + 1}
          </div>
        </div>
      ))}
    </div>
  );
};
export default ImageCarousel;
