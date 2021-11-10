import React from "react";

export default function Todo(props) {
  const items = props.items || []
  return <>
    <div>This is a Title</div>
    <ul data-testid="todos">
      { items.map((item, i) => {
        return (<li key={i}>{ item }</li>)
      }) }
    </ul>
  </>
}
