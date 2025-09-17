'use client';
import Image from "next/image";
import { useState } from "react";
import PixelTrail from "../components/PixelTrail";

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
    <main className='min-h-[100svh] bg-black flex items-center justify-between p-24' style={{ backgroundImage: 'url(/homeBg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 9999,
          pointerEvents: 'none', 
        }}
      >
        <PixelTrail
          gridSize={300}
          trailSize={0.01}
          maxAge={150}
          interpolate={2.2}
          color="#f5f69f"
          gooeyFilter={{ id: "custom-goo-filter", strength: 2 }}
        />
      </div>
      <div className="w-full aspect-[330/70] m-auto relative">
        <button className="w-full aspect-video" onClick={() => sethasClicked(true)}>
          <Image src={'technoVit.svg'} alt='TechnoVit Logo' fill className='mx-auto pt-10' />
        </button>
      </div>
      </>
    </main>
  );
}
