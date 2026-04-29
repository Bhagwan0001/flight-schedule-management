import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Checkbox, Switch } from "@mui/material";
import { useMemo, useState } from "react";
import { ConfirmDialog } from "../../../shared/components/ConfirmDialog";
export const FlightRow = ({ flight, toggleStatus, selected, setSelected, }) => {
    const isSelected = selected?.includes(flight.id) || false;
    const [confirmOpen, setConfirmOpen] = useState(false);
    const nextStatusLabel = flight.status === "Active" ? "Inactive" : "Active";
    const toggleDescription = useMemo(() => {
        return `Change status for ${flight.id} (${flight.origin} → ${flight.destination}) to ${nextStatusLabel}?`;
    }, [flight.destination, flight.id, flight.origin, nextStatusLabel]);
    return (_jsxs("div", { className: "table-row", children: [_jsx(Checkbox, { checked: isSelected, onChange: () => {
                    setSelected((prev) => isSelected
                        ? prev.filter((id) => id !== flight.id)
                        : [...prev, flight.id]);
                } }), _jsx("span", { children: flight.id }), _jsx("span", { children: flight.aoc }), _jsx("span", { children: flight.flightNumber }), _jsx("span", { children: flight.origin }), _jsx("span", { children: flight.destination }), _jsx("span", { children: flight.std }), _jsx("span", { children: flight.sta }), _jsx("span", { className: `status-badge ${flight.status === "Active" ? "active" : "inactive"}`, children: flight.status }), _jsx(Switch, { checked: flight.status === "Active", onChange: () => setConfirmOpen(true) }), _jsx(ConfirmDialog, { open: confirmOpen, title: "Confirm status change", description: toggleDescription, confirmText: "Update", onConfirm: () => toggleStatus(flight.id), onClose: () => setConfirmOpen(false) })] }));
};
