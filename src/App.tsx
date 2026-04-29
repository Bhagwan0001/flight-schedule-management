import { MainLayout } from "./shared/layout/MainLayout";
import { FlightSearch } from "./features/flights/components/FlightSearch";
import { FlightFilters } from "./features/flights/components/FlightFilters";
import { FlightTable } from "./features/flights/components/FlightTable";
import { BulkActions } from "./features/flights/components/BulkActions";
import { useFlights } from "./features/flights/hooks/useFlights";


function App() {
  const state = useFlights();
  const aocOptions = Array.from(new Set(state.flights.map((flight) => flight.aoc))).sort();

  return (
    <MainLayout onClearAll={state.clearAllFilters} onRefresh={state.refreshFlights}>
      {state.errorMessage ? (
        <div className="alert-banner">
          <span>{state.errorMessage}</span>
          <button className="btn btn-outline" onClick={state.clearError}>
            Dismiss
          </button>
        </div>
      ) : null}

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
        updateFlight={state.updateFlight}
        savingIds={state.savingIds}
      />
    </MainLayout>
  );
}

export default App;