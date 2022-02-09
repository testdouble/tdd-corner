import { useState } from "react";


const useTodos = () => {
  const [todos, setTodos] = useState([]);

  const addTodoItem = (itemValue) => {
    setTodos([
      ...todos,
      {value: itemValue, checked: false}
    ]);
  };
  
  return [
    todos,
    addTodoItem,
  ]
}

export default useTodos