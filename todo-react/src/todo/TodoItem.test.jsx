/**
 * @jest-environment jsdom
 */
import React from "react";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // For focus matcher

import userEvent from "@testing-library/user-event";

import TodoItem from "./TodoItem";

describe("app", () => {
  it("renders a checkbox", () => {
    render(<TodoItem />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeTruthy();
  });

  it("has a list item", () => {
    render(<TodoItem />);
    const listItem = screen.getByRole("listitem");
    expect(listItem).toBeTruthy();
  });

  it("has todo text", () => {
    const todoText = "I am a todo.";
    render(<TodoItem text={todoText} />);

    const listItem = screen.getByRole("listitem");
    expect(listItem.textContent).toEqual(todoText);
  });

  it("starts out checked", () => {
    render(<TodoItem checked={true} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeTruthy();

    expect(checkbox).toBeChecked();
  });

  it("A completed item has a completed class", () => {
    render(<TodoItem checked={true} />);

    const li = screen.getByRole("listitem");

    expect(li.className).toContain("completed");
  });

  it("An incompleted item has no completed class", () => {
    render(<TodoItem checked={false} />);

    const li = screen.getByRole("listitem");

    expect(li.className).not.toContain("completed");
  });

  it("starts out unchecked", () => {
    render(<TodoItem checked={false} />);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).not.toBeChecked();
  });

  it("calls the handler when checked", () => {
    const handler = jest.fn();
    render(<TodoItem onChange={handler} checked={false} />);
    const checkbox = screen.getByRole("checkbox");

    userEvent.click(checkbox);
    expect(handler).toBeCalled();
  });

  it("calls the handler when unchecked", () => {
    const handler = jest.fn();
    render(<TodoItem onChange={handler} checked={true} />);
    const checkbox = screen.getByRole("checkbox");

    userEvent.click(checkbox);
    expect(handler).toBeCalled();
  });

  it("clicking on the label checks the box", () => {
    render(<TodoItem text="I am an item" checked={true} />);

    const label = screen.getByLabelText("I am an item");
    userEvent.click(label);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  it("double clicking puts us in edit mode", () => {
    render(<TodoItem text="edit me" checked={true} />);

    const label = screen.getByLabelText("edit me");
    userEvent.dblClick(label);

    // Double-clicking the `<label>` activates editing mode, by toggling the `.editing` class on its `<li>`
    expect(toBeInEditMode());
  });
});
