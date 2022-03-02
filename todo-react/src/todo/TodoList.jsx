import React, {useState} from "react";
import TodoItem from "./TodoItem";

export default function Todo(props) {
  const {items = [], onMarkAllToggled} = props



  return <>
    <input type="checkbox" data-testid="mark_all_checkbox" onChange={ onMarkAllToggled }></input>
    <ul data-testid="todos">
      { items.map((item, i) => {
        return (<TodoItem key={i} text={item.value} checked={item.checked} onChange={(event) => { event.target.checked = true } } />)
      }) }
    </ul>
  </>
}
