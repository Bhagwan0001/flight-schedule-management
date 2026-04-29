import { jsx as _jsx } from "react/jsx-runtime";
export const Select = ({ children, ...props }) => {
    return _jsx("select", { className: "select", ...props, children: children });
};
