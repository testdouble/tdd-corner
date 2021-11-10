/**
 * @jest-environment jsdom
 */
import React from "react";

import {
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