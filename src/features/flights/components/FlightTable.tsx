import { FixedSizeList as List } from "react-window";
import type { ListChildComponentProps } from "react-window";
import { FlightRow } from "./FlightRow";

import { useEffect, useMemo, useState } from "react";
import type { EditableFlightFields, Flight } from "../types/flight.types";

type FlightTableProps = {
  flights: Flight[];
  selected: string[];
  setSelected: (updater: string[] | ((prev: string[]) => string[])) => void;
  toggleStatus: (id: string) => void;
  updateFlight: (id: string, updates: EditableFlightFields) => Promise<boolean>;
  savingIds: string[];
};

export const FlightTable = ({
  flights,
  selected,
  setSelected,
  toggleStatus,
  updateFlight,
  savingIds,
}: FlightTableProps) => {
  const [viewportHeight, setViewportHeight] = useState(() =>
    typeof window !== "undefined" ? window.innerHeight : 900
  );

  useEffect(() => {
    const onResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Pagination state
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const totalPages = Math.max(1, Math.ceil(flights.length / rowsPerPage));

  useEffect(() => {
    setPage((p) => Math.min(Math.max(1, p), totalPages));
  }, [totalPages]);

  const paginatedFlights = useMemo(() => {
    return flights.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  }, [flights, page, rowsPerPage]);

  const pageNumbers = useMemo(() => {
    const maxButtons = 5;
    if (totalPages <= maxButtons) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const half = Math.floor(maxButtons / 2);
    let start = Math.max(1, page - half);
    let end = Math.min(totalPages, start + maxButtons - 1);
    start = Math.max(1, end - maxButtons + 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [page, totalPages]);

  const listHeight = useMemo(() => {
    // Header + filters + bulk actions + paddings + footer approximation
    const available = viewportHeight - 440;
    return Math.max(420, Math.min(760, available));
  }, [viewportHeight]);

  return (
    <div className="table-container">
      {/* HEADER */}
      <div className="table-header">
        <span className="th-checkbox" aria-hidden="true" />
        <span>ID</span>
        <span>AOC</span>
        <span>Flight No</span>
        <span>Origin</span>
        <span>Destination</span>
        <span>Date</span>
        <span>STD</span>
        <span>STA</span>
        <span>Status</span>
        <span>Actions</span>
      </div>

      {/* BODY */}
      <div className="table-body">
        {paginatedFlights.length ? (
          <List
            height={listHeight}
            itemCount={paginatedFlights.length}
            itemSize={76}
            width="100%"
          >
            {({ index, style }: ListChildComponentProps) => (
              <div style={style}>
                <FlightRow
                  flight={paginatedFlights[index]}
                  selected={selected}
                  setSelected={setSelected}
                  toggleStatus={toggleStatus}
                  updateFlight={updateFlight}
                  isSaving={savingIds.includes(paginatedFlights[index].id)}
                />
              </div>
            )}
          </List>
        ) : (
          <div className="table-empty">No flights found.</div>
        )}
      </div>

      {/* FOOTER: Pagination */}
      <div className="table-footer">
        <div className="pagination-info">
          {flights.length
            ? `Showing ${(page - 1) * rowsPerPage + 1} to ${Math.min(page * rowsPerPage, flights.length)} of ${flights.length} flights`
            : "Showing 0 flights"}
        </div>
        <div className="pagination-controls">
          <button className="pg-btn" onClick={() => setPage(1)} disabled={page === 1} aria-label="First page">
            &laquo;
          </button>
          <button
            className="pg-btn"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Previous page"
          >
            &lsaquo;
          </button>
          <div className="pg-pages" aria-label="Page numbers">
            {pageNumbers.map((n) => (
              <button
                key={n}
                className={`pg-page ${n === page ? "active" : ""}`}
                onClick={() => setPage(n)}
              >
                {n}
              </button>
            ))}
          </div>
          <button
            className="pg-btn"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            aria-label="Next page"
          >
            &rsaquo;
          </button>
          <button className="pg-btn" onClick={() => setPage(totalPages)} disabled={page === totalPages} aria-label="Last page">
            &raquo;
          </button>
        </div>
        <div className="rows-per-page">
          Rows per page:
          <select value={rowsPerPage} onChange={e => { setRowsPerPage(Number(e.target.value)); setPage(1); }}>
            {[10, 20, 50, 100].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};