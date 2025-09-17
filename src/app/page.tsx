//File: src/app/page.tsx




// 'use client';
// import Image from "next/image";
// import { useState, useRef, useEffect } from "react";
// import { gsap } from "gsap";
// import PixelTrail from "../components/PixelTrail";
// import GridDistortion from "../components/GridDistortion";
// import ASCIIText from "../components/ASCIIText";
// import CountdownTimer from "@/components/CountdownTimer";


// export default function Home() {
//   const [hasClicked, sethasClicked] = useState(false);
//   const [showAnimation, setShowAnimation] = useState(false);
//   // textRef will now point to the div directly wrapping the Image
//   const imageWrapperRef = useRef(null); 
//   const buttonRef = useRef(null);

//   const handleClick = () => {
//     console.log("Button clicked!"); // Debug log
//     setShowAnimation(true);
//     // Small delay to ensure the element is rendered before animating
//     setTimeout(() => {
//       animateImageReveal();
//     }, 50);
//   };

//   const animateImageReveal = () => {
//     const targetElement = imageWrapperRef.current; // The div around the image
//     if (!targetElement) return;

//     // Create timeline for smooth sequential animation
//     const tl = gsap.timeline({
//       onComplete: () => {
//         console.log("Animation complete! Transitioning to next screen.");
//         sethasClicked(true);
//       }
//     });

//     // Animate button fade out first
//     tl.to(buttonRef.current, {
//       opacity: 0,
//       duration: 0.5,
//       ease: "power2.in"
//     });

//     // Set initial mask to reveal from center (circular mask starting small)
//     // and make it visible.
//     tl.set(targetElement, {
//       clipPath: "circle(0% at 50% 50%)",
//       opacity: 1 // Ensure the element is visible to animate
//     }, "-=0.2");

//     // Animate mask to reveal the entire image from center outward
//     tl.to(targetElement, {
//       clipPath: "circle(100% at 50% 50%)",
//       duration: 2.0,
//       ease: "power1.out"
//     });

//     // Optional: Add a subtle pulse effect at the end of the image itself
//     // Note: Applying scale here will scale the clipped image, which is usually desired.
//     tl.to(targetElement, {
//       scale: 1.05,
//       duration: 0.3,
//       ease: "power2.out"
//     })
//   };

//   // if (hasClicked) {
//   //   return (
//   //     <main className="min-h-[100svh] bg-black flex-row flex items-center justify-center">
//   //       <div className="px-[15rem] w-full grow">
//   //         <div className="flex justify-between h-[4.375rem]">
//   //           <div className="h-full aspect-[3/1] relative">
//   //             <Image src='/vitLogoWhite.png' alt="vit color logo" fill />
//   //           </div>
//   //           <div className="h-full aspect-[3/1] relative">
//   //             <Image src='/technoVit.svg' alt="vit color logo" fill />
//   //           </div>
//   //         </div>
//   //       </div>
//   //     </main>
//   //   );
//   // }



//   if (hasClicked) {
//     return (
//       <main className="min-h-[100svh] bg-black flex flex-col items-center justify-center">
//         <div className="w-full max-w-5xl bg-[#0a0a0a] rounded-2xl shadow-2xl border-4 border-green-900 p-8 text-center">

//           {/* Top Logos */}
//           <div className="flex justify-between items-center mb-8">
//             <Image src="/vitLogoWhite.png" alt="VIT Logo" width={120} height={60} />
//             <Image src="/technoVit.svg" alt="TechnoVIT Logo" width={160} height={60} />
//           </div>

//           {/* Title */}
//           <h1 className="text-5xl font-bold text-green-400 mb-4">TechnoVIT’25</h1>
//           <p className="text-2xl text-green-300 mb-10">Oct 31 – Nov 2</p>

//           {/* Countdown Timer */}
//           <CountdownTimer targetDate="2025-10-31T00:00:00" />

//           {/* Social Icons */}
//           <div className="flex justify-center gap-12 mt-12 text-green-300 text-lg">
//             <span>@technovit</span>
//             <span>@technovit</span>
//             <span>@technovit</span>
//             <span>@technovit</span>
//           </div>
//         </div>
//       </main>
//     );
//   }



//   return (
//     <main className="min-h-[100svh] relative flex items-center justify-center">
//       <GridDistortion
//         imageSrc="/homeBg.png"
//         grid={90}
//         mouse={0.1}
//         strength={0.15}
//         relaxation={0.9}
//         className="absolute top-0 left-0 w-screen h-screen"
//       />

//       <div className="relative z-10 w-full h-full flex items-center justify-center">
//         <button
//           ref={buttonRef}
//           className="w-1/2 h-screen text-center flex items-center justify-center relative z-20"
//           onClick={handleClick}
//         >
//           <ASCIIText
//             text='⏻'
//             enableWaves={false}
//             asciiFontSize={8}
//           />
//         </button>

//         {showAnimation && (
//           // This div now directly wraps the Image and will be animated
//           <div 
//             ref={imageWrapperRef} 
//             className="absolute z-30 w-full h-full" 
//             style={{ opacity: 0 }}
//           >
//             <Image 
//               src="/technoVit-CRT.png" 
//               alt="Techno VIT Logo" 
//               fill
//               className="w-full h-full object-contain" // Image fills its wrapper
//             />
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }



// app/page.tsx
// File: src/app/page.tsx

'use client';
import Image from "next/image";
import { useState, useRef } from "react";
import { gsap } from "gsap";
import GridDistortion from "../components/GridDistortion";
import ASCIIText from "../components/ASCIIText";
import CountdownTimer from "@/components/CountdownTimer";

export default function Home() {
  const [hasClicked, sethasClicked] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const imageWrapperRef = useRef(null);
  const buttonRef = useRef(null);

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
      onComplete: () => sethasClicked(true),
    });

    tl.to(buttonRef.current, { opacity: 0, duration: 0.5, ease: "power2.in" });
    tl.set(targetElement, {
      clipPath: "circle(0% at 50% 50%)",
      opacity: 1,
    });
    tl.to(targetElement, {
      clipPath: "circle(100% at 50% 50%)",
      duration: 2.0,
      ease: "power1.out",
    });
    tl.to(targetElement, { scale: 1.05, duration: 0.3, ease: "power2.out" });
  };
  // After click screen
  if (hasClicked) {
    return (
      <main className="min-h-[100svh] relative flex items-center justify-center">
        {/* Background */}
        <GridDistortion
          imageSrc="/homeBg.png"
          grid={90}
          mouse={0.1}
          strength={0.15}
          relaxation={0.9}
          className="absolute top-0 left-0 w-screen h-screen"
        />

        {/* CRT Frame */}
        <div className="relative z-10 w-[90%] max-w-4xl aspect-[4/3] flex items-center justify-center">
          <Image
            src="/technoVit-CRT.png"
            alt="CRT Frame"
            fill
            className="object-contain"
          />

          {/* Content inside CRT */}
          <div className="absolute inset-0 flex flex-col items-center text-center px-6 py-10 justify-between">

            {/* Logos row */}
            <div className="flex justify-between items-center w-full max-w-[80%]">
              <Image src="/vitLogoWhite.png" alt="VIT Logo" width={120} height={60} />
              <Image src="/technoVit.svg" alt="TechnoVIT Logo" width={180} height={70} />
            </div>

            {/* Middle Section */}
            <div className="flex flex-col items-center gap-4">
              {/* Title */}
              {/* (Place title here if needed) */}

              {/* Dates */}
              <Image
                src="/date.png"
                alt="Event Dates"
                className="w-[95%] max-w-2xl mb-4"
                width={1200}
                height={400}
              />


              {/* Countdown */}
              <div className="-mt-70">
                <CountdownTimer targetDate="2025-10-31T00:00:00" />
              </div>
            </div>

            {/* Social icons row */}
            <div className="flex justify-center gap-12">
              <a href="https://www.linkedin.com/company/technovit-chennai/" target="_blank">
                <Image src="/linkedin.png" alt="LinkedIn" width={100} height={100} />
              </a>
              <a href="https://www.instagram.com/technovit_25/" target="_blank">
                <Image src="/insta.png" alt="Instagram" width={55} height={55} />
              </a>
              <a href="mailto:technovit@vit.ac.in">
                <Image src="/mail.png" alt="Email" width={55} height={55} />
              </a>
              <a href="https://twitter.com" target="_blank">
                <Image src="/twitter.png" alt="Twitter" width={55} height={55} />
              </a>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Before click screen
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
          <ASCIIText text="⏻" enableWaves={false} asciiFontSize={8} />
        </button>

        {showAnimation && (
          <div
            ref={imageWrapperRef}
            className="absolute z-30 w-full h-full"
            style={{ opacity: 0 }}
          >
            <Image
              src="/technoVit-CRT.png"
              alt="Techno VIT Logo"
              fill
              className="w-full h-full object-contain"
            />
          </div>
        )}
      </div>
    </main>
  );
}
