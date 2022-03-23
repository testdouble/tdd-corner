/**
 * @jest-environment jsdom
 */
import React from "react";

import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom"; // For focus matcher

import userEvent from "@testing-library/user-event";

import App from "./app";

describe("app", () => {
  let todoList,
    newTodoInput,
    newTodoSubmit,
    markAllCheckedBox,
    clearCompletedTodosBtn;

  beforeEach(() => {
    render(<App />);
    todoList = screen.queryByTestId("todos");
    newTodoInput = screen.queryByTestId("new_todo_input");
    newTodoSubmit = screen.queryByTestId("new_todo_submit");
    markAllCheckedBox = screen.queryByTestId("mark_all_checkbox");
    clearCompletedTodosBtn = screen.queryByTestId("clear_completed_todos");
  });

  it("will render a todo list oh yes", () => {
    expect(todoList).toBeTruthy();
  });

  it("will render a place to add more todos", () => {
    expect(newTodoInput).toBeTruthy();
  });

  it("will render a submit button", () => {
    expect(newTodoSubmit).toBeTruthy();
  });

  it("will focus on the todo item", () => {
    expect(newTodoInput).toHaveFocus();
  });

  describe("todo submission with button click (this is our normal case)", () => {
    // click happy paths
    beforeEach(() => {
      userEvent.type(newTodoInput, "Finish This Test");
      userEvent.click(newTodoSubmit);
    });

    it("takes submitted newTodoInput and adds a todo item", () => {
      expect(todoList.children.length).toEqual(1);
    });

    it("clears the input box after submission", () => {
      expect(newTodoInput.value).toEqual("");
    });
  });

  describe("todo keyboard submission - just make sure enter works", () => {
    // enter happy paths
    it("it submits the form when the user presses enter", () => {
      userEvent.type(newTodoInput, "Finish This Test {enter}");
      const firstChild = todoList.children[0];
      expect(firstChild.textContent).toEqual("Finish This Test");
    });
  });

  it("surrounding whitespace is not included in todo item", () => {
    userEvent.type(newTodoInput, "    Finish This Test      ");
    userEvent.click(newTodoSubmit);

    const firstChild = todoList.children[0];
    expect(firstChild.textContent).toEqual("Finish This Test");
  });

  describe("invalid submissions", () => {
    it("it does not create a list item when input is blank", () => {
      userEvent.type(newTodoInput, "{enter}");

      expect(todoList.children.length).toEqual(0);
    });

    it("it does not create a list item when input is just whitespace", () => {
      userEvent.type(newTodoInput, "{selectall}{del}    {enter}");

      expect(todoList.children.length).toEqual(0);
    });
  });

  it("checks a To Do item", () => {
    // Type in box
    userEvent.type(newTodoInput, "    Finish This Test      ");
    // Click 'Submit',-.
    userEvent.click(newTodoSubmit);

    const itemCheckbox = within(todoList).getByRole("checkbox");
    // Check the actual box
    userEvent.click(itemCheckbox);
    // Check that item is checked
    expect(itemCheckbox).toBeChecked();
  });

  it("checks all the To Do items", () => {
    // Type in box
    userEvent.type(newTodoInput, "    Finish This Test      ");
    // Click 'Submit',-.
    userEvent.click(newTodoSubmit);

    // Type in box
    userEvent.type(newTodoInput, "    Finish This Second Test      ");
    // Click 'Submit',-.
    userEvent.click(newTodoSubmit);

    // find check-all checkbox
    const newCheckAllCheckbox = screen.queryByTestId("mark_all_checkbox");

    // check it
    userEvent.click(newCheckAllCheckbox);

    const todos = screen.queryByTestId("todos");
    const checkboxes = within(todos).getAllByRole("checkbox");
    checkboxes.forEach((cb) => {
      expect(cb).toBeChecked();
    });
  });

  it("unchecks all the To Do items", () => {
    // Type in box
    userEvent.type(newTodoInput, "    Finish This Test      ");
    // Click 'Submit',-.
    userEvent.click(newTodoSubmit);

    // Type in box
    userEvent.type(newTodoInput, "    Finish This Second Test      ");
    // Click 'Submit',-.
    userEvent.click(newTodoSubmit);

    // find check-all checkbox
    const newCheckAllCheckbox = screen.queryByTestId("mark_all_checkbox");

    // check it
    userEvent.click(newCheckAllCheckbox);

    // uncheck it
    userEvent.click(newCheckAllCheckbox);

    const todos = screen.queryByTestId("todos");
    const checkboxes = within(todos).getAllByRole("checkbox");
    checkboxes.forEach((cb) => {
      expect(cb).not.toBeChecked();
    });
  });

  it("verifies the Mark All Checked box is checked when all the items are checked", () => {
    // Type in box
    userEvent.type(newTodoInput, "    Finish This Test      ");
    // Click 'Submit',-.
    userEvent.click(newTodoSubmit);

    const itemCheckbox = within(todoList).getByRole("checkbox");
    // Check the actual box
    userEvent.click(itemCheckbox);
    // Check that item is checked
    expect(markAllCheckedBox).toBeChecked();
  });

  describe("clear completed button", () => {
    it("exists", () => {
      expect(clearCompletedTodosBtn).toBeTruthy();
    });

    it("clears a completed todo", () => {
      // Type in box
      userEvent.type(newTodoInput, "    Finish This Test      ");
      // Click 'Submit'
      userEvent.click(newTodoSubmit);

      // Check the actual box
      const itemCheckbox = within(todoList).getByRole("checkbox");
      userEvent.click(itemCheckbox);

      // Click the clear completed todos button
      userEvent.click(clearCompletedTodosBtn);

      // Check that the todo is gone
      expect(todoList.children.length).toEqual(0);
    });
  });
});
