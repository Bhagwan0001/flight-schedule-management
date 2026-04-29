import { useMemo, useState } from "react";
import { ConfirmDialog } from "../../../shared/components/ConfirmDialog";

export const BulkActions = ({ selected, deleteFlights }: any) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const count = selected?.length ?? 0;
  const description = useMemo(() => {
    if (!count) return "";
    return `This will permanently delete ${count} selected flight${count === 1 ? "" : "s"}.`;
  }, [count]);

  return (
    <div className="bulk">
      <button
        className="btn danger"
        disabled={!count}
        onClick={() => setConfirmOpen(true)}
      >
        Delete All
      </button>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete selected flights?"
        description={description}
        confirmText="Delete"
        danger
        onConfirm={() => deleteFlights(selected)}
        onClose={() => setConfirmOpen(false)}
      />
    </div>
  );
};