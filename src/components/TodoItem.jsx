import { useTodos } from "../context/TodosContext";

export default function TodoItem({ todo }) {
  const { actions } = useTodos();

  return (
    <li className="item">
      <input
        type="checkbox"
        className="checkbox"
        checked={todo.done}
        onChange={() => actions.toggle(todo.id)}
        aria-label={`Mark ${todo.text} as done`}
      />
      <span className={`text ${todo.done ? "done" : ""}`}>{todo.text}</span>
      <button className="delete" onClick={() => actions.remove(todo.id)} title="Delete">
        ✕
      </button>
    </li>
  );
}
