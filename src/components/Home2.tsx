import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  Users,
  Trophy,
  Globe,
  CalendarDays,
  X,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Card, CardContent } from "./Card";
import FaultyTerminal from "./FaultyTerminal";
import { Bayon } from "next/font/google";

const bayon = Bayon({
  variable: "--font-bayon",
  subsets: ["latin"],
  weight: "400",
});

export const Home = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showVideo, setShowVideo] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const playedFlag = window.sessionStorage.getItem("techno_trailer_played");
      if (playedFlag === "1") {
        setShowVideo(false);
        return;
      }
    } catch (e) {
      console.warn(
        "sessionStorage unavailable, trailer will show every visit:",
        e
      );
    }

    if (videoRef.current && showVideo) {
      const playPromise = videoRef.current.play();

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Video autoplay failed:", error);
        });
      }
      try {
        window.sessionStorage.setItem("techno_trailer_played", "1");
      } catch {
        // ignore write errors
      }
    }
  }, [showVideo]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    const canvas = document.getElementById("matrixCanvas") as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = Math.floor(canvas.width / 20);
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * canvas.height;
    }

    const characters = "01";

    function draw() {
      if (!ctx || !canvas) return;

      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ff00";
      ctx.font = "15px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
        ctx.fillText(text, i * 20, drops[i]);

        if (drops[i] > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i] += 20;
      }
    }

    const interval = setInterval(draw, 50);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const stats = [
    { icon: Users, value: "40,000+", label: "Participants" },
    { icon: CalendarDays, value: "200+", label: "Events" },
    { icon: Trophy, value: "70+", label: "Sponsors" },
    { icon: Globe, value: "20+", label: "Countries" },
  ];

  const faqs = [
    {
      question: "What is technoVIT?",
      answer:
        "The 10th edition of VIT-Chennai's Annual International Techno-Management Fest, technoVIT’25, is the flagship technical fest of VIT-Chennai, celebrating innovation, creativity, and collaboration. Over the years, it has grown into a vibrant platform that brings together students from across India and abroad to engage in diverse events such as hackathons, coding challenges, paper presentations, robotics, and expert discussions. With wide participation and an ever-expanding scale, technoVIT continues to reflect the dynamic academic and research culture of our institution.",
    },
    {
      question: "When is technoVIT 2025?",
      answer:
        "TechnoVIT 2025 will be held from October 31, 2025, to November 2, 2025. Stay tuned for more updates!",
    },
    {
      question: "How do I register for events?",
      answer: "Coming Soon!!!!!!!",
    },
    {
      question: "What are the prizes?",
      answer:
        "Prizes vary by event, with total prize pool exceeding ₹10 lakhs. Check individual event pages for specific prize details.",
    },
  ];

  return (
    <div className="min-h-screen relative ">
      {showVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
          <video
            ref={videoRef}
            src="/trailer.mp4"
            autoPlay
            muted
            playsInline
            loop
            preload="auto"
            className="w-full h-full object-cover"
            onLoadedData={() => {
              if (videoRef.current) {
                videoRef.current.play();
              }
            }}
          />

          <div className="absolute top-6 right-6 flex gap-3">
            <button
              className="text-white bg-black/60 hover:bg-black/80 rounded-full p-3 transition-all duration-300 hover:scale-110 backdrop-blur-sm border-2 border-white/20 hover:border-[#00ff00]"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? (
                <VolumeX
                  size={28}
                  className="drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                />
              ) : (
                <Volume2
                  size={28}
                  className="drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                />
              )}
            </button>

            <button
              className="text-white bg-black/60 hover:bg-black/80 rounded-full p-3 transition-all duration-300 hover:scale-110 backdrop-blur-sm border-2 border-white/20 hover:border-[#00ff00]"
              onClick={() => setShowVideo(false)}
              aria-label="Close video"
            >
              <X
                size={28}
                className="drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
              />
            </button>
          </div>
        </div>
      )}

      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 bg-black overflow-hidden z-0">
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

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-[1]"></div>

        <div className="relative z-10 text-center max-w-6xl mx-auto -mt-12">
          {/* <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black mb-3 animate-slide-up">
            <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:drop-shadow-[0_0_40px_rgba(255,255,255,0.5)] transition-all duration-300">
              techno
            </span>
            <span className="text-[#00ff00] drop-shadow-[0_0_40px_rgba(0,255,0,0.8)] hover:drop-shadow-[0_0_60px_rgba(0,255,0,1)] transition-all duration-300 inline-block hover:scale-105">
              VIT
            </span>
            <span className="text-[#00ff00] drop-shadow-[0_0_40px_rgba(0,255,0,0.8)]">
              &apos;25
            </span>
          </h1> */}
          <img src="/technoVit.svg" alt="TechnoVIT 25 Logo" width={800} height={200}/>

          <div className="mb-4 animate-fade-in">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-[#00ff00] blur-xl opacity-20"></div>
              <h2 className="relative text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-wider uppercase bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text px-6 py-3">
                
              </h2>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 animate-slide-in">
            
            <div className="text-md sm:text-base lg:text-lg text-white font-light tracking-[0.2em] px-6">
              October 31 - November 2
            </div>
            
          </div>
        </div>
      </section>

      {/* <section className="bg-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card
                key={index}
                hover={false}
                className="text-center bg-black border-[#00ff00]/30"
              >
                <CardContent className="py-8">
                  <stat.icon className="w-12 h-12 mx-auto mb-4 text-[#00ff00]" />
                  <div className="text-2xl sm:text-4xl font-heading text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[#00ff00]/70 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      <section className="bg-black py-20">
        <div className="relative w-full min-h-screen bg-black flex">
        {/* Left Section - Green Background with Content */}
        <div className="relative w-full sm:w-4/5 bg-[#70E081] sm:flex flex-col justify-between">
            {/* Pixelated decorative elements at top */}

            <img src='pixelDecoration.png' className='right-0 bottom-0 h-1/2 absolute z-10 hidden sm:block' />
            <img src='pixelDecoration.png' className='right-0 top-0 h-1/2 absolute z-10 hidden sm:block' />

            {/* Main Content */}
            <div className="relative z-10 mt-8">
            <h1 className="text-4xl sm:text-6xl font-black mt-4 mb-16 text-white bg-black px-10 py-4" style={{ fontFamily: 'Arial Black, sans-serif' }}>
                About TechnoVIT'25
            </h1>
            <p className="text-black text-xl sm:mb-12 px-8 sm:mr-64 leading-relaxed text-justify" style={{ fontFamily: 'Arial, sans-serif' }}>
                VIT Chennai is a globally engaged, competitive, comprehensive, and research- enriched university campus strategically positioned in the capital city of Tamil Nadu, to respond to major industrial, social, economic, and environmental demands and challenges. 
            </p>

            

            <p className="text-black text-xl sm:mb-12 px-8 sm:mr-64 leading-relaxed text-justify" style={{ fontFamily: 'Arial, sans-serif' }}>
                The focus is to maximize industrial connectivity, create Centers of Excellence in niche areas of research, enrich technological and Managerial Human Capital nurtured in a multicultural ambience and create opportunities to exploit the available resources to benefit industry/society.
            </p>
            </div>

            {/* Pixelated decorative pattern - center */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-64 h-96">
            
            </div>

            {/* Pixelated decorative elements at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-8 flex">
            
            </div>
        </div>

        {/* Right Section - Image Grid */}
        <div className="md:w-1/5 bg-black sm:flex flex-col hidden">
            {/* Top Image - Speaker */}
            <div className="flex-1 relative overflow-hidden border-4 border-black">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-600 flex items-center justify-center">
                <img src='/speakerStands.png' alt='Speaker Stands' />
            </div>
            </div>

            {/* Middle Image - Award Ceremony */}
            <div className="flex-1 relative overflow-hidden border-4 border-black">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-900 to-yellow-700 flex items-center justify-center">
                <img src='/lightingLamp.png' alt='Lighting Lamp' />
            </div>
            </div>

            {/* Bottom Image - Student */}
            <div className="flex-1 relative overflow-hidden border-4 border-black">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
                <img src='/speakerStudent.png' alt='Speaker Student' />
            </div>
            </div>
        </div>
        </div>
      </section>

      <section className="bg-black py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-heading text-white mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-20 h-1 bg-[#00ff00] mx-auto"></div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-2 border-[#00ff00]/30 hover:border-[#00ff00] transition-all duration-300 bg-black"
              >
                <button
                  className="w-full px-6 py-4 flex justify-between items-center text-left"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-subheading text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`text-[#00ff00] transition-transform duration-300 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                    size={24}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-white/70 border-t border-[#00ff00]/30 pt-4 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
