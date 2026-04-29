export const FlightSearch = ({ value, onChange }: any) => {
  return (
    <div className="filter-group">

      <input
      className="input"
        // fullWidth
        // size="small"
        placeholder="Search flight, origin, destination"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};