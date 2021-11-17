import React, { useState } from "react";
import Todo from "./todo";

export default () => {
  const todoItems = []
  const [newTodo, setNewTodo] = useState("");

  return (
    <>
      <input data-testid="new_todo_input" id="new_todo_input" onChange={(e) => { setNewTodo(e.target.value) } } />
      <input type="submit" data-testid="new_todo_submit" onClick={() => { todoItems.push(newTodo) } } />
      <Todo items={ todoItems } />
    </>
  );
};
