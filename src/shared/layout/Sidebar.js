import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Send, Plane, User } from "lucide-react";
export const Sidebar = () => {
    return (_jsxs("div", { className: "sidebar", children: [_jsxs("div", { className: "sidebar-logo", children: [_jsx(Send, { size: 24, className: "logo-icon" }), _jsx("h2", { children: "TELEPORT" })] }), _jsx("div", { className: "sidebar-nav", children: _jsxs("div", { className: "sidebar-item active", children: [_jsx(Plane, { size: 18 }), _jsx("span", { children: "Flight Schedules" })] }) }), _jsx("div", { className: "user-profile", children: _jsxs("div", { className: "sidebar-user", children: [_jsx(User, { size: 18 }), _jsxs("div", { className: "user-info", children: [_jsx("div", { className: "user-name", children: "Admin User" }), _jsx("div", { className: "user-email", children: "admin@teleport.com" })] })] }) })] }));
};
