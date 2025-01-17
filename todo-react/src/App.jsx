import React, { useState } from "react";
import TodoList from "./todo";
import useTodos from "./useTodos";

export default () => {
  const [newTodo, setNewTodo] = useState("");
  const {
    todos,
    addTodoItem,
    toggleTodo,
    checkAllTodos,
    areAllChecked,
    clearAllChecked,
    areAnyChecked,
  } = useTodos();

  const cleanTodo = (todo) => {
    return todo.trim();
  };

  const addNewTodo = () => {
    const cleanedTodo = cleanTodo(newTodo);
    if (cleanedTodo) {
      addTodoItem(cleanedTodo);
      setNewTodo("");
    }
  };

  const handleClick = addNewTodo;

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addNewTodo();
    }
  };

  return (
    <>
      <input
        data-testid="new_todo_input"
        id="new_todo_input"
        autoFocus
        value={newTodo}
        onChange={(e) => {
          setNewTodo(e.target.value);
        }}
        onKeyPress={handleKeyPress}
      />
      <input
        type="submit"
        data-testid="new_todo_submit"
        onClick={handleClick}
      />
      <TodoList
        items={todos}
        checkAllTodos={checkAllTodos}
        toggleTodo={toggleTodo}
        areAllChecked={areAllChecked()}
      />
      {areAnyChecked() && (
        <input
          type="button"
          value="Clear All Completed Todos"
          data-testid="clear_completed_todos"
          onClick={clearAllChecked}
        />
      )}
    </>
  );
};
