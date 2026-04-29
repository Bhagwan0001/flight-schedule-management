import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MainLayout } from "./shared/layout/MainLayout";
import { FlightSearch } from "./features/flights/components/FlightSearch";
import { FlightFilters } from "./features/flights/components/FlightFilters";
import { FlightTable } from "./features/flights/components/FlightTable";
import { BulkActions } from "./features/flights/components/BulkActions";
import { useFlights } from "./features/flights/hooks/useFlights";
function App() {
    const state = useFlights();
    // Dummy AOC options for demonstration
    const aocOptions = ["FD", "D7", "QZ", "AK"];
    return (_jsxs(MainLayout, { onClearAll: state.clearAllFilters, onRefresh: state.refreshFlights, children: [_jsxs("div", { className: "top-bar", children: [_jsx(FlightSearch, { value: state.search, onChange: state.setSearch }), _jsx(FlightFilters, { filters: state.filters, setFilters: state.setFilters, aocOptions: aocOptions })] }), _jsx(BulkActions, { selected: state.selected, deleteFlights: state.deleteFlights }), _jsx(FlightTable, { flights: state.filteredFlights, selected: state.selected, setSelected: state.setSelected, toggleStatus: state.toggleStatus })] }));
}
export default App;
