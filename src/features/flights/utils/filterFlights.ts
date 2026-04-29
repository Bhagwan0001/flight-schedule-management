import type { Flight, FlightFilters } from "../types/flight.types";

export const filterFlights = (
  flights: Flight[],
  filters: FlightFilters,
  search: string
): Flight[] => {
  const searchText = search.trim().toLowerCase();

  return flights.filter((f) => {
    const matchesDate =
      !filters.fromDate ||
      !filters.toDate ||
      (f.startDate <= filters.toDate &&
        f.endDate >= filters.fromDate);

    const matchesDays =
      !filters.days?.length ||
      f.daysOfOperation.some((d) =>
        filters.days?.includes(d)
      );

    const matchesStatus =
      !filters.status || f.status === filters.status;

    const matchesAOC =
      !filters.aoc || f.aoc === filters.aoc;

    const matchesBody =
      !filters.bodyType || f.bodyType === filters.bodyType;

    const matchesSearch =
      !searchText ||
      f.id.toLowerCase().includes(searchText) ||
      f.aoc.toLowerCase().includes(searchText) ||
      f.flightNumber.toLowerCase().includes(searchText) ||
      f.origin.toLowerCase().includes(searchText) ||
      f.destination.toLowerCase().includes(searchText);

    return (
      matchesDate &&
      matchesDays &&
      matchesStatus &&
      matchesAOC &&
      matchesBody &&
      matchesSearch
    );
  });
};