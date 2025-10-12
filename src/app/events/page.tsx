'use client';

import dynamic from 'next/dynamic';

// Client-side import for background
const FaultyTerminal = dynamic(() => import('@/components/FaultyTerminal'), {
    ssr: false,
});

export default function EventsPage() {
    return (
        <div className="w-full min-h-screen bg-black overflow-hidden relative">
            {/* Background effect */}
            <div className="absolute inset-0 opacity-40 pointer-events-none">
                <FaultyTerminal
                    scale={1.5}
                    gridMul={[2, 1]}
                    digitSize={1.2}
                    timeScale={0.5}
                    pause={false}
                    scanlineIntensity={0.2}
                    glitchAmount={0.8}
                    flickerAmount={0.3}
                    noiseAmp={0.8}
                    chromaticAberration={0}
                    dither={0}
                    curvature={0}
                    tint="#00ff00"
                    mouseReact={true}
                    mouseStrength={0.6}
                    pageLoadAnimation={false}
                    brightness={0.5}
                />
            </div>

            {/* Foreground content */}
            <div className="relative z-10 w-full min-h-screen flex items-center justify-between px-6 md:px-16 lg:px-24">

                {/* Left side: text */}
                <div className="flex flex-col space-y-3 text-left">
                    <h1 className="text-white font-bold text-6xl md:text-9xl lg:text-[110px] leading-none tracking-tight">
                        Events
                    </h1>
                    <p className="text-white text-xl md:text-2xl font-light">
                        @ technoVIT'25
                    </p>
                </div>

                {/* Right side: image placeholder */}
                <div
                    className="rounded-md overflow-hidden border-4 border-gray-400 shadow-2xl bg-gray-300 flex items-center justify-center flex-shrink-0"
                    style={{
                        width: '350px',
                        height: '60vh',
                    }}
                >

                </div>
            </div>
        </div>
    );
}