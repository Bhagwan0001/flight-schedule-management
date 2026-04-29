import { Checkbox, Switch } from "@mui/material";
import { useMemo, useState } from "react";
import { ConfirmDialog } from "../../../shared/components/ConfirmDialog";

export const FlightRow = ({
  flight,
  toggleStatus,
  selected,
  setSelected,
}: any) => {
  const isSelected = selected?.includes(flight.id) || false;
  const [confirmOpen, setConfirmOpen] = useState(false);
  const nextStatusLabel = flight.status === "Active" ? "Inactive" : "Active";
  const toggleDescription = useMemo(() => {
    return `Change status for ${flight.id} (${flight.origin} → ${flight.destination}) to ${nextStatusLabel}?`;
  }, [flight.destination, flight.id, flight.origin, nextStatusLabel]);

  return (
    <div className="table-row">
      <Checkbox
        checked={isSelected}
        onChange={() => {
          setSelected((prev: string[]) =>
            isSelected
              ? prev.filter((id) => id !== flight.id)
              : [...prev, flight.id]
          );
        }}
      />

      <span>{flight.id}</span>
      <span>{flight.aoc}</span>
      <span>{flight.flightNumber}</span>
      <span>{flight.origin}</span>
      <span>{flight.destination}</span>
      <span>{flight.std}</span>
      <span>{flight.sta}</span>

      <span
        className={`status-badge ${
          flight.status === "Active" ? "active" : "inactive"
        }`}
      >
        {flight.status}
      </span>

      <Switch
        checked={flight.status === "Active"}
        onChange={() => setConfirmOpen(true)}
      />

      <ConfirmDialog
        open={confirmOpen}
        title="Confirm status change"
        description={toggleDescription}
        confirmText="Update"
        onConfirm={() => toggleStatus(flight.id)}
        onClose={() => setConfirmOpen(false)}
      />
    </div>
  );
};