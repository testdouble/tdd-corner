import React from "react";

export default function Todo(props) {
  const items = props.items || []
  return <>
    <input type="checkbox" data-testid="mark_all_checkbox" ></input>
    <ul data-testid="todos">
      { items.map((item, i) => {
         // return <TodoItem />
        return (<li key={i}>{ item }</li>)
      }) }
    </ul>
  </>
}
