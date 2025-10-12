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

const SearchAndFilter = ({
  searchTerm,
  onSearchChange,
}: SearchAndFilterProps) => {
  const dropdownArrow = `data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23ffffff%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E`;

  return (
    <div className="w-full px-2 py-4">
      <div className="flex w-full items-center">
        <div className="flex flex-grow items-center space-x-3 border bg-black border-[#565656] px-4 py-1.5">
          <SearchIcon />
          <input
            type="text"
            placeholder="SEARCH"
            className="w-full bg-transparent text-white placeholder-gray-300 outline-none placeholder:tracking-widest"
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

const EventCard = ({ event }: EventCardProps) => {
  return (
    <div className="bg-black border border-[#565656] p-4 flex w-full">
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

          <div className="flex items-center col-span-2 justify-center bg-[#70E081] text-black font-semibold p-3 text-sm">
            REGISTER
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
    duration: "24 HR",
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
    duration: "6 HR",
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
    duration: "4 HR",
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
    duration: "5 HR",
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
    duration: "3 HR",
  },
];

const EventsList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = eventData.filter(
    (event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.club.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col">
      <SearchAndFilter searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {filteredEvents.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventsList;
