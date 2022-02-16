import { useState } from "react";


const useTodos = (list = []) => {
  const [todos, setTodos] = useState(list);

  const addTodoItem = (itemValue) => {
    setTodos([
      ...todos,
      {value: itemValue, checked: false}
    ]);
  };

  const checkAllTodos = () => {
    setTodos(todos => todos.map(t => ({...t, checked: true})))
  }

  return {
    todos,
    addTodoItem,
    checkAllTodos
  }
}

export default useTodos