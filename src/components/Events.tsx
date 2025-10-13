import EventsList from "./EventsList";
import EventFilter from "./Filters";
import FaultyTerminal from "./FaultyTerminal";
import ImageCarousel from "./ImageCarousel";

const Events = () => {
  return (
    <div>
      <div className="w-full h-screen bg-black overflow-hidden relative">
        <div className="absolute inset-0 opacity-40 pointer-events-none">
            <FaultyTerminal scale={3}
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
            brightness={0.5} />
        </div>

        <div className="relative z-10 w-full min-h-screen flex items-center justify-around px-6 md:px-16 lg:px-24">
          
          <div className="flex flex-col space-y-3 text-left">
            <h1 className="text-white font-bold text-6xl md:text-9xl lg:text-[110px] leading-none tracking-tight">
              Events
            </h1>
            <p className="text-white text-xl md:text-2xl font-light">
              @ technoVIT&apos;25
            </p>
          </div>

          <ImageCarousel />

        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="w-2/5 bg-[#70E081]">
          <EventFilter />
        </div>

        <div className="flex-1 overflow-y-auto">
          <EventsList />
        </div>
      </div>
    </div>
  );
};

export default Events;