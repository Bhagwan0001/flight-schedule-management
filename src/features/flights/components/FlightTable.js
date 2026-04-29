import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FixedSizeList as List } from "react-window";
import { FlightRow } from "./FlightRow";
import { useEffect, useMemo, useState } from "react";
export const FlightTable = ({ flights, selected, setSelected, toggleStatus, }) => {
    const [viewportHeight, setViewportHeight] = useState(() => typeof window !== "undefined" ? window.innerHeight : 900);
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
        if (totalPages <= maxButtons)
            return Array.from({ length: totalPages }, (_, i) => i + 1);
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
    return (_jsxs("div", { className: "table-container", children: [_jsxs("div", { className: "table-header", children: [_jsx("span", { className: "th-checkbox", "aria-hidden": "true" }), _jsx("span", { children: "ID" }), _jsx("span", { children: "AOC" }), _jsx("span", { children: "Flight No" }), _jsx("span", { children: "Origin" }), _jsx("span", { children: "Destination" }), _jsx("span", { children: "STD" }), _jsx("span", { children: "STA" }), _jsx("span", { children: "Status" }), _jsx("span", { children: "Actions" })] }), _jsx("div", { className: "table-body", children: paginatedFlights.length ? (_jsx(List, { height: listHeight, itemCount: paginatedFlights.length, itemSize: 60, width: "100%", children: ({ index, style }) => (_jsx("div", { style: style, children: _jsx(FlightRow, { flight: paginatedFlights[index], selected: selected, setSelected: setSelected, toggleStatus: toggleStatus }) })) })) : (_jsx("div", { className: "table-empty", children: "No flights found." })) }), _jsxs("div", { className: "table-footer", children: [_jsx("div", { className: "pagination-info", children: flights.length
                            ? `Showing ${(page - 1) * rowsPerPage + 1} to ${Math.min(page * rowsPerPage, flights.length)} of ${flights.length} flights`
                            : "Showing 0 flights" }), _jsxs("div", { className: "pagination-controls", children: [_jsx("button", { className: "pg-btn", onClick: () => setPage(1), disabled: page === 1, "aria-label": "First page", children: "\u00AB" }), _jsx("button", { className: "pg-btn", onClick: () => setPage((p) => Math.max(1, p - 1)), disabled: page === 1, "aria-label": "Previous page", children: "\u2039" }), _jsx("div", { className: "pg-pages", "aria-label": "Page numbers", children: pageNumbers.map((n) => (_jsx("button", { className: `pg-page ${n === page ? "active" : ""}`, onClick: () => setPage(n), children: n }, n))) }), _jsx("button", { className: "pg-btn", onClick: () => setPage((p) => Math.min(totalPages, p + 1)), disabled: page === totalPages, "aria-label": "Next page", children: "\u203A" }), _jsx("button", { className: "pg-btn", onClick: () => setPage(totalPages), disabled: page === totalPages, "aria-label": "Last page", children: "\u00BB" })] }), _jsxs("div", { className: "rows-per-page", children: ["Rows per page:", _jsx("select", { value: rowsPerPage, onChange: e => { setRowsPerPage(Number(e.target.value)); setPage(1); }, children: [10, 20, 50, 100].map(n => (_jsx("option", { value: n, children: n }, n))) })] })] })] }));
};
