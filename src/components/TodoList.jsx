import { useTodos } from "../context/TodosContext";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { visibleTodos } = useTodos();
  if (visibleTodos.length === 0) {
    return <p style={{opacity:.8, marginTop: 12}}>No items here yet. Add something! ✨</p>;
  }
  return (
    <ul className="list">
      {visibleTodos.map(t => <TodoItem key={t.id} todo={t} />)}
    </ul>
  );
}
