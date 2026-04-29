import { useEffect, useState } from "react";
import flightsData from "../../../data/flights.json";
import { filterFlights } from "../utils/filterFlights";
import type { Flight, FlightFilters } from "../types/flight.types";

type FlightsResponse = {
  flights: Flight[];
};

export const useFlights = () => {
  const data = flightsData as FlightsResponse;

  const [flights, setFlights] = useState<Flight[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [filters, setFilters] = useState<FlightFilters>({});
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    setFlights(data.flights);
    setFilteredFlights(data.flights);
  }, []);

  useEffect(() => {
    setFilteredFlights(filterFlights(flights, filters, search));
  }, [flights, filters, search]);

  const toggleStatus = (id: string) => {
    setFlights((prev) =>
      prev.map((f) =>
        f.id === id
          ? {
              ...f,
              status:
                f.status === "Active" ? "Inactive" : "Active",
            }
          : f
      )
    );
  };

  const deleteFlights = (ids: string[]) => {
    setFlights((prev) =>
      prev.filter((f) => !ids.includes(f.id))
    );
    setSelected([]);
  };

  const clearAllFilters = () => {
    setFilters({});
    setSearch("");
    setSelected([]);
  };

  const refreshFlights = () => {
    // In real app, this would refetch. Here we reset to the JSON source.
    setFlights(data.flights);
    setFilteredFlights(filterFlights(data.flights, filters, search));
    setSelected([]);
  };

  return {
    flights,
    filteredFlights,
    filters,
    setFilters,
    search,
    setSearch,
    selected,
    setSelected,
    toggleStatus,
    deleteFlights,
    clearAllFilters,
    refreshFlights,
  };
};