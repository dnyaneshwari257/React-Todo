import { useTodos } from "../context/TodosContext";

export default function Stats() {
  const { stats } = useTodos();
  return (
    <div>
      <strong>{stats.active}</strong> left •{" "}
      <strong>{stats.completed}</strong> done •{" "}
      <strong>{stats.total}</strong> total
    </div>
  );
}
