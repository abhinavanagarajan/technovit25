// src/components/CountdownTimer.tsx
"use client";
import { useEffect, useState } from "react";
import { Press_Start_2P } from "next/font/google";

const pressStart = Press_Start_2P({
    subsets: ["latin"],
    weight: "400",
});



export default function CountdownTimer({ targetDate }: { targetDate: string }) {
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

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div
            className={`text-[#DBFB81] text-[4vw] font-normal p-20vh m-20vh border-0  ${pressStart.className}`}
        >
            {String(timeLeft.days).padStart(2, "0")}d:
            {String(timeLeft.hours).padStart(2, "0")}h:
            {String(timeLeft.minutes).padStart(2, "0")}m:
            {String(timeLeft.seconds).padStart(2, "0")}s
        </div>
    );
}
