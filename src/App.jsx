import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Filters from "./components/Filters";
import Stats from "./components/Stats";
import { TodosProvider, useTodos } from "./context/TodosContext";

function Toolbar() {
  const { actions, stats } = useTodos();
  return (
    <div className="footer">
      <Stats />
      <div className="row">
        <Filters />
        <button
          className="button"
          onClick={actions.clearCompleted}
          disabled={stats.completed === 0}
          title="Remove all completed tasks"
        >
          Clear Completed
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <TodosProvider>
      <div className="app">
        <div className="header">
          <div className="title">React Todo</div>
        </div>

        <TodoInput />
        <TodoList />
        <Toolbar />
      </div>
    </TodosProvider>
  );
}
