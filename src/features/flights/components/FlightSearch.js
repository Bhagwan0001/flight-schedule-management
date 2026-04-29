import { jsx as _jsx } from "react/jsx-runtime";
export const FlightSearch = ({ value, onChange }) => {
    return (_jsx("div", { className: "filter-group", children: _jsx("input", { className: "input", 
            // fullWidth
            // size="small"
            placeholder: "Search flight, origin, destination", value: value, onChange: (e) => onChange(e.target.value) }) }));
};
