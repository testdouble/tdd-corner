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
});
