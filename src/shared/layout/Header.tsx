import { FilterX } from "lucide-react";

type HeaderProps = {
  onRefresh?: () => void;
  onClearAll?: () => void;
};

export const Header = ({ onClearAll }: HeaderProps) => {
  return (
    <div className="header">
      <div className="header-left">
        <h1>Flight Schedule Management</h1>
        <p className="subtext">View, search, filter and manage flight schedules</p>
      </div>
      <div className="header-actions">
        <button className="btn btn-outline" onClick={onClearAll}>
          <FilterX size={16} />
          Clear All Filters
        </button>
      </div>
    </div>
  );
};    