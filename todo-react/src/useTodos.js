import { useState } from "react";

const useTodos = (list = []) => {
  const [todos, setTodos] = useState(list);

  const addTodoItem = (itemValue) => {
    setTodos([...todos, { value: itemValue, checked: false }]);
  };

  const checkAllTodos = (checked) => {
    setTodos((todos) => todos.map((t) => ({ ...t, checked })));
  };

  const toggleTodo = (toggleeIndex) => {
    todos[toggleeIndex].checked = !todos[toggleeIndex].checked

    setTodos([...todos]);
  };

  return {
    todos,
    addTodoItem,
    checkAllTodos,
    toggleTodo,
  };
};

export default useTodos;
