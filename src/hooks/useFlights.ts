// import { useEffect, useState } from "react";
// import { filterFlights } from "../features/flights/utils/filterFlights";
// import { flights as flightsData } from "../data/flights";

// import type { Flight, FlightFilters } from "../features/flights/types/flight.types";

// export const useFlights = () => {
//   const [flights, setFlights] = useState<Flight[]>([]);
//   const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
//   const [filters, setFilters] = useState<FlightFilters>({});
//   const [search, setSearch] = useState("");
//   const [editingId, setEditingId] = useState<string | null>(null);

//   // ✅ Load initial data
//   useEffect(() => {
//     setFlights(flightsData);
//     setFilteredFlights(flightsData);
//   }, []);

//   // ✅ Apply filters
//   useEffect(() => {
//     setFilteredFlights(filterFlights(flights, filters, search));
//   }, [flights, filters, search]);

//   return {
//     flights,
//     filteredFlights,
//     filters,
//     setFilters,
//     search,
//     setSearch,
//     editingId,
//     setEditingId,
//     setFlights,
//   };
// };



import { useEffect, useState } from "react";
import { flights as flightsData } from "../data/flights";
import { filterFlights } from "../features/flights/utils/filterFlights";

import type { Flight, FlightFilters } from "../features/flights/types/flight.types";

export const useFlights = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [filters, setFilters] = useState<FlightFilters>({});
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    setFlights(flightsData);
    setFilteredFlights(flightsData);
  }, []);

  useEffect(() => {
    const newFiltered = filterFlights(flights, filters, search);
    setFilteredFlights(newFiltered);
    // Reset to page 1 when filters change
    setCurrentPage(1);
  }, [flights, filters, search]);

  // Compute paginated flights
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedFlights = filteredFlights.slice(startIndex, startIndex + rowsPerPage);

  const deleteFlights = (idsToDelete: string[]) => {
    setFlights((prev) => prev.filter((f) => !idsToDelete.includes(f.id)));
    setSelected([]);
  };

  const toggleStatus = (id: string) => {
    setFlights((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, status: f.status === "Active" ? "Inactive" : "Active" } : f
      )
    );
  };

  return {
    flights,
    filteredFlights,
    paginatedFlights,
    filters,
    setFilters,
    search,
    setSearch,
    selected,
    setSelected,
    setFlights,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    deleteFlights,
    toggleStatus
  };
};