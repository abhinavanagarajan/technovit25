"use client";

import React, { useState, useEffect } from "react";

interface TshirtData {
  front: string;
  back: string;
}

const MerchPage: React.FC = () => {
  const [tshirts, setTshirts] = useState<TshirtData>({ front: "", back: "" });
  const accentColor = "#70E081";

  useEffect(() => {
    const storageKey = "technovitMerchData";
    const oneDayInMs = 24 * 60 * 60 * 1000;

    const cachedDataJSON = localStorage.getItem(storageKey);

    if (cachedDataJSON) {
      const { data, timestamp } = JSON.parse(cachedDataJSON);
      const isExpired = new Date().getTime() - timestamp > oneDayInMs;

      if (!isExpired) {
        setTshirts(data);
        return;
      }
    }

    const freshData: TshirtData = {
      front: "https://cdn.a2ys.dev/images/tshirt-front.png",
      back: "https://cdn.a2ys.dev/images/tshirt-back.png",
    };

    const dataToCache = {
      data: freshData,
      timestamp: new Date().getTime(),
    };

    localStorage.setItem(storageKey, JSON.stringify(dataToCache));
    setTshirts(freshData);
  }, []);

  if (!tshirts.front) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white">
        Loading Merch...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-white p-4 sm:p-8">
      <div className="text-center mb-12 md:mb-16">
        <h1 className="ttFont relative text-5xl md:text-7xl font-bold pb-4">
          technoVIT&apos;25 Merch
          <span
            className="absolute bottom-0 left-1/2 h-1.5 w-2/3 -translate-x-1/2 rounded-full"
            style={{ backgroundColor: accentColor }}
          />
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-8 md:gap-12 mb-12 md:mb-16">
        <div className="group overflow-hidden rounded-xl bg-gray-800 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 w-96 h-96">
          <img
            src={tshirts.front}
            alt="Front of the t-shirt"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="group overflow-hidden rounded-xl bg-gray-800 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 w-96 h-96">
          <img
            src={tshirts.back}
            alt="Back of the t-shirt"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>

      <a
        href="https://chennaievents.vit.ac.in/technovit/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-lg font-bold text-gray-900 py-4 px-16 rounded-full"
        style={{ backgroundColor: accentColor }}
      >
        Buy Now
      </a>
    </div>
  );
};

export default MerchPage;
