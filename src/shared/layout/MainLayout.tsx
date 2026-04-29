import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export const MainLayout = ({ children, onClearAll, onRefresh }: any) => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <div className="content-inner">
          <Header onRefresh={onRefresh} onClearAll={onClearAll} />
          {children}
        </div>
      </div>
    </div>
  );
};