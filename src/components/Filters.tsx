import React, { useState } from "react";

// State and Prop Types
type FilterState = {
  eventType: string[];
  priceRange: number[];
  freeOfCost: boolean;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  teamSize: string[];
};

type EventFilterProps = {
  onFilterChange?: (filters: FilterState) => void;
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

// A type for the keys of the openSections state
type SectionName = "eventType" | "priceRange" | "dateTime" | "teamSize";

// Reusable Components
const FilterButton = ({ children, selected, onClick }: FilterButtonProps) => (
  <button
    onClick={onClick}
    className={`
      px-6 py-3 border-2 border-black font-bold uppercase cursor-pointer
      text-sm font-sans
      ${selected ? "bg-black text-[#42E25A]" : "bg-[#42E25A] text-black"}
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
        w-full p-5 bg-[#42E25A] border-t-2 border-black
        flex justify-between items-center cursor-pointer
      `}
    >
      <span className="font-sans text-lg font-bold uppercase text-black">
        {title}
      </span>
      <span
        className={`
          text-2xl font-bold text-black transform transition-transform duration-300
          ${isOpen ? "rotate-180" : "rotate-0"}
        `}
      >
        <svg
          width="34"
          height="21"
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
    {isOpen && <div className="p-5 bg-[#70E081]">{children}</div>}
  </div>
);

// Main Component
const EventFilter = ({ onFilterChange }: EventFilterProps) => {
  const [openSections, setOpenSections] = useState({
    eventType: true,
    priceRange: true,
    dateTime: true,
    teamSize: true,
  });

  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);
  const [selectedTeamSizes, setSelectedTeamSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [freeOfCost, setFreeOfCost] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");

  const notifyFilterChange = (updatedState: Partial<FilterState> = {}) => {
    const filters: FilterState = {
      eventType: updatedState.eventType ?? selectedEventTypes,
      priceRange: updatedState.priceRange ?? priceRange,
      freeOfCost: updatedState.freeOfCost ?? freeOfCost,
      startDate: updatedState.startDate ?? startDate,
      startTime: updatedState.startTime ?? startTime,
      endDate: updatedState.endDate ?? endDate,
      endTime: updatedState.endTime ?? endTime,
      teamSize: updatedState.teamSize ?? selectedTeamSizes,
    };

    console.log(JSON.stringify(filters, null, 2));

    if (onFilterChange) {
      onFilterChange(filters);
    }
  };

  const toggleSection = (section: SectionName) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleEventType = (type: string) => {
    setSelectedEventTypes((prev: string[]) => {
      const newTypes = prev.includes(type)
        ? prev.filter((t: string) => t !== type)
        : [...prev, type];
      notifyFilterChange({ eventType: newTypes });
      return newTypes;
    });
  };

  const toggleTeamSize = (size: string) => {
    setSelectedTeamSizes((prev: string[]) => {
      const newSizes = prev.includes(size)
        ? prev.filter((s: string) => s !== size)
        : [...prev, size];
      notifyFilterChange({ teamSize: newSizes });
      return newSizes;
    });
  };

  const clearFilters = () => {
    setSelectedEventTypes([]);
    setSelectedTeamSizes([]);
    setPriceRange([0, 1000]);
    setFreeOfCost(true);
    setStartDate("");
    setStartTime("");
    setEndDate("");
    setEndTime("");
    notifyFilterChange({
      eventType: [],
      teamSize: [],
      priceRange: [0, 1000],
      freeOfCost: true,
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
    });
  };

  const eventTypes: string[] = [
    "WORKSHOP",
    "COMPETITION",
    "HACKATHON",
    "GAMES",
    "IDEATHON",
    "ENTERTAINMENT",
  ];
  const teamSizes: string[] = ["SOLO", "DUO", "TRIO", "SQUAD", "5+ MEMBERS"];

  return (
    <div className="w-full bg-[#70E081]">
      {/* Header */}
      <div className="p-5 bg-black flex justify-between items-center border-b-2 border-black">
        <div className="flex items-center gap-3">
          <span className="text-[28px] text-[#70E081]">
            <svg
              width="32"
              height="32"
              viewBox="0 0 63 63"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26.1078 62.9382C24.6843 62.9382 23.3191 62.3727 22.3125 61.3661C21.3059 60.3595 20.7404 58.9943 20.7404 57.5708V28.157L1.57846 9.37078C0.0218899 7.81421 -0.407509 5.50619 0.397613 3.52022C1.20274 1.53425 3.1887 0.192383 5.38937 0.192383H57.615C59.8156 0.192383 61.7479 1.48058 62.553 3.52022C63.3582 5.55986 62.9288 7.81421 61.3722 9.37078L42.2103 28.157V52.2033C42.2103 54.2429 41.0831 56.0679 39.2582 56.9803L28.5232 62.3478C27.7718 62.7772 26.913 62.9382 26.1078 62.9382Z"
                fill="white"
              />
            </svg>
          </span>
          <h2 className="m-0 text-white text-[28px] font-bold uppercase">
            FILTERS
          </h2>
        </div>
        <button
          className="bg-transparent border-none text-[#FF4500] text-[18px] font-bold uppercase cursor-pointer"
          onClick={clearFilters}
        >
          CLEAR
        </button>
      </div>

      {/* Event Type Section */}
      <FilterSection
        title="EVENT TYPE"
        isOpen={openSections.eventType}
        onToggle={() => toggleSection("eventType")}
      >
        <div className="grid grid-cols-3 gap-2">
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

      {/* Price Range Section */}
      <FilterSection
        title="PRICE RANGE"
        isOpen={openSections.priceRange}
        onToggle={() => toggleSection("priceRange")}
      >
        <div>
          <label className="flex items-center gap-2.5 mb-5 cursor-pointer">
            <input
              type="checkbox"
              checked={freeOfCost}
              onChange={(e) => {
                setFreeOfCost(e.target.checked);
                notifyFilterChange({ freeOfCost: e.target.checked });
              }}
              className="w-6 h-6 cursor-pointer accent-black"
            />
            <span className="text-sm font-bold uppercase text-black">
              FREE OF COST
            </span>
          </label>

          <div className="relative py-5">
            <span className="text-sm font-bold text-black">
              ₹{priceRange[1]}
            </span>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) => {
                const newRange = [0, parseInt(e.target.value, 10)];
                setPriceRange(newRange);
                notifyFilterChange({ priceRange: newRange });
              }}
              className="w-full h-1 bg-black outline-none cursor-pointer"
            />
            <div className="flex justify-between mt-2.5">
              <span className="text-sm font-bold text-black">₹0</span>
              <span className="text-sm font-bold text-black">₹1000</span>
            </div>
          </div>
        </div>
      </FilterSection>

      {/* Date & Time Section */}
      <FilterSection
        title="DATE & TIME"
        isOpen={openSections.dateTime}
        onToggle={() => toggleSection("dateTime")}
      >
        <div className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-bold uppercase mb-2 text-black">
              START DATE & TIME
            </label>
            <div className="flex gap-3">
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  notifyFilterChange({ startDate: e.target.value });
                }}
                className="flex-1 p-3 border-2 border-black bg-black text-[#70E081] text-sm font-sans"
              />
              <input
                type="time"
                value={startTime}
                onChange={(e) => {
                  setStartTime(e.target.value);
                  notifyFilterChange({ startTime: e.target.value });
                }}
                className="p-3 border-2 border-black bg-black text-[#70E081] text-sm font-sans"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold uppercase mb-2 text-black">
              END DATE & TIME
            </label>
            <div className="flex gap-3">
              <input
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  notifyFilterChange({ endDate: e.target.value });
                }}
                className="flex-1 p-3 border-2 border-black bg-black text-[#70E081] text-sm font-sans"
              />
              <input
                type="time"
                value={endTime}
                onChange={(e) => {
                  setEndTime(e.target.value);
                  notifyFilterChange({ endTime: e.target.value });
                }}
                className="p-3 border-2 border-black bg-black text-[#70E081] text-sm font-sans"
              />
            </div>
          </div>
        </div>
      </FilterSection>

      {/* Team Size Section */}
      <FilterSection
        title="TEAM SIZE"
        isOpen={openSections.teamSize}
        onToggle={() => toggleSection("teamSize")}
      >
        <div className="flex flex-wrap gap-3">
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
