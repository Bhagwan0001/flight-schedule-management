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

  return (
    <MainLayout onClearAll={state.clearAllFilters} onRefresh={state.refreshFlights}>
      <div className="top-bar">
        <FlightSearch value={state.search} onChange={state.setSearch} />
        <FlightFilters
          filters={state.filters}
          setFilters={state.setFilters}
          aocOptions={aocOptions}
        />
      </div>

      <BulkActions
        selected={state.selected}
        deleteFlights={state.deleteFlights}
      />

      <FlightTable
        flights={state.filteredFlights}
        selected={state.selected}
        setSelected={state.setSelected}
        toggleStatus={state.toggleStatus}
      />
    </MainLayout>
  );
}

export default App;