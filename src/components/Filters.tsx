import { Bayon } from "next/font/google";
import React, { useState, useEffect } from "react";

type FilterState = {
  eventType: string[];
  priceRange: number[];
  dates: string[];
  teamSize: string[];
};

type EventFilterProps = {
  onFilterChange?: (filters: FilterState) => void;
  availableDates: string[];
};

type FilterSectionProps = {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
};

type FilterButtonProps = {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
};

const bayon = Bayon({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-bayon",
});

type SectionName = "eventType" | "priceRange" | "date" | "teamSize";

const FilterButton = ({ children, selected, onClick }: FilterButtonProps) => (
  <button
    onClick={onClick}
    className={`
      px-4 py-2 border-2 border-black uppercase cursor-pointer
      text-lg
      ${selected ? "bg-black text-[#42E25A]" : "bg-[#42E25A] text-black"}
      ${bayon.className}
    `}
  >
    {children}
  </button>
);

const FilterSection = ({
  title,
  children,
  isOpen,
  onToggle,
}: FilterSectionProps) => (
  <div>
    <button
      onClick={onToggle}
      className={`
        w-full p-4 bg-[#42E25A] border-t-2 border-black
        flex justify-between items-center cursor-pointer
        ${bayon.className} text-xl
      `}
    >
      <span className="uppercase text-black">{title}</span>
      <span
        className={`
          text-xl text-black transform transition-transform duration-300
          ${isOpen ? "rotate-180" : "rotate-0"}
        `}
      >
        <svg
          width="24"
          height="15"
          viewBox="0 0 34 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.3731 19.4964C18.71 20.1587 17.8112 20.5307 16.874 20.5307C15.9368 20.5307 15.038 20.1587 14.3749 19.4964L1.03531 6.16158C0.37219 5.49815 -0.000220974 4.59846 9.83694e-08 3.66045C0.000221171 2.72244 0.373056 1.82294 1.03649 1.15982C1.69992 0.496703 2.5996 0.124291 3.53761 0.124512C4.47562 0.124733 5.37512 0.497569 6.03824 1.161L16.874 11.9968L27.7098 1.161C28.3764 0.51648 29.2696 0.159597 30.1969 0.167214C31.1241 0.174831 32.0113 0.54634 32.6673 1.20172C33.3233 1.85711 33.6956 2.74393 33.7041 3.67118C33.7126 4.59844 33.3566 5.49193 32.7127 6.15922L19.3755 19.4988L19.3731 19.4964Z"
            fill="black"
          />
        </svg>
      </span>
    </button>
    {isOpen && <div className="p-4 bg-[#70E081]">{children}</div>}
  </div>
);

const EventFilter = ({ onFilterChange, availableDates }: EventFilterProps) => {
  const [openSections, setOpenSections] = useState({
    eventType: true,
    priceRange: true,
    date: true,
    teamSize: true,
  });

  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);
  const [selectedTeamSizes, setSelectedTeamSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  useEffect(() => {
    const filters: FilterState = {
      eventType: selectedEventTypes,
      priceRange: priceRange,
      dates: selectedDates,
      teamSize: selectedTeamSizes,
    };
    if (onFilterChange) {
      onFilterChange(filters);
    }
  }, [
    selectedEventTypes,
    priceRange,
    selectedDates,
    selectedTeamSizes,
    onFilterChange,
  ]);

  const toggleSection = (section: SectionName) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleEventType = (type: string) => {
    setSelectedEventTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleTeamSize = (size: string) => {
    setSelectedTeamSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleDate = (date: string) => {
    setSelectedDates((prev) =>
      prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date]
    );
  };

  const clearFilters = () => {
    setSelectedEventTypes([]);
    setSelectedTeamSizes([]);
    setPriceRange([0, 1000]);
    setSelectedDates([]);
  };

  const eventTypes: string[] = [
    "GAME",
    "ENTERTAINMENT",
    "HACKATHON",
    "COMPETITION",
    "WORKSHOP",
  ];
  const teamSizes: string[] = ["SOLO", "DUO", "TRIO", "SQUAD", "5+ MEMBERS"];

  return (
    <div className="w-full bg-[#70E081]">
      <div className="p-4 bg-black flex justify-between items-center border-b-2 border-black">
        <div className="flex items-center gap-2">
          <h2 className="m-0 text-white text-xl uppercase">FILTERS</h2>
        </div>
        <button
          className="bg-transparent border-none text-[#FF4500] text-sm uppercase cursor-pointer"
          onClick={clearFilters}
        >
          CLEAR
        </button>
      </div>

      <FilterSection
        title="EVENT TYPE"
        isOpen={openSections.eventType}
        onToggle={() => toggleSection("eventType")}
      >
        <div className="grid grid-cols-2 gap-2">
          {eventTypes.map((type) => (
            <FilterButton
              key={type}
              selected={selectedEventTypes.includes(type)}
              onClick={() => toggleEventType(type)}
            >
              {type}
            </FilterButton>
          ))}
        </div>
      </FilterSection>

      <FilterSection
        title="PRICE RANGE"
        isOpen={openSections.priceRange}
        onToggle={() => toggleSection("priceRange")}
      >
        <div>
          <div className="relative py-4">
            <div className={`flex justify-between mb-2 text-lg text-black ${bayon.className}`}>
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}</span>
            </div>
            
            <div className="relative h-1 bg-gray-300 rounded">
              {/* Range track highlight */}
              <div 
                className="absolute h-1 bg-black rounded"
                style={{
                  left: `${(priceRange[0] / 1000) * 100}%`,
                  right: `${100 - (priceRange[1] / 1000) * 100}%`
                }}
              />
              
              {/* Min range slider */}
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[0]}
                onChange={(e) => {
                  const newMin = parseInt(e.target.value, 10);
                  if (newMin <= priceRange[1]) {
                    setPriceRange([newMin, priceRange[1]]);
                  }
                }}
                className="absolute w-full h-1 bg-transparent appearance-none cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
              />
              
              {/* Max range slider */}
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) => {
                  const newMax = parseInt(e.target.value, 10);
                  if (newMax >= priceRange[0]) {
                    setPriceRange([priceRange[0], newMax]);
                  }
                }}
                className="absolute w-full h-1 bg-transparent appearance-none cursor-pointer pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
              />
            </div>
            
            <div className={`flex justify-between mt-2 text-lg ${bayon.className}`}>
              <span className='text-gray-800'>₹0</span>
              <span className='text-gray-800'>₹1000</span>
            </div>
          </div>
        </div>
      </FilterSection>

      <FilterSection
        title="DATE"
        isOpen={openSections.date}
        onToggle={() => toggleSection("date")}
      >
        <div className="flex flex-wrap gap-2">
          {availableDates.map((date) => (
            <FilterButton
              key={date}
              selected={selectedDates.includes(date)}
              onClick={() => toggleDate(date)}
            >
              {date}
            </FilterButton>
          ))}
        </div>
      </FilterSection>

      <FilterSection
        title="TEAM SIZE"
        isOpen={openSections.teamSize}
        onToggle={() => toggleSection("teamSize")}
      >
        <div className="flex flex-wrap gap-2">
          {teamSizes.map((size) => (
            <FilterButton
              key={size}
              selected={selectedTeamSizes.includes(size)}
              onClick={() => toggleTeamSize(size)}
            >
              {size}
            </FilterButton>
          ))}
        </div>
      </FilterSection>
    </div>
  );
};

export default EventFilter;
