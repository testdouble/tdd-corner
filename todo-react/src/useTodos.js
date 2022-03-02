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

  const toggleTodo = (togglee) => {
    setTodos(t => t.map(todo => {
      if (togglee.value === todo.value ) {
        return {...todo,checked: !todo.checked}
      }
      return todo
    }))
  }

  return {
    todos,
    addTodoItem,
    checkAllTodos,
    toggleTodo
  }
}

export default useTodos