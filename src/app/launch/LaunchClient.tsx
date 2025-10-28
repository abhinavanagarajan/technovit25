"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import MiniChatbot from "@/components/MiniChatbot";
import CachedImage from "@/components/CachedImage";

interface ValidateResponse {
  valid: boolean;
  reason?: string;
}

interface LaunchResponse {
  success?: boolean;
  message?: string;
  error?: string;
}

const screenVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5, ease: "easeInOut" },
};

const FirstScreen = ({
  handleLaunch,
  isLoading,
  message,
}: {
  handleLaunch: () => void;
  isLoading: boolean;
  message: string;
}) => (
  <motion.div
    key="step1"
    variants={screenVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className="flex w-full flex-col items-center justify-center text-center"
  >
    <div className="mb-12">
      <h1 className="ttFont relative pb-4 text-5xl font-bold md:text-7xl">
        technoVIT&apos;25 Launch
        <span className="absolute bottom-0 left-1/2 h-1.5 w-2/3 -translate-x-1/2 rounded-full bg-[#DC143C]" />
      </h1>
    </div>
    <button
      onClick={handleLaunch}
      disabled={isLoading}
      className="bg-[#DC143C] text-white text-2xl md:text-3xl font-bold py-5 px-16 rounded-full shadow-lg transition-all duration-300 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 hover:cursor-pointer"
    >
      {isLoading ? "Launching..." : "LAUNCH NOW"}
    </button>
    {message && (
      <p
        className={`mt-8 text-xl font-semibold md:text-2xl ${
          message.includes("SUCCESS") ? "text-green-400" : "text-red-400"
        }`}
      >
        {message}
      </p>
    )}
  </motion.div>
);

const SecondScreen = () => (
  <motion.div
    key="step2"
    variants={screenVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className="flex flex-col items-center justify-center text-center"
  >
    <h2 className="text-4xl font-bold md:text-6xl">🚀 Launch Successful!</h2>
    <p className="mt-6 text-xl text-gray-300 md:text-2xl">
      Welcome to technoVIT&apos;25.
    </p>
  </motion.div>
);

export default function LaunchClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [authStatus, setAuthStatus] = useState<
    "validating" | "authorized" | "unauthorized"
  >("validating");
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showChatbotIcon, setShowChatbotIcon] = useState(false);

  useEffect(() => {
    const urlToken = searchParams.get("token");

    if (!urlToken) {
      setAuthStatus("unauthorized");
      router.push("/");
      return;
    }

    setToken(urlToken);

    const validateToken = async () => {
      try {
        const response = await fetch("/api/validate-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: urlToken }),
        });
        const data: ValidateResponse = await response.json();
        if (response.ok && data.valid) {
          setAuthStatus("authorized");
        } else {
          console.error(
            "Token validation failed:",
            data.reason || "Unknown error"
          );
          setAuthStatus("unauthorized");
          router.push("/");
        }
      } catch (error) {
        console.error("Failed to validate token:", error);
        setAuthStatus("unauthorized");
        router.push("/");
      }
    };

    validateToken();
  }, [router, searchParams]);

  const handleLaunch = async () => {
    if (!token) {
      setMessage("Error: Token not found.");
      return;
    }
    setIsLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/trigger-launch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data: LaunchResponse = await response.json();
      if (response.ok) {
        setStep(2);
        setShowChatbotIcon(true);
      } else {
        throw new Error(data.error || "Something went wrong.");
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage(`Launch Failed: ${error.message}`);
      } else {
        setMessage("Launch Failed: An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (authStatus !== "authorized") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4 text-white">
        <p className="animate-pulse text-2xl font-semibold tracking-wider">
          Validating Access...
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-white">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <FirstScreen
            handleLaunch={handleLaunch}
            isLoading={isLoading}
            message={message}
          />
        )}
        {step === 2 && <SecondScreen />}
      </AnimatePresence>

      {showChatbotIcon && (
        <>
          {!showChatbot && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              onClick={() => setShowChatbot(true)}
              className="fixed bottom-4 right-4 z-50 h-16 w-16 cursor-pointer rounded-full bg-blue-600 p-3 shadow-lg transition-all hover:scale-110"
            >
              <CachedImage
                src="https://cdn.a2ys.dev/images/logo.png"
                alt="Chatbot Icon"
                className="h-full w-full object-contain"
              />
            </motion.button>
          )}

          <AnimatePresence>
            {showChatbot && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="fixed bottom-4 right-4 z-50"
              >
                <MiniChatbot onClose={() => setShowChatbot(false)} />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
