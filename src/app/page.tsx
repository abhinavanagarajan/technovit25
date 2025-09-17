'use client';
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import PixelTrail from "../components/PixelTrail";
import GridDistortion from "../components/GridDistortion";
import ASCIIText from "../components/ASCIIText";

export default function Home() {
  const [hasClicked, sethasClicked] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  // textRef will now point to the div directly wrapping the Image
  const imageWrapperRef = useRef(null); 
  const buttonRef = useRef(null);

  const handleClick = () => {
    console.log("Button clicked!"); // Debug log
    setShowAnimation(true);
    // Small delay to ensure the element is rendered before animating
    setTimeout(() => {
      animateImageReveal();
    }, 50);
  };

  const animateImageReveal = () => {
    const targetElement = imageWrapperRef.current; // The div around the image
    if (!targetElement) return;

    // Create timeline for smooth sequential animation
    const tl = gsap.timeline({
      onComplete: () => {
        console.log("Animation complete! Transitioning to next screen.");
        sethasClicked(true);
      }
    });

    // Animate button fade out first
    tl.to(buttonRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.in"
    });

    // Set initial mask to reveal from center (circular mask starting small)
    // and make it visible.
    tl.set(targetElement, {
      clipPath: "circle(0% at 50% 50%)",
      opacity: 1 // Ensure the element is visible to animate
    }, "-=0.2");

    // Animate mask to reveal the entire image from center outward
    tl.to(targetElement, {
      clipPath: "circle(100% at 50% 50%)",
      duration: 2.0,
      ease: "power1.out"
    });
    
    // Optional: Add a subtle pulse effect at the end of the image itself
    // Note: Applying scale here will scale the clipped image, which is usually desired.
    tl.to(targetElement, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out"
    })
  };

  if (hasClicked) {
    return (
      <main className="min-h-[100svh] bg-black flex-row flex items-center justify-center">
        <div className="px-[15rem] w-full grow">
          <div className="flex justify-between h-[4.375rem]">
            <div className="h-full aspect-[3/1] relative">
              <Image src='/vitLogoWhite.png' alt="vit color logo" fill />
            </div>
            <div className="h-full aspect-[3/1] relative">
              <Image src='/technoVit.svg' alt="vit color logo" fill />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[100svh] relative flex items-center justify-center">
      <GridDistortion
        imageSrc="/homeBg.png"
        grid={90}
        mouse={0.1}
        strength={0.15}
        relaxation={0.9}
        className="absolute top-0 left-0 w-screen h-screen"
      />

      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <button
          ref={buttonRef}
          className="w-1/2 h-screen text-center flex items-center justify-center relative z-20"
          onClick={handleClick}
        >
          <ASCIIText
            text='⏻'
            enableWaves={false}
            asciiFontSize={8}
          />
        </button>

        {showAnimation && (
          // This div now directly wraps the Image and will be animated
          <div 
            ref={imageWrapperRef} 
            className="absolute z-30 w-full h-full" 
            style={{ opacity: 0 }}
          >
            <Image 
              src="/technoVit-CRT.png" 
              alt="Techno VIT Logo" 
              fill
              className="w-full h-full object-contain" // Image fills its wrapper
            />
          </div>
        )}
      </div>
    </main>
  );
}