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

import TodoItem from "./TodoItem";

describe("app", () => {
  let whatever;

  beforeEach(() => {
    render(<TodoItem />);
  });

  it("renders a checkbox", () => {
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeTruthy();
  });

  it("has a list item", () => {
    const listItem = screen.getByRole("listitem");
    expect(listItem).toBeTruthy();
  });

  it("has todo text", () => {
    const listItem = screen.getByRole("listitem");
    const todoText = "I am a todo";

    expect(listItem.textContent).toEqual(todoText)
  });
});