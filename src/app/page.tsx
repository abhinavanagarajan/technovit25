"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import ASCIIText from "@/components/ASCIIText";
import { Press_Start_2P } from "next/font/google";
import MainPage from "@/components/MainPage";

const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  const [hasClicked, setHasClicked] = useState(false);
  const [powerButtonFontSize, setPowerButtonFontSize] = useState(200);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const clickMeRef = useRef<HTMLDivElement>(null);
  const firstScreenRef = useRef<HTMLDivElement>(null);
  const secondScreenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setPowerButtonFontSize(window.innerWidth <= 768 ? 100 : 200);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const runTransitionAnimation = () => {
    if (
      !firstScreenRef.current ||
      !secondScreenRef.current ||
      !buttonRef.current ||
      !clickMeRef.current
    ) {
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setHasClicked(true);
      },
    });

    tl.to([buttonRef.current, clickMeRef.current], {
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
    })
      .to(
        firstScreenRef.current,
        {
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
          onComplete: () => {
            if (firstScreenRef.current) {
              firstScreenRef.current.style.display = "none";
            }
          },
        },
        "-=0.5"
      )
      .set(secondScreenRef.current, {
        display: "flex",
        opacity: 0,
      })
      .to(
        secondScreenRef.current,
        {
          opacity: 1,
          duration: 1,
          ease: "power2.inOut",
        },
        "<0.5" // Start fading in the second screen as the first one is fading out
      );
  };

  const handleClick = () => {
    if (hasClicked) return;
    runTransitionAnimation();
  };

  return (
    <main className="min-h-[100svh] relative flex bg-black">
      <div
        ref={firstScreenRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="absolute top-0 left-0 w-screen h-screen z-10">
          <Image
            src="https://cdn.a2ys.dev/images/homeBg.png"
            alt="Fullscreen Background"
            fill
            className="object-fill"
            priority
          />
        </div>
        <div className="relative z-20 w-full h-full flex flex-col items-center justify-center">
          <button
            ref={buttonRef}
            className="w-1/2 h-1/2 text-center flex items-center justify-center"
            onClick={handleClick}
          >
            <ASCIIText
              text="⏻"
              enableWaves={false}
              asciiFontSize={8}
              textFontSize={powerButtonFontSize}
            />
          </button>

          <div ref={clickMeRef} className="absolute bottom-1/4 text-white z-20">
            <p className={`${pressStart.className} text-lg`}>Click Me</p>
          </div>
        </div>
      </div>

      <div ref={secondScreenRef} className="hidden overflow-y-hidden">
        <MainPage />
      </div>
    </main>
  );
}
