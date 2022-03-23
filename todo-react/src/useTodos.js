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

  const areAllChecked = () => {
    return todos.every((t) => t.checked);
  };

  const clearAllChecked = () => {
    setTodos(
      todos.filter((t) => !t.checked )
    );
  }

  return {
    todos,
    addTodoItem,
    checkAllTodos,
    toggleTodo,
    areAllChecked,
    clearAllChecked,
  };
};

export default useTodos;
