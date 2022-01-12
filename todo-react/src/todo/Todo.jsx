import React from "react";
import TodoItem from "./TodoItem";

export default function Todo(props) {
  const items = props.items || []
  const todos = items.map((value) => {
    return {
      value,
      checked:false
    }
  })

  function onMarkAllToggled() {

  }

  return <>
    <input type="checkbox" data-testid="mark_all_checkbox" onChange={ onMarkAllToggled }></input>
    <ul data-testid="todos">
      { todos.map((todo, i) => {
        return (<TodoItem key={i} text={todo.value} checked={todo.checked} />)
      }) }
    </ul>
  </>
}
