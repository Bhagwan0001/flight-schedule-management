import { Checkbox, Switch } from "@mui/material";
import { useMemo, useState } from "react";
import { ConfirmDialog } from "../../../shared/components/ConfirmDialog";
import type {
  EditableFlightFields,
  Flight,
  FlightStatus,
} from "../types/flight.types";

type FlightRowProps = {
  flight: Flight;
  toggleStatus: (id: string) => void;
  selected: string[];
  setSelected: (updater: string[] | ((prev: string[]) => string[])) => void;
  updateFlight: (id: string, updates: EditableFlightFields) => Promise<boolean>;
  isSaving: boolean;
};

export const FlightRow = ({
  flight,
  toggleStatus,
  selected,
  setSelected,
  updateFlight,
  isSaving,
}: FlightRowProps) => {
  const isSelected = selected?.includes(flight.id) || false;
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<EditableFlightFields>({
    startDate: flight.startDate,
    std: flight.std,
    sta: flight.sta,
    status: flight.status,
  });
  const nextStatusLabel = flight.status === "Active" ? "Inactive" : "Active";
  const toggleDescription = useMemo(() => {
    return `Change status for ${flight.id} (${flight.origin} → ${flight.destination}) to ${nextStatusLabel}?`;
  }, [flight.destination, flight.id, flight.origin, nextStatusLabel]);

  const startEditing = () => {
    setDraft({
      startDate: flight.startDate,
      std: flight.std,
      sta: flight.sta,
      status: flight.status,
    });
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setDraft({
      startDate: flight.startDate,
      std: flight.std,
      sta: flight.sta,
      status: flight.status,
    });
    setIsEditing(false);
  };

  const saveEditing = async () => {
    const didSave = await updateFlight(flight.id, draft);
    if (didSave) {
      setIsEditing(false);
    }
  };

  return (
    <div className={`table-row ${isSaving ? "is-saving" : ""}`}>
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
      <span>
        {isEditing ? (
          <input
            className="table-cell-input"
            type="date"
            value={draft.startDate}
            disabled={isSaving}
            onChange={(event) =>
              setDraft((prev) => ({ ...prev, startDate: event.target.value }))
            }
          />
        ) : (
          flight.startDate
        )}
      </span>
      <span>
        {isEditing ? (
          <input
            className="table-cell-input"
            type="time"
            value={draft.std}
            disabled={isSaving}
            onChange={(event) =>
              setDraft((prev) => ({ ...prev, std: event.target.value }))
            }
          />
        ) : (
          flight.std
        )}
      </span>
      <span>
        {isEditing ? (
          <input
            className="table-cell-input"
            type="time"
            value={draft.sta}
            disabled={isSaving}
            onChange={(event) =>
              setDraft((prev) => ({ ...prev, sta: event.target.value }))
            }
          />
        ) : (
          flight.sta
        )}
      </span>

      <span>
        {isEditing ? (
          <select
            className="table-cell-input"
            value={draft.status}
            disabled={isSaving}
            onChange={(event) =>
              setDraft((prev) => ({
                ...prev,
                status: event.target.value as FlightStatus,
              }))
            }
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        ) : (
          <span
            className={`status-badge ${
              flight.status === "Active" ? "active" : "inactive"
            }`}
          >
            {flight.status}
          </span>
        )}
      </span>

      <div className="row-actions">
        {isEditing ? (
          <>
            <button
              className="btn primary row-action-btn row-save-btn"
              onClick={saveEditing}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <span className="btn-spinner" aria-hidden="true" />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </button>
            <button
              className="btn secondary row-action-btn row-cancel-btn"
              onClick={cancelEditing}
              disabled={isSaving}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className="btn secondary row-action-btn row-edit-btn"
              onClick={startEditing}
              aria-label={`Edit ${flight.id}`}
            >
              Edit
            </button>
            <Switch
              checked={flight.status === "Active"}
              onChange={() => setConfirmOpen(true)}
            />
          </>
        )}
      </div>

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