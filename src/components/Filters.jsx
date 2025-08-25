import { useTodos } from "../context/TodosContext";

const options = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "completed", label: "Completed" },
];

export default function Filters() {
  const { state, actions } = useTodos();

  return (
    <div className="filters" role="tablist" aria-label="Filter todos">
      {options.map(opt => (
        <button
          key={opt.id}
          className={`filter-btn ${state.filter === opt.id ? "active" : ""}`}
          onClick={() => actions.setFilter(opt.id)}
          role="tab"
          aria-selected={state.filter === opt.id}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
