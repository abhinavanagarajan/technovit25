"use client";

import { Be_Vietnam_Pro, Press_Start_2P } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import ASCIIText from "@/components/ASCIIText";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
});

const INTRO_STORAGE_KEY = "technovit_intro_seen";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [hasClicked, setHasClicked] = useState(false);
  const [isSessionChecked, setIsSessionChecked] = useState(false);
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

  useEffect(() => {
    if (sessionStorage.getItem(INTRO_STORAGE_KEY) === "true") {
      setHasClicked(true);
    }
    setIsSessionChecked(true);
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
        sessionStorage.setItem(INTRO_STORAGE_KEY, "true");
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
        "<0.5"
      );
  };

  const handleClick = () => {
    if (hasClicked) return;
    runTransitionAnimation();
  };

  return (
    <html lang="en">
      <body
        className={`${beVietnam.className} antialiased bg-black relative min-h-[100svh]`}
      >
        {!isSessionChecked ? (
          <div className="min-h-[100svh] relative flex bg-black" />
        ) : (
          <>
            <div
              ref={firstScreenRef}
              className="absolute inset-0 flex items-center justify-center z-50 bg-black"
              style={{ display: hasClicked ? "none" : "flex" }}
            >
              <div className="absolute top-0 left-0 w-screen h-screen z-10">
                <img
                  src="https://cdn.a2ys.dev/images/homeBg.png"
                  onError={(event) => {
                    event.currentTarget.src =
                      "https://saving-vit.vercel.app/images/homeBg.png";
                  }}
                  alt="Fullscreen Background"
                  className="w-full h-full object-fill"
                  loading="eager"
                  fetchPriority="high"
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
                <div
                  ref={clickMeRef}
                  className="absolute bottom-1/4 text-white z-20"
                >
                  <p className={`${pressStart.className} text-lg`}>Click Me</p>
                </div>
              </div>
            </div>

            <div
              ref={secondScreenRef}
              className="flex flex-col min-h-screen w-full"
              style={{
                display: hasClicked ? "flex" : "none",
                opacity: hasClicked ? 1 : 0,
              }}
            >
              <Navigation />
              <main className="flex-1">
                {children}
                <ScrollToTop />
              </main>
              <Footer />
            </div>
          </>
        )}
        <Analytics />
      </body>
    </html>
  );
}
