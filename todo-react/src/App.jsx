import React, { useState } from "react";
import Todo from "./todo";

export default () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleClick = () => {
    if(newTodo)  {
      setTodos(todos => [...todos, newTodo]);
      setNewTodo('');
    }
  }

  return (
    <>
      <input data-testid="new_todo_input" id="new_todo_input" value={newTodo} onChange={(e) => { setNewTodo(e.target.value) } } />
      <input type="submit" data-testid="new_todo_submit" onClick={handleClick} />
      <Todo items={ todos } />
    </>
  );
};
