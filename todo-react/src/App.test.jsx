/**
 * @jest-environment jsdom
 */
import React from "react";

import {
  render,
  screen,
} from '@testing-library/react'

import userEvent from '@testing-library/user-event'

import App from "./app";

describe('app', () => {
  let todoList, newTodoInput, newTodoSubmit;

  beforeEach(() => {
    render(<App />)
    todoList = screen.queryByTestId("todos")
    newTodoInput = screen.queryByTestId("new_todo_input")
    newTodoSubmit = screen.queryByTestId("new_todo_submit")
  })

  it('will render a todo list oh yes', () => {
    expect(todoList).toBeTruthy()
  });

  it('will render a place to add more todos', () => {
    expect(newTodoInput).toBeTruthy()
  })

  it('will render a submit button', () => {
    expect(newTodoSubmit).toBeTruthy()
  })

  describe('todo submission', () => {
    beforeEach(() => {
      userEvent.type(newTodoInput, "Finish This Test")
      userEvent.click(newTodoSubmit)
    })

    it('takes submitted newTodoInput and adds a todo item', () => {
      expect(todoList.children.length).toEqual(1)
    })

    it('clears the input box after submission', () => {
      expect(newTodoInput.value).toEqual("")
    })
  })

  it('surrounding whitespace is not included in todo item', () => {
    userEvent.type(newTodoInput, "    Finish This Test      ");
    userEvent.click(newTodoSubmit);

    const firstChild = todoList.children[0];
    expect(firstChild.textContent).toEqual("Finish This Test");
  })

  describe('invalid submissions', () => {
    it('empty string does not create an item', () => {
      userEvent.type(newTodoInput, "{selectall}{del}")
      userEvent.click(newTodoSubmit);

      expect(todoList.children.length).toEqual(0);
    })
  })
})
