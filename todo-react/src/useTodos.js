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
    todos[toggleeIndex].checked = !todos[toggleeIndex].checked;

    setTodos([...todos]);
  };

  const areAllChecked = () => {
    if(!todos.length) return false;

    return todos.every((t) => t.checked);
  };

  const clearAllChecked = () => {
    setTodos(todos.filter((t) => !t.checked));
  };

  const areAnyChecked = () => {
    return todos.some((todo) => {
      return todo.checked;
    });
  };

  return {
    todos,
    addTodoItem,
    checkAllTodos,
    toggleTodo,
    areAllChecked,
    clearAllChecked,
    areAnyChecked,
  };
};

export default useTodos;
