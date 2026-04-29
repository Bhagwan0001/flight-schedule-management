import { Select, MenuItem } from "@mui/material";

export const FlightFilters = ({ filters, setFilters, aocOptions = [] }: any) => {
  return (
    <div className="filters-bar">
      <Select
        value={filters.status || ""}
        onChange={(e) => setFilters((p: any) => ({ ...p, status: e.target.value }))}
        displayEmpty
        className="filter-select"
      >
        <MenuItem value="">All Status</MenuItem>
        <MenuItem value="Active">Active</MenuItem>
        <MenuItem value="Inactive">Inactive</MenuItem>
      </Select>

      <Select
        value={filters.aoc || ""}
        onChange={(e) => setFilters((p: any) => ({ ...p, aoc: e.target.value }))}
        displayEmpty
        className="filter-select"
      >
        <MenuItem value="">All AOC</MenuItem>
        {aocOptions.map((aoc: string) => (
          <MenuItem key={aoc} value={aoc}>{aoc}</MenuItem>
        ))}
      </Select>

      <Select
        value={filters.bodyType || ""}
        onChange={(e) => setFilters((p: any) => ({ ...p, bodyType: e.target.value }))}
        displayEmpty
        className="filter-select"
      >
        <MenuItem value="">All Body Types</MenuItem>
        <MenuItem value="narrow_body">Narrow Body</MenuItem>
        <MenuItem value="wide_body">Wide Body</MenuItem>
      </Select>
    </div>
  );
};
