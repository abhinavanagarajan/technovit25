'use client';
import Image from "next/image";
import { useState } from "react";
import PixelTrail from "../components/PixelTrail";
import GridDistortion from "../components/GridDistortion";

export default function Home() {
  const [hasClicked, sethasClicked] = useState(false);


  if (hasClicked) {
    return <main className="min-h-[100svh] bg-black flex-row flex items-center justify-center">
      <div className="px-[15rem] w-full grow">
        <div className="flex justify-between h-[4.375rem]">
          <div className="h-full aspect-[3/1] relative">
            <Image src='/vitLogoWhite.png' alt="vit color logo" fill />
          </div>
          <div className="h-full aspect-[3/1] relative">
            <Image src='/technoVit.svg' alt="vit color logo" fill />
          </div>
        </div>
        <h1>Techno Vit</h1>
      </div>
    </main>
  }
  return (
    <main className="min-h-[100svh] relative flex items-center justify-center">
      {/* Full-screen GridDistortion */}
      {/* <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          // zIndex: 0,          // behind content
          pointerEvents: 'none', // allow clicks through
        }}
      > */}
        <GridDistortion
          imageSrc="/homeBg.png"  // background image to distort
          grid={48}
          mouse={0.1}
          strength={0.15}
          relaxation={0.9}
          className="absolute top-0 left-0 w-screen h-screen"
        />
      {/* </div>  */}

      {/* Page content above the distortion */}
      <div className="relative z-10 w-full flex items-center justify-center">
        <button
          className="w-1/2 h-screen  relative"
          onClick={() => sethasClicked(true)}
        >
          <Image
            src={'technoVit.svg'}
            alt="TechnoVit Logo"
            fill
            className="mx-auto pt-10"
          />
        </button>
      </div>
    </main>

  );
}
