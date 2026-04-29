import {
  Send,
  Plane,
  User
} from "lucide-react";

export const Sidebar = () => {
  return (
    <div className="sidebar">

      {/* Logo */}
      <div className="sidebar-logo">
        <Send size={24} className="logo-icon" />
        <h2>TELEPORT</h2>
      </div>

      {/* Navigation */}
      <div className="sidebar-nav">
        <div className="sidebar-item active">
          <Plane size={18} />
          <span>Flight Schedules</span>
        </div>
      </div>

      {/* User Profile */}
      <div className="user-profile">
        <div className="sidebar-user">
          <User size={18} />
          <div className="user-info">
            <div className="user-name">Admin User</div>
            <div className="user-email">admin@teleport.com</div>
          </div>
        </div>
      </div>

    </div>
  );
};