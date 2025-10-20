"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import axios from "axios";

import EventsList from "./EventsList";
import EventFilter from "./Filters";
import Pagination from "./Pagination";
import { Asset, EventApiResponse, EventItem } from "@/interfaces/contentful";

type FilterState = {
  eventType: string[];
  priceRange: number[];
  dates: string[];
  teamSize: string[];
};

const EVENTS_PER_PAGE = 5;

const formatDateForFilter = (isoString: string): string => {
  const dateObj = new Date(isoString);
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
  return `${day}${daySuffix} ${month}`;
};

const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [eventData, setEvents] = useState<EventItem[]>([]);
  const [assetData, setAssetData] = useState<Asset[]>([]);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get<EventApiResponse>("/api/events");
        setEvents(response.data.items);
        setAssetData(response.data.includes?.Asset || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const { uniqueDates, dateMap } = useMemo(() => {
    const newDateMap: Record<string, string> = {};
    const dates = new Set<string>();
    eventData.forEach((event) => {
      const formattedDate = formatDateForFilter(event.fields.startDateAndTime);
      const datePart = event.fields.startDateAndTime.substring(0, 10);
      newDateMap[formattedDate] = datePart;
      dates.add(formattedDate);
    });
    const sortedDates = Array.from(dates).sort(
      (a, b) =>
        new Date(newDateMap[a]).getTime() - new Date(newDateMap[b]).getTime()
    );
    return { uniqueDates: sortedDates, dateMap: newDateMap };
  }, [eventData]);

  const [filters, setFilters] = useState<FilterState>({
    eventType: [],
    priceRange: [0, 1000],
    dates: [],
    teamSize: [],
  });

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const filteredEvents = useMemo(() => {
    return eventData.filter((event) => {
      const searchMatch =
        event.fields.eventName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        event.fields.clubName.toLowerCase().includes(searchTerm.toLowerCase());
      const eventTypeMatch =
        filters.eventType.length === 0 ||
        filters.eventType.includes(event.fields.eventType.toUpperCase());
      const priceMatch =
        event.fields.pricePerPerson >= filters.priceRange[0] &&
        event.fields.pricePerPerson <= filters.priceRange[1];
      const teamSizeMatch =
        filters.teamSize.length === 0 ||
        filters.teamSize.some((size) =>
          event.fields.participationType.toUpperCase().includes(size)
        );
      const dateMatch =
        filters.dates.length === 0 ||
        filters.dates
          .map((dateLabel) => dateMap[dateLabel])
          .includes(event.fields.startDateAndTime.substring(0, 10));
      return (
        searchMatch &&
        eventTypeMatch &&
        priceMatch &&
        teamSizeMatch &&
        dateMatch
      );
    });
  }, [searchTerm, filters, eventData, dateMap]);

  const currentEvents = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * EVENTS_PER_PAGE;
    const lastPageIndex = firstPageIndex + EVENTS_PER_PAGE;
    return filteredEvents.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredEvents]);

  return (
    <div className="flex flex-col lg:flex-row bg-[#1a1a1a]">
      <div className="w-full lg:w-1/4">
        <EventFilter
          onFilterChange={handleFilterChange}
          availableDates={uniqueDates}
        />
      </div>
      <div className="w-full lg:w-3/4">
        <EventsList
          events={currentEvents}
          assets={assetData}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />

        <Pagination
          currentPage={currentPage}
          totalCount={filteredEvents.length}
          pageSize={EVENTS_PER_PAGE}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default EventsPage;
