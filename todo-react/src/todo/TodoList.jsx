import React, { useState } from "react";
import TodoItem from "./TodoItem";

export default function Todo(props) {
  const { items = [], checkAllTodos, toggleTodo } = props;

  return (
    <>
      <input
        type="checkbox"
        data-testid="mark_all_checkbox"
        onChange={(e) => {
          checkAllTodos(e.target.checked);
        }}
      ></input>
      <ul data-testid="todos">
        {items.map((item, index) => {
          return (
            <TodoItem
              key={index}
              text={item.value}
              checked={item.checked}
              onChange={() => toggleTodo(index)}
            />
          );
        })}
      </ul>
    </>
  );
}
