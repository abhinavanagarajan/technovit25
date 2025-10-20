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
import { motion } from "framer-motion";

export const Home = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showVideo, setShowVideo] = useState(false);
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
    { icon: Users, value: "25,000+", label: "Participants" },
    { icon: CalendarDays, value: "150+", label: "Events" },
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
        "technoVIT 2025 will be held from October 31, 2025, to November 2, 2025. Stay tuned for more updates!",
    },
    {
      question: "How do I register for events?",
      answer: (
        <>
          Visit{" "}
          <a
            href="https://chennaievents.vit.ac.in/technovit/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline hover:text-blue-700"
          >
            chennaievents.vit.ac.in/technovit/
          </a>{" "}
          to register!
        </>
      ),
    },
    {
      question: "What are the prizes?",
      answer:
        "Prizes vary by event, with total prize pool exceeding ₹10 lakhs. Check individual event pages for specific prize details.",
    },
  ];

  const carouselImages = [
    {
      src: "https://cdn.a2ys.dev/images/studentDriving.jpeg",
      alt: "Automotive",
    },
    {
      src: "https://cdn.a2ys.dev/images/diverseCampus.jpeg",
      alt: "Campus Event",
    },
    {
      src: "https://cdn.a2ys.dev/images/carDrift.png",
      alt: "Car Drift",
    },
    {
      src: "https://cdn.a2ys.dev/images/IMG_3848.JPG",
      alt: "technoVIT alt",
    },
    {
      src: "https://cdn.a2ys.dev/images/WhatsApp%20Image%202025-10-19%20at%2021.46.43_6a220941.jpg",
      alt: "technoVIT alt",
    },
    {
      src: "https://cdn.a2ys.dev/images/IMG_3817.JPG",
      alt: "technoVIT alt",
    },
    {
      src: "https://cdn.a2ys.dev/images/IMG_5231.JPG",
      alt: "technoVIT alt",
    },
    {
      src: "https://cdn.a2ys.dev/images/WhatsApp%20Image%202025-10-19%20at%2021.56.34_d8f72fb8.jpg",
      alt: "technoVIT alt",
    },
    {
      src: "https://cdn.a2ys.dev/images/IMG_5307.JPG",
      alt: "technoVIT alt",
    },
    {
      src: "https://cdn.a2ys.dev/images/IMG_5346.JPG",
      alt: "technoVIT alt",
    },
  ];

  return (
    <div className="min-h-screen relative">
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
          <canvas id="matrixCanvas" className="w-full h-full"></canvas>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-[1]"></div>

        <div className="relative z-10 text-center max-w-6xl mx-auto -mt-12">
          <h2 className="text-sm sm:text-base text-right lg:text-xl text-white tracking-[0.2em] uppercase mb-2 animate-fade-in font-black">
            High on Tech
          </h2>
          <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black mb-3 animate-slide-up">
            <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:drop-shadow-[0_0_40px_rgba(255,255,255,0.5)] transition-all duration-300">
              techno
            </span>
            <span className="text-[#00ff00] drop-shadow-[0_0_40px_rgba(0,255,0,0.8)] hover:drop-shadow-[0_0_60px_rgba(0,255,0,1)] transition-all duration-300 inline-block">
              VIT
            </span>
            <span className="text-[#00ff00] drop-shadow-[0_0_40px_rgba(0,255,0,0.8)]">
              &apos;25
            </span>
          </h1>

          <div className="mb-4 animate-fade-in">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-[#00ff00] blur-xl opacity-20"></div>
              <h2 className="relative text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-wider uppercase bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text px-6 py-3">
                <span className="drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
                  HEALING WITH INTELLIGENCE
                </span>
              </h2>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 animate-slide-in">
            <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#00ff00]"></div>
            <div className="text-sm sm:text-base lg:text-lg text-white font-light tracking-[0.2em] uppercase backdrop-blur-sm bg-black/30 px-6 py-3 border border-[#00ff00]/30 shadow-[0_0_30px_rgba(0,255,0,0.2)]">
              October 31 - November 2
            </div>
            <div className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#00ff00]"></div>
          </div>
        </div>

        <div className="relative z-10 mt-12">
          <motion.button
            onClick={() => (window.location.href = "/events")}
            className="bg-[#00ff00] px-8 py-3 uppercase text-black font-bold hover:bg-[#00ff00]/90 transition-colors duration-300"
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Explore more
          </motion.button>
        </div>
      </section>

      <section className="bg-black py-20">
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
      </section>

      <section className="bg-black py-20">
        <div className="relative w-full min-h-screen bg-black flex">
          {/* Left Section - Green Background with Content */}
          <div className="relative w-full sm:w-4/5 bg-[#70E081] sm:flex flex-col justify-between">
            {/* Pixelated decorative elements at top */}

            <img
              src="https://cdn.a2ys.dev/images/pixelDecoration.png"
              className="right-0 bottom-0 h-1/2 absolute z-10 hidden sm:block"
            />
            <img
              src="https://cdn.a2ys.dev/images/pixelDecoration.png"
              className="right-0 top-0 h-1/2 absolute z-10 hidden sm:block"
            />

            {/* Main Content */}
            <div className="relative z-10 mt-8">
              <h1 className="text-4xl sm:text-6xl font-black mt-4 mb-16 text-white bg-black px-10 py-4">
                About technoVIT&apos;25
              </h1>
              <p className="text-black text-xl mb-8 sm:mb-12 px-8 sm:mr-64 leading-relaxed text-justify">
                Established in 2010, VIT Chennai has become a leading center of
                excellence in higher education under the visionary leadership of
                Dr. G. V. Selvam, its founder and Vice President. Guided by
                leaders like Dr. V. S. Kanchana Bhaaskaran, Dr. T. Thyagarajan,
                and Dr. P. K. Manoharan, the institution excels in innovation,
                research, and transformative learning. Strategically located in
                Chennai, it promotes application-based education, addressing
                industrial and societal needs while producing industry-ready
                professionals. With a vibrant, multicultural campus and strong
                global collaborations, VIT Chennai fosters intellectual
                exchange, social responsibility, and technological advancement,
                redefining higher education in India and beyond.
              </p>

              <p className="text-black text-xl mb-8 sm:mb-12 px-8 sm:mr-64 leading-relaxed text-justify">
                <b>technoVIT</b> is VIT Chennai&apos;s flagship technical
                festival, where visionary technical clubs converge to push the
                boundaries of innovation and creativity. Over three days, it
                hosts hackathons, robotics battles, workshops, exhibitions and
                keynote talks, drawing over 25,000 participants including
                students from more than 20 countries. technoVIT transforms the
                campus into a hub of interdisciplinary collaboration, fostering
                ideas that transcend conventional limits.
              </p>
            </div>

            {/* Pixelated decorative pattern - center */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-64 h-96"></div>

            {/* Pixelated decorative elements at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-8 flex"></div>
          </div>

          <div className="md:w-1/5 bg-black hidden sm:flex relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full h-[200%] flex flex-col"
              animate={{
                y: ["0%", "-50%"],
              }}
              transition={{
                ease: "linear",
                duration: 10,
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              {[...carouselImages, ...carouselImages].map((image, index) => (
                <div
                  key={index}
                  className="w-full relative border-4 border-black box-border"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </motion.div>
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
