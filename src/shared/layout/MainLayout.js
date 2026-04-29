import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
export const MainLayout = ({ children, onClearAll, onRefresh }) => {
    return (_jsxs("div", { className: "layout", children: [_jsx(Sidebar, {}), _jsx("div", { className: "content", children: _jsxs("div", { className: "content-inner", children: [_jsx(Header, { onClearAll: onClearAll, onRefresh: onRefresh }), children] }) })] }));
};
