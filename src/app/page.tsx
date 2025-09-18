// File: src/app/page.tsx
'use client';
import Image from "next/image";
import { useState, useRef } from "react";
import { gsap } from "gsap";
import GridDistortion from "../components/GridDistortion";
import ASCIIText from "../components/ASCIIText";
import CountdownTimer from "@/components/CountdownTimer";
import Dither from '../components/Dither';
import { Press_Start_2P } from "next/font/google";

const pressStart = Press_Start_2P({
    subsets: ["latin"],
    weight: "400",
});


export default function Home() {
  const [hasClicked, sethasClicked] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstScreenRef = useRef<HTMLDivElement>(null);
  const secondScreenRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setShowAnimation(true);
    setTimeout(() => {
      animateImageReveal();
    }, 50);
  };

  const animateImageReveal = () => {
    const targetElement = imageWrapperRef.current;
    if (!targetElement) return;

    const tl = gsap.timeline({
      onComplete: () => {
        fadeToSecondScreen();
      },
    });

    tl.to(buttonRef.current, { opacity: 0, duration: 0.5, ease: "power2.in" });

    tl.set(targetElement, { clipPath: "circle(0% at 50% 50%)", opacity: 1 });
    tl.to(targetElement, {
      clipPath: "circle(100% at 50% 50%)",
      duration: 2.0,
      ease: "power1.out",
    });
    tl.to(targetElement, { scale: 1.05, duration: 0.3, ease: "power2.out" });
  };

  const fadeToSecondScreen = () => {
    const tl = gsap.timeline({
      onComplete: () => sethasClicked(true),
    });

    if (firstScreenRef.current) {
      tl.to(firstScreenRef.current, { opacity: 0, duration: 1, ease: "power2.inOut" });
    }

    if (secondScreenRef.current) {
      tl.set(secondScreenRef.current, { opacity: 0, display: "flex" });
      tl.to(secondScreenRef.current, { opacity: 1, duration: 1, ease: "power2.inOut" }, "-=0.3");
    }
  };

  return (
    <main className="min-h-[100svh] relative flex items-center justify-center overflow-hidden bg-black">
      {/* First Screen */}
      {!hasClicked && (
        <div ref={firstScreenRef} className="absolute inset-0 flex items-center justify-center">
          {/* <GridDistortion
            imageSrc="/homeBg1.png"
            grid={90}
            mouse={0.1}
            strength={0.15}
            relaxation={0.9}
            className="absolute top-0 left-0 w-screen h-screen"
          /> */}
          <div className="absolute top-0 left-0 w-screen h-screen z-10">
          
          <Image
            src="/homeBg.png"
            alt="Fullscreen Background"
            fill
            className="object-fill"
            priority
          />
          
    </div>
    
          <div style={{ width: '100vw', height: '100vh', position: 'absolute', zIndex: 0 }}>
            {/* <Dither
              waveColor={[0.20, 0.25, 0.20]}
              disableAnimation={false}
              enableMouseInteraction={true}
              mouseRadius={0.3}
              colorNum={4}
              waveAmplitude={0.3}
              waveFrequency={3}
              waveSpeed={0.05}
            /> */}
          </div>
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
              <button
                ref={buttonRef}
                className="flex flex-col items-center justify-center z-20"
                onClick={handleClick}
              >
                <ASCIIText text="⏻" enableWaves={false} asciiFontSize={8} />
              </button>
            </div>
            <div className="absolute bottom-1/4 text-white text-sm md:text-lg z-20">
              <p className={`${pressStart.className} text-lg`}>Click Me</p>
            </div>

            {showAnimation && (
              <div
                ref={imageWrapperRef}
                className="absolute z-30 w-full h-full"
                style={{ opacity: 0 }}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src="/technoVit.svg"
                      alt="Techno VIT Logo"
                      fill
                      className="object-contain scale-80"
                    />
                  </div>

              </div>
            )}
          </div>
        </div>
      )}

      {/* Second Screen */}
      <div
        ref={secondScreenRef}
        className="absolute inset-0 hidden flex-col items-center justify-center"
      >
        {/* Background */}
        {/* <GridDistortion
          imageSrc="/homeBg.png"
          grid={90}
          mouse={0.1}
          strength={0.15}
          relaxation={0.9}
          className="absolute top-0 left-0 w-screen h-screen"
        /> */}

        {/* CRT Frame Container */}
        <div className="absolute top-0 left-0 w-screen h-screen z-10">
          
          <Image
            src="/homeBg.png"
            alt="Fullscreen Background"
            fill
            className="object-fill"
            priority
          />
          
    </div>
    
          {/* <div style={{ width: '100vw', height: '100vh', position: 'absolute', zIndex: 0 }}>
            <Dither
              waveColor={[0.22, 0.25, 0.22]}
              disableAnimation={false}
              enableMouseInteraction={true}
              mouseRadius={0.3}
              colorNum={4}
              waveAmplitude={0.3}
              waveFrequency={3}
              waveSpeed={0.05}
            />
          </div> */}
        <div className="relative z-10 w-[90%] max-w-6xl aspect-[4/3] flex items-center justify-center max-h-[85vh]">
          {/* CRT Frame */}
          <Image
            src="/technoVit-CRT.png"
            alt="CRT Frame"
            fill
            className="object-contain"
          />
          <Image
            src="/date.png"
            alt="CRT Frame"
            className="object-contain"
            width={1200}
            height={600}
          />

          {/* Inside CRT */}
          <div className="absolute inset-0 flex flex-col items-center justify-between px-4 py-4 md:px-8 md:py-6">
            
            {/* Top Logos */}
            <div className="flex justify-between items-center w-full">
              <div className="flex-shrink-0 max-w-[20%]">
                <Image
                  src="/vitLogoWhite.png"
                  alt="VIT Logo"
                  layout="responsive"
                  width={120}
                  height={60}
                />
              </div>
              <div className="flex-shrink-0 max-w-[30%]">
                <Image
                  src="/technoVit.svg"
                  alt="TechnoVIT Logo"
                  layout="responsive"
                  width={180}
                  height={70}
                />
              </div>
            </div>

            {/* Middle Section: Date + Countdown */}
            <div className="flex flex-col items-center pt-30">
                <CountdownTimer targetDate="2025-10-31T00:00:00" />
              </div>
            {/* Socials */}
            <div className="flex justify-center gap-[10vw] sm:gap-[20vw] flex-wrap w-full">
              <a
                href="https://www.instagram.com/technovit_25/"
                target="_blank"
                className="flex flex-col items-center"
              >
                <div className="w-23 sm:w-27 scale-150">
                  <Image
                    src="/insta.png"
                    alt="Instagram"
                    layout="responsive"
                    width={500}
                    height={500}
                    
                  />
                </div>
              </a>

              <a
                href="mailto:technovit@vit.ac.in"
                className="flex flex-col items-center"
              >
                <div className="w-30 sm:w-30 scale-170">
                  <Image
                    src="/mail.png"
                    alt="Email"
                    layout="responsive"
                    width={500}
                    height={500}
                  />
                </div>
              </a>

              <a
                href="https://www.linkedin.com/company/technovit-chennai/"
                target="_blank"
                className="flex flex-col items-center"
              >
                <div className="w-23 sm:w-27 scale-150">
                  <Image
                    src="/linkedin.png"
                    alt="LinkedIn"
                    layout="responsive"
                    width={500}
                    height={500}
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
