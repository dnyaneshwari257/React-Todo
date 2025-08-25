import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const TodosContext = createContext(null);

const initialState = { todos: [], filter: "all" }; // filter: all | active | completed

function reducer(state, action) {
  switch (action.type) {
    case "add": {
      const text = action.text.trim();
      if (!text) return state;
      const todo = {
        id: crypto?.randomUUID?.() ?? String(Date.now() + Math.random()),
        text,
        done: false,
        createdAt: Date.now(),
      };
      return { ...state, todos: [todo, ...state.todos] };
    }
    case "toggle": {
      const todos = state.todos.map(t =>
        t.id === action.id ? { ...t, done: !t.done } : t
      );
      return { ...state, todos };
    }
    case "remove": {
      const todos = state.todos.filter(t => t.id !== action.id);
      return { ...state, todos };
    }
    case "clearCompleted": {
      return { ...state, todos: state.todos.filter(t => !t.done) };
    }
    case "setFilter": {
      return { ...state, filter: action.filter };
    }
    case "hydrate": {
      return action.state;
    }
    default:
      return state;
  }
}

export function TodosProvider({ children }) {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    (init) => {
      // lazy init from localStorage
      const raw = localStorage.getItem("todos_state");
      return raw ? JSON.parse(raw) : init;
    }
  );

  // persist to localStorage
  useEffect(() => {
    localStorage.setItem("todos_state", JSON.stringify(state));
  }, [state]);

  const stats = useMemo(() => {
    const total = state.todos.length;
    const completed = state.todos.filter(t => t.done).length;
    const active = total - completed;
    return { total, active, completed };
  }, [state.todos]);

  const visibleTodos = useMemo(() => {
    switch (state.filter) {
      case "active": return state.todos.filter(t => !t.done);
      case "completed": return state.todos.filter(t => t.done);
      default: return state.todos;
    }
  }, [state.todos, state.filter]);

  const actions = {
    add: (text) => dispatch({ type: "add", text }),
    toggle: (id) => dispatch({ type: "toggle", id }),
    remove: (id) => dispatch({ type: "remove", id }),
    clearCompleted: () => dispatch({ type: "clearCompleted" }),
    setFilter: (filter) => dispatch({ type: "setFilter", filter }),
  };

  const value = { state, actions, visibleTodos, stats };
  return <TodosContext.Provider value={value}>{children}</TodosContext.Provider>;
}

export function useTodos() {
  const ctx = useContext(TodosContext);
  if (!ctx) throw new Error("useTodos must be used inside <TodosProvider>");
  return ctx;
}
