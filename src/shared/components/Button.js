import { jsx as _jsx } from "react/jsx-runtime";
export const Button = ({ children, ...props }) => {
    return (_jsx("button", { className: "btn", ...props, children: children }));
};
