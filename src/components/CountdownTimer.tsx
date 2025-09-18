"use client";
import { useEffect, useState } from "react";
import { Press_Start_2P } from "next/font/google";

const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
});

export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return timeLeft;
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!isMounted) {
    return (
      <div
        className={`text-[#DBFB81] text-[4vw] font-normal p-20vh m-20vh border-0 ${pressStart.className}`}
      >
        00d:00h:00m:00s
      </div>
    );
  }

  return (
    <div
      className={`text-[#DBFB81] text-[5vw] sm:text-[2vw] font-normal p-20vh m-20vh border-0 ${pressStart.className}`}
    >
      {String(timeLeft.days).padStart(2, "0")}d:
      {String(timeLeft.hours).padStart(2, "0")}h:
      {String(timeLeft.minutes).padStart(2, "0")}m:
      {String(timeLeft.seconds).padStart(2, "0")}s
    </div>
  );
}
