"use client";

import React, { useEffect, useState } from "react";
import { EventItem, Asset } from "@/interfaces/contentful";
import { Bayon } from "next/font/google";
import { MapPin } from "lucide-react";

const fontBayon = Bayon({ subsets: ["latin"], weight: "400" });

const formatPrice = (price: number): string => {
  if (price === 0) return "FREE";
  return `₹${price}`;
};

const formatDate = (isoString: string): { date: string; time: string } => {
  const dateObj = new Date(isoString);
  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "UTC",
  };

  const day = dateObj.toLocaleDateString("en-US", {
    day: "numeric",
    timeZone: "UTC",
  });
  const month = dateObj
    .toLocaleDateString("en-US", { month: "short", timeZone: "UTC" })
    .toUpperCase();

  let daySuffix;
  if (day.endsWith("1") && !day.endsWith("11")) daySuffix = "ST";
  else if (day.endsWith("2") && !day.endsWith("12")) daySuffix = "ND";
  else if (day.endsWith("3") && !day.endsWith("13")) daySuffix = "RD";
  else daySuffix = "TH";

  return {
    date: `${day}${daySuffix} ${month}`,
    time: dateObj.toLocaleTimeString("en-US", optionsTime),
  };
};

interface EventsListProps {
  events: EventItem[];
  assets?: Asset[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

interface EventCardProps {
  event: EventItem;
  imageUrl?: string;
  onClick: () => void;
}

interface EventDetailsDialogProps {
  event: EventItem;
  imageUrl?: string;
  onClose: () => void;
}

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

interface ChevronDownIconProps {
  open: boolean;
}

interface AccordionItemProps {
  title: string;
  // children: string;
  children?: React.ReactNode;
  htmlContent?: string;
  isOpen: boolean;
  onClick: () => void;
}

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-white"
  >
    {" "}
    <circle cx="11" cy="11" r="8"></circle>{" "}
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>{" "}
  </svg>
);
const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    {" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />{" "}
  </svg>
);
const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    {" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />{" "}
  </svg>
);
const UsersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    {" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.125-1.273-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.125-1.273.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    />{" "}
  </svg>
);
const ChevronDownIcon = ({ open }: ChevronDownIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-6 w-6 transition-transform duration-300 ${
      open ? "rotate-180" : ""
    }`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    {" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 9l-7 7-7-7"
    />{" "}
  </svg>
);
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    {" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />{" "}
  </svg>
);

const AccordionItem = ({
  title,
  children,
  htmlContent,
  isOpen,
  onClick,
}: AccordionItemProps) => {
  return (
    <div className={`border-t border-[#3a3a3a] ${fontBayon.className}`}>
      <div
        className="flex justify-between items-center py-4 cursor-pointer text-3xl"
        onClick={onClick}
      >
        <h3 className="uppercase text-white">{title}</h3>
        <ChevronDownIcon open={isOpen} />
      </div>
      {/* {isOpen && (
        // <div className="pb-4 text-gray-400 text-lg max-h-24 overflow-y-scroll">
        //   {children}
        // </div>

        <div
          className="pb-4 text-gray-400 text-lg max-h-24 overflow-y-scroll"
          dangerouslySetInnerHTML={{ __html: children }}
        />
      )} */}

      {isOpen && (
        <>
          {htmlContent && (
            <div
              className="pb-4 text-gray-400 text-lg max-h-24 overflow-y-scroll"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          )}

          {children && (
            <div className="pb-4 text-gray-400 text-lg">{children}</div>
          )}
        </>
      )}
    </div>
  );
};

const SearchAndFilter = ({
  searchTerm,
  onSearchChange,
}: SearchAndFilterProps) => {
  const dropdownArrow = `data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23ffffff%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E`;
  return (
    <div className="w-full px-2 py-4 mb-4">
      <div className="flex w-full items-center gap-2">
        <div className="flex flex-grow items-center space-x-3 border bg-black border-[#565656] px-4 py-1.5">
          <SearchIcon />
          <input
            type="text"
            placeholder="SEARCH"
            className="w-full bg-transparent text-white placeholder-gray-300 outline-none placeholder:tracking-widest"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <select
          className="cursor-pointer appearance-none border border-[#565656] bg-black px-3 py-1.5 pr-8 uppercase text-white outline-none text-sm whitespace-nowrap"
          style={{
            backgroundImage: `url("${dropdownArrow}")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0.5rem center",
            backgroundSize: "0.6em",
            minWidth: "fit-content",
            width: "auto",
          }}
        >
          <option className="bg-black text-white" value="30">
            Show 30
          </option>
          <option className="bg-black text-white" value="50">
            Show 50
          </option>
          <option className="bg-black text-white" value="100">
            Show 100
          </option>
        </select>
      </div>
    </div>
  );
};

const EventDetailsDialog = ({
  event,
  imageUrl,
  onClose,
}: EventDetailsDialogProps) => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(
    // "Description"
    null
  );
  const { date: startdate, time: starttime } = formatDate(
    event.fields.startDateAndTime
  );
  const { date: enddate, time: endtime } = formatDate(
    event.fields.endDateAndTime
  );

  const handleAccordionClick = (title: string) => {
    setOpenAccordion((prev) => (prev === title ? null : title));
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-black text-white w-full max-w-7xl py-10 px-8 border border-[#3a3a3a]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-[#2a2a2a] p-1 hover:bg-[#3a3a3a] transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <CloseIcon />
        </button>
        <div className="flex flex-col lg:flex-row gap-8 lg:items-start">
          <div className="w-full lg:w-1/3 h-64 lg:h-auto bg-[#d9d9d9] flex-shrink-0">
            {imageUrl && (
              <img
                src={`https://cdn.a2ys.dev/images/defaultPoster.png`} //{imageUrl}
                alt={event.fields.eventName}
                className="w-full h-full object-cover border border-gray-700"
              />
            )}
          </div>
          <div className="w-full lg:w-2/3 flex flex-col py-4">
            <div className="flex justify-between items-start px-6">
              <div>
                <h1 className="text-5xl font-bold ttFont tracking-tighter max-w-sm">
                  {event.fields.eventName}
                </h1>
                <h2
                  className={`text-xl text-[#70E081] mt-1 ${fontBayon.className}`}
                >
                  {event.fields.clubName}
                </h2>
              </div>
              <div className="bg-[#70E081] text-black px-6 py-2 text-lg flex-shrink-0 ttFont tracking-tigher">
                {formatPrice(event.fields.pricePerPerson)}
              </div>
            </div>
            <hr className="border-[#3a3a3a] my-4" />
            <p className="text-gray-400 px-6">
              {event.fields.shortDescription}
            </p>
            <div
              className={`grid grid-cols-4 gap-4 mt-4 px-6 text-lg ${fontBayon.className}`}
            >
              <div className="flex items-center justify-center bg-[#70E081] text-black py-2 px-2">
                <ClockIcon />
                <span>
                  {starttime} - <br /> {endtime}
                </span>
              </div>
              <div className="flex items-center justify-center bg-[#70E081] text-black py-2 px-2">
                <CalendarIcon />
                {startdate === enddate ? (
                  <span>{startdate}</span>
                ) : (
                  <span>
                    {startdate} -<br /> {enddate}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-center bg-[#70E081] text-black py-2 px-2">
                <UsersIcon />
                <span>{event.fields.participationType}</span>
              </div>
              <div className="flex items-center justify-center bg-[#70E081] text-black py-2 px-2">
                <MapPin />
                <span>{event.fields.eventVenue}</span>
              </div>
              <a
                href="https://chennaievents.vit.ac.in/technovit/"
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-4 flex items-center justify-center bg-[#70E081] text-black py-2 px-4 mt-2 cursor-pointer"
              >
                REGISTER NOW
              </a>
            </div>
            <div className="mt-6 px-6">
              <AccordionItem
                title="Description"
                isOpen={openAccordion === "Description"}
                onClick={() => handleAccordionClick("Description")}
                htmlContent={event.fields.longDescription}
              />
              {event.fields.rules && (
                <AccordionItem
                  title="Rules"
                  isOpen={openAccordion === "Rules"}
                  onClick={() => handleAccordionClick("Rules")}
                >
                  <ul className="list-disc pl-5 space-y-1">
                    {event.fields.rules.map((rule, index) => (
                      <li key={index}>{rule}</li>
                    ))}
                  </ul>
                </AccordionItem>
              )}
              {event.fields.judgementCriteria && (
                <AccordionItem
                  title="Judgement Criteria"
                  isOpen={openAccordion === "Judgement Criteria"}
                  onClick={() => handleAccordionClick("Judgement Criteria")}
                >
                  <ul className="list-disc pl-5 space-y-1">
                    {event.fields.judgementCriteria.map((criteria, index) => (
                      <li key={index}>{criteria}</li>
                    ))}
                  </ul>
                </AccordionItem>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EventCard = ({ event, imageUrl, onClick }: EventCardProps) => {
  const { date, time } = formatDate(event.fields.startDateAndTime);

  return (
    <div
      className="bg-black border border-[#565656] p-4 flex w-full cursor-pointer"
      onClick={onClick}
    >
      <div className="flex w-full flex-col gap-6 text-white lg:h-[30vh] lg:flex-row lg:items-stretch lg:space-x-6 lg:gap-6">
        <div className="relative flex-shrink-0 overflow-hidden rounded-md bg-black aspect-[4/5] lg:self-stretch">
          {imageUrl ? (
            <img
              src={`https://cdn.a2ys.dev/images/defaultPoster.png`} //{imageUrl}
              alt={event.fields.eventName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-[#1a1a1a]"></div>
          )}
        </div>
        <div className="flex flex-1 flex-col min-h-0 overflow-hidden">
          <div className="overflow-y-auto pr-2">
            <h2 className="text-2xl font-semibold ttFont tracking-tighter">
              {event.fields.eventName}
            </h2>
            <h3 className={`${fontBayon.className} text-lg`}>
              {event.fields.clubName}
            </h3>
            <p className="leading-relaxed text-gray-300 max-w-6xl">
              {event.fields.shortDescription}
            </p>
          </div>
        </div>
        <div
          className={`grid grid-cols-2 gap-3 text-lg uppercase ${fontBayon.className} lg:w-72 lg:flex-shrink-0 lg:my-auto`}
        >
          <div className="flex items-center justify-center bg-[#70E081] text-black p-3">
            <ClockIcon />
            {time}
          </div>
          <div className="flex items-center justify-center bg-[#70E081] text-black p-3">
            {formatPrice(event.fields.pricePerPerson)}
          </div>
          <div className="flex items-center justify-center bg-[#70E081] text-black p-3">
            <CalendarIcon />
            {date}
          </div>
          <div className="flex items-center justify-center bg-[#70E081] text-black p-3">
            {event.fields.participationType}
          </div>
          <div className="flex col-span-2 items-center justify-center bg-[#70E081] w-full text-black p-3">
            <MapPin />
            {event.fields.eventVenue}
          </div>
        </div>
      </div>
    </div>
  );
};

const EventsList = ({
  events,
  assets,
  searchTerm,
  onSearchChange,
}: EventsListProps) => {
  useEffect(
    () => console.log("EventsList rendered with events:", events),
    [events]
  );
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const getImageUrl = (event: EventItem): string | undefined => {
    const posterId = event.fields.poster?.sys.id;
    if (!posterId || !assets) return undefined;
    const asset = assets.find((asset) => asset.sys.id === posterId);
    return asset ? `https:${asset.fields.file.url}` : undefined;
  };

  return (
    <div className="w-full flex flex-col">
      <SearchAndFilter
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
      />
      {events.length > 0 ? (
        events.map((event) => {
          const imageUrl = getImageUrl(event);
          return (
            <EventCard
              key={event.sys.id}
              event={event}
              imageUrl={imageUrl}
              onClick={() => setSelectedEvent(event)}
            />
          );
        })
      ) : (
        <p className="text-white text-center text-xl mt-10">
          No events match the current filters.
        </p>
      )}
      {selectedEvent && (
        <EventDetailsDialog
          event={selectedEvent}
          imageUrl={getImageUrl(selectedEvent)}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default EventsList;
