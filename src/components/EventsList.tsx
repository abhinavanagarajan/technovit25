import React, { useState } from "react";

interface Event {
  id: number;
  name: string;
  club: string;
  description: string;
  time: string;
  price: string;
  date: string;
  duration: string;
}

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

interface EventCardProps {
  event: Event;
  onClick: () => void;
}

interface EventDetailsDialogProps {
  event: Event;
  onClose: () => void;
}

interface ChevronDownIconProps {
  open: boolean;
}

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
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
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
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
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
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
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
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
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.125-1.273-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.125-1.273.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    />
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
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
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
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const AccordionItem = ({
  title,
  children,
  isOpen,
  onClick,
}: AccordionItemProps) => {
  return (
    <div className="border-t border-[#3a3a3a]">
      <div
        className="flex justify-between items-center py-4 cursor-pointer"
        onClick={onClick}
      >
        <h3 className="uppercase font-semibold tracking-wider text-white">
          {title}
        </h3>
        <ChevronDownIcon open={isOpen} />
      </div>
      {isOpen && <div className="pb-4 text-gray-400">{children}</div>}
    </div>
  );
};

const EventDetailsDialog = ({ event, onClose }: EventDetailsDialogProps) => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(
    "Description"
  );

  const handleAccordionClick = (title: string) => {
    setOpenAccordion((prev) => (prev === title ? null : title));
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-black text-white w-full max-w-5xl py-10 px-8 border border-[#3a3a3a]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-[#2a2a2a] p-1 hover:bg-[#3a3a3a] transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <CloseIcon />
        </button>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/3 h-64 lg:h-auto bg-[#d9d9d9] flex-shrink-0"></div>
          <div className="w-full lg:w-2/3 flex flex-col py-4">
            <div className="flex justify-between items-start px-6">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold">{event.name}</h1>
                <h2 className="text-xl text-[#70E081] font-semibold mt-1">
                  {event.club}
                </h2>
              </div>
              <div className="bg-[#70E081] text-black font-bold px-6 py-2 text-lg flex-shrink-0">
                {event.price}
              </div>
            </div>
            <hr className="border-[#3a3a3a] my-4" />
            <p className="text-gray-400 px-6">{event.description}</p>
            <div className="flex flex-wrap gap-4 mt-4 px-6">
              <div className="flex items-center justify-center bg-[#70E081] text-black font-bold py-2 px-4 ">
                <ClockIcon />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center justify-center bg-[#70E081] text-black font-bold py-2 px-4 ">
                <CalendarIcon />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center justify-center bg-[#70E081] text-black font-bold py-2 px-4 ">
                <UsersIcon />
                <span>{event.duration}</span>
              </div>
            </div>
            <div className="mt-6 px-6">
              <AccordionItem
                title="Description"
                isOpen={openAccordion === "Description"}
                onClick={() => handleAccordionClick("Description")}
              >
                A more detailed description of the event goes here. It explains
                the purpose, the activities involved, and what participants can
                expect.
              </AccordionItem>
              <AccordionItem
                title="Rules"
                isOpen={openAccordion === "Rules"}
                onClick={() => handleAccordionClick("Rules")}
              >
                <ul className="list-disc pl-5">
                  <li>Rule number one for the competition.</li>
                  <li>Rule number two that all participants must follow.</li>
                </ul>
              </AccordionItem>
              <AccordionItem
                title="Judgement Criteria"
                isOpen={openAccordion === "Judgement Criteria"}
                onClick={() => handleAccordionClick("Judgement Criteria")}
              >
                Participants will be judged based on creativity, execution, and
                overall impact of their project. Originality will be highly
                valued.
              </AccordionItem>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchAndFilter = ({
  searchTerm,
  onSearchChange,
}: SearchAndFilterProps) => {
  const dropdownArrow = `data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23ffffff%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E`;
  return (
    <div className="w-full py-4 mb-4">
      <div className="flex w-full items-center">
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
        <div className="ml-2">
          <select
            className="h-full cursor-pointer appearance-none border border-[#565656] bg-black px-4 py-1.5 uppercase text-white outline-none"
            style={{
              backgroundImage: `url("${dropdownArrow}")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.75rem center",
              backgroundSize: "0.65em",
              paddingRight: "2.5rem",
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
    </div>
  );
};

const EventCard = ({ event, onClick }: EventCardProps) => {
  return (
    <div
      className="bg-black border border-[#565656] p-4 flex w-full cursor-pointer"
      onClick={onClick}
    >
      <div className="flex w-full items-start space-x-6 text-white">
        <div className="flex-shrink-0 w-32 h-full bg-gray-300"></div>
        <div className="flex-grow flex flex-col justify-between my-auto">
          <div>
            <h2 className="text-2xl font-bold">{event.name}</h2>
            <h3 className="text-lg font-normal">{event.club}</h3>
            <p className="text-sm leading-relaxed text-gray-300 max-w-lg">
              {event.description}
            </p>
          </div>
        </div>
        <div className="flex-shrink-0 my-auto grid grid-cols-2 gap-3 w-72 font-bayon">
          <div className="flex items-center justify-center bg-[#70E081] text-black font-semibold p-3 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {event.time}
          </div>
          <div className="flex items-center justify-center bg-[#70E081] text-black font-semibold p-3 text-sm">
            {event.price}
          </div>
          <div className="flex items-center justify-center bg-[#70E081] text-black font-semibold p-3 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {event.date}
          </div>
          <div className="flex items-center justify-center bg-[#70E081] text-black font-semibold p-3 text-sm">
            {event.duration}
          </div>
        </div>
      </div>
    </div>
  );
};

const eventData: Event[] = [
  {
    id: 1,
    name: "AI Hackathon",
    club: "Tech Club",
    description:
      "A competitive event where teams develop innovative AI projects overnight.",
    time: "9.00 AM",
    price: "₹150/-",
    date: "28TH OCT",
    duration: "Team",
  },
  {
    id: 2,
    name: "Literary Fest",
    club: "Bookworms Society",
    description:
      "Celebrate the world of literature with author talks, poetry slams, and workshops.",
    time: "10.00 AM",
    price: "FREE",
    date: "29TH OCT",
    duration: "Solo",
  },
  {
    id: 3,
    name: "Startup Pitch",
    club: "Entrepreneurship Cell",
    description:
      "Present your business idea to a panel of venture capitalists and industry experts.",
    time: "2.00 PM",
    price: "₹100/-",
    date: "29TH OCT",
    duration: "Duo",
  },
  {
    id: 4,
    name: "Robotics Workshop",
    club: "Tech Club",
    description:
      "Learn to build and program your own line-following robot from scratch.",
    time: "11.00 AM",
    price: "₹200/-",
    date: "30TH OCT",
    duration: "Solo",
  },
  {
    id: 5,
    name: "Drama Night",
    club: "Theatrix",
    description:
      "An evening showcasing a series of short plays and theatrical performances by students.",
    time: "6.00 PM",
    price: "₹50/-",
    date: "30TH OCT",
    duration: "Team",
  },
];

const EventsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const filteredEvents = eventData.filter(
    (event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.club.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col">
      <SearchAndFilter searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {filteredEvents.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onClick={() => setSelectedEvent(event)}
        />
      ))}

      {selectedEvent && (
        <EventDetailsDialog
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default EventsList;
