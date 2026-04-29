import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FilterX } from "lucide-react";
export const Header = ({ onClearAll }) => {
    return (_jsxs("div", { className: "header", children: [_jsxs("div", { className: "header-left", children: [_jsx("h1", { children: "Flight Schedule Management" }), _jsx("p", { className: "subtext", children: "View, search, filter and manage flight schedules" })] }), _jsx("div", { className: "header-actions", children: _jsxs("button", { className: "btn btn-outline", onClick: onClearAll, children: [_jsx(FilterX, { size: 16 }), "Clear All Filters"] }) })] }));
};
