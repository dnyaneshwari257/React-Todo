import { useState } from "react";
import { useTodos } from "../context/TodosContext";

export default function TodoInput() {
  const [text, setText] = useState("");
  const { actions } = useTodos();

  function onSubmit(e) {
    e.preventDefault();
    actions.add(text);
    setText("");
  }

  return (
    <form className="row" onSubmit={onSubmit} aria-label="Add todo">
      <input
        className="input"
        placeholder="What do you want to get done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="button" type="submit">Add</button>
    </form>
  );
}
