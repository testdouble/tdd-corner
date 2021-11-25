/**
 * @jest-environment jsdom
 */
import React from "react";

import {
  fireEvent,
  render,
} from '@testing-library/react'

import App from "./app";

it('will render a todo list oh yes', () => {
  const output = render(<App />);
  const ul = output.queryByTestId("todos")
  expect(ul).toBeTruthy()
});

it('will render a place to add more todos', () => {
  const output = render(<App />);
  const input = output.queryByTestId("new_todo_input")
  expect(input).toBeTruthy()
})

it('will render a submit button', () => {
  const output = render(<App />);
  const submit = output.queryByTestId("new_todo_submit")
  expect(submit).toBeTruthy()
})

describe('todo submission', () => {
  it('takes submitted input and adds a todo item', () => {
    const app = render(<App />);
    const input = app.queryByTestId("new_todo_input")
    fireEvent.change(input, {target: { value: "Finish This Test"} });
    app.queryByTestId("new_todo_submit").click()

    const list = app.queryByTestId("todos")
    expect(list.children.length).toEqual(1)
  })

  it('clears the input box after submission', () => {
    const app = render(<App />);
    const input = app.queryByTestId("new_todo_input")
    fireEvent.change(input, {target: { value: "Finish This Test"} });
    app.queryByTestId("new_todo_submit").click()

    expect(input.value).toEqual("")
  })
})

// test that empty submissions don't work