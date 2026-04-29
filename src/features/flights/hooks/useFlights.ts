import { useMemo, useReducer } from "react";
import flightsData from "../../../data/flights.json";
import { filterFlights } from "../utils/filterFlights";
import type {
  EditableFlightFields,
  Flight,
  FlightFilters,
  FlightStatus,
} from "../types/flight.types";

type FlightsResponse = {
  flights: Flight[];
};

type FlightsState = {
  flights: Flight[];
  filters: FlightFilters;
  search: string;
  selected: string[];
  savingIds: string[];
  errorMessage: string | null;
};

type FlightsAction =
  | { type: "SET_FILTERS"; payload: FlightFilters }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_SELECTED"; payload: string[] }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_FLIGHTS"; payload: Flight[] }
  | { type: "SET_SAVING"; payload: { id: string; isSaving: boolean } }
  | { type: "UPDATE_FLIGHT"; payload: { id: string; updates: Partial<Flight> } }
  | { type: "CLEAR_ALL" };

const reducer = (state: FlightsState, action: FlightsAction): FlightsState => {
  switch (action.type) {
    case "SET_FILTERS":
      return { ...state, filters: action.payload };
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    case "SET_SELECTED":
      return { ...state, selected: action.payload };
    case "SET_ERROR":
      return { ...state, errorMessage: action.payload };
    case "SET_FLIGHTS":
      return { ...state, flights: action.payload };
    case "SET_SAVING":
      return {
        ...state,
        savingIds: action.payload.isSaving
          ? [...new Set([...state.savingIds, action.payload.id])]
          : state.savingIds.filter((id) => id !== action.payload.id),
      };
    case "UPDATE_FLIGHT":
      return {
        ...state,
        flights: state.flights.map((flight) =>
          flight.id === action.payload.id
            ? { ...flight, ...action.payload.updates }
            : flight
        ),
      };
    case "CLEAR_ALL":
      return {
        ...state,
        filters: {},
        search: "",
        selected: [],
        errorMessage: null,
      };
    default:
      return state;
  }
};

const simulateFlightSave = (flight: Flight) =>
  new Promise<void>((resolve, reject) => {
    window.setTimeout(() => {
      if (Math.random() < 0.2) {
        reject(new Error(`Failed to save updates for ${flight.id}. Please try again.`));
        return;
      }

      resolve();
    }, 900);
  });

export const useFlights = () => {
  const data = flightsData as FlightsResponse;
  const [state, dispatch] = useReducer(reducer, {
    flights: data.flights,
    filters: {},
    search: "",
    selected: [],
    savingIds: [],
    errorMessage: null,
  });

  const filteredFlights = useMemo(
    () => filterFlights(state.flights, state.filters, state.search),
    [state.flights, state.filters, state.search]
  );

  const setFilters = (
    updater: FlightFilters | ((prev: FlightFilters) => FlightFilters)
  ) => {
    const nextFilters =
      typeof updater === "function" ? updater(state.filters) : updater;
    dispatch({ type: "SET_FILTERS", payload: nextFilters });
  };

  const setSearch = (value: string) => {
    dispatch({ type: "SET_SEARCH", payload: value });
  };

  const setSelected = (
    updater: string[] | ((prev: string[]) => string[])
  ) => {
    const nextSelected =
      typeof updater === "function" ? updater(state.selected) : updater;
    dispatch({ type: "SET_SELECTED", payload: nextSelected });
  };

  const clearError = () => {
    dispatch({ type: "SET_ERROR", payload: null });
  };

  const toggleStatus = (id: string) => {
    const flight = state.flights.find((item) => item.id === id);
    if (!flight) return;

    const nextStatus: FlightStatus =
      flight.status === "Active" ? "Inactive" : "Active";

    dispatch({ type: "SET_ERROR", payload: null });
    dispatch({
      type: "UPDATE_FLIGHT",
      payload: { id, updates: { status: nextStatus } },
    });
  };

  const updateFlight = async (
    id: string,
    updates: EditableFlightFields
  ) => {
    const previousFlight = state.flights.find((flight) => flight.id === id);
    if (!previousFlight) return false;

    const nextFlight = { ...previousFlight, ...updates };

    dispatch({ type: "SET_ERROR", payload: null });
    dispatch({ type: "SET_SAVING", payload: { id, isSaving: true } });
    dispatch({ type: "UPDATE_FLIGHT", payload: { id, updates } });

    try {
      await simulateFlightSave(nextFlight);
      return true;
    } catch (error) {
      dispatch({
        type: "UPDATE_FLIGHT",
        payload: { id, updates: previousFlight },
      });
      dispatch({
        type: "SET_ERROR",
        payload:
          error instanceof Error
            ? error.message
            : `Failed to save updates for ${id}.`,
      });
      return false;
    } finally {
      dispatch({ type: "SET_SAVING", payload: { id, isSaving: false } });
    }
  };

  const deleteFlights = (ids: string[]) => {
    dispatch({
      type: "SET_FLIGHTS",
      payload: state.flights.filter((flight) => !ids.includes(flight.id)),
    });
    dispatch({ type: "SET_SELECTED", payload: [] });
  };

  const clearAllFilters = () => {
    dispatch({ type: "CLEAR_ALL" });
  };

  const refreshFlights = () => {
    dispatch({ type: "SET_FLIGHTS", payload: data.flights });
    dispatch({ type: "SET_SELECTED", payload: [] });
    dispatch({ type: "SET_ERROR", payload: null });
  };

  return {
    flights: state.flights,
    filteredFlights,
    filters: state.filters,
    setFilters,
    search: state.search,
    setSearch,
    selected: state.selected,
    setSelected,
    savingIds: state.savingIds,
    errorMessage: state.errorMessage,
    clearError,
    toggleStatus,
    updateFlight,
    deleteFlights,
    clearAllFilters,
    refreshFlights,
  };
};