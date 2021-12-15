/**
 * @jest-environment jsdom
 */
import React from "react";

import {
  render,
  screen,
} from '@testing-library/react'
import "@testing-library/jest-dom" // For focus matcher

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

  it('will focus on the todo item', () => {
    expect(newTodoInput).toHaveFocus();
  })

  describe('todo submission with button click (this is our normal case)', () => {
    // click happy paths
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

  describe('todo keyboard submission - just make sure enter works', () => {
    // enter happy paths
    it('it submits the form when the user presses enter', () => {
      userEvent.type(newTodoInput, "Finish This Test {enter}")
      const firstChild = todoList.children[0];
      expect(firstChild.textContent).toEqual("Finish This Test");
    })
  })

  it('surrounding whitespace is not included in todo item', () => {
    userEvent.type(newTodoInput, "    Finish This Test      ");
    userEvent.click(newTodoSubmit);

    const firstChild = todoList.children[0];
    expect(firstChild.textContent).toEqual("Finish This Test");
  })

  describe('invalid submissions', () => {
    it('it does not create a list item when input is blank', () => {
      userEvent.type(newTodoInput, "{enter}")

      expect(todoList.children.length).toEqual(0);
    })

    it('it does not create a list item when input is just whitespace', () => {
      userEvent.type(newTodoInput, "{selectall}{del}    {enter}")

      expect(todoList.children.length).toEqual(0);
    })
  })
})
