import {
  Checkbox,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import type { BodyType, FlightFilters as FlightFiltersType, FlightStatus } from "../types/flight.types";

type FlightFiltersProps = {
  filters: FlightFiltersType;
  setFilters: (
    updater:
      | FlightFiltersType
      | ((prev: FlightFiltersType) => FlightFiltersType)
  ) => void;
  aocOptions: string[];
};

const dayOptions = [
  { label: "Mon", value: 1 },
  { label: "Tue", value: 2 },
  { label: "Wed", value: 3 },
  { label: "Thu", value: 4 },
  { label: "Fri", value: 5 },
  { label: "Sat", value: 6 },
  { label: "Sun", value: 7 },
];

const bodyTypeOptions: Array<{ label: string; value: BodyType }> = [
  { label: "Narrow Body", value: "narrow_body" },
  { label: "Wide Body", value: "wide_body" },
];

const statusOptions: FlightStatus[] = ["Active", "Inactive"];

export const FlightFilters = ({
  filters,
  setFilters,
  aocOptions = [],
}: FlightFiltersProps) => {
  const handleDaysChange = (event: SelectChangeEvent<number[]>) => {
    const value = event.target.value;
    const nextDays =
      typeof value === "string"
        ? value.split(",").map((item) => Number(item))
        : value;

    setFilters((prev) => ({
      ...prev,
      days: nextDays,
    }));
  };

  return (
    <div className="filters-bar">
      <div className="filter-field">
        <label>Start Date</label>
        <input
          className="input"
          type="date"
          value={filters.fromDate || ""}
          onChange={(event) =>
            setFilters((prev) => ({ ...prev, fromDate: event.target.value || undefined }))
          }
        />
      </div>

      <div className="filter-field">
        <label>End Date</label>
        <input
          className="input"
          type="date"
          value={filters.toDate || ""}
          onChange={(event) =>
            setFilters((prev) => ({ ...prev, toDate: event.target.value || undefined }))
          }
        />
      </div>

      <div className="filter-field filter-select">
        <label>Days Of Operation</label>
        <Select<number[]>
          multiple
          displayEmpty
          value={filters.days || []}
          onChange={handleDaysChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (!selected.length) return "All Days";
            return selected
              .map((value) => dayOptions.find((day) => day.value === value)?.label ?? value)
              .join(", ");
          }}
        >
          {dayOptions.map((day) => (
            <MenuItem key={day.value} value={day.value}>
              <Checkbox checked={filters.days?.includes(day.value) ?? false} />
              <ListItemText primary={day.label} />
            </MenuItem>
          ))}
        </Select>
      </div>

      <div className="filter-field filter-select">
        <label>Status</label>
        <Select
          value={filters.status || ""}
          onChange={(event) =>
            setFilters((prev) => ({
              ...prev,
              status: (event.target.value || undefined) as FlightStatus | undefined,
            }))
          }
          displayEmpty
        >
          <MenuItem value="">All Status</MenuItem>
          {statusOptions.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </div>

      <div className="filter-field filter-select">
        <label>AOC</label>
        <Select
          value={filters.aoc || ""}
          onChange={(event) =>
            setFilters((prev) => ({ ...prev, aoc: event.target.value || undefined }))
          }
          displayEmpty
        >
          <MenuItem value="">All AOC</MenuItem>
          {aocOptions.map((aoc) => (
            <MenuItem key={aoc} value={aoc}>
              {aoc}
            </MenuItem>
          ))}
        </Select>
      </div>

      <div className="filter-field filter-select">
        <label>Body Type</label>
        <Select
          value={filters.bodyType || ""}
          onChange={(event) =>
            setFilters((prev) => ({
              ...prev,
              bodyType: (event.target.value || undefined) as BodyType | undefined,
            }))
          }
          displayEmpty
        >
          <MenuItem value="">All Body Types</MenuItem>
          {bodyTypeOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </div>

    </div>
  );
};
