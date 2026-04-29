import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { ConfirmDialog } from "../../../shared/components/ConfirmDialog";
export const BulkActions = ({ selected, deleteFlights }) => {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const count = selected?.length ?? 0;
    const description = useMemo(() => {
        if (!count)
            return "";
        return `This will permanently delete ${count} selected flight${count === 1 ? "" : "s"}.`;
    }, [count]);
    return (_jsxs("div", { className: "bulk", children: [_jsx("button", { className: "btn danger", disabled: !count, onClick: () => setConfirmOpen(true), children: "Delete All" }), _jsx(ConfirmDialog, { open: confirmOpen, title: "Delete selected flights?", description: description, confirmText: "Delete", danger: true, onConfirm: () => deleteFlights(selected), onClose: () => setConfirmOpen(false) })] }));
};
