/**
 * @jest-environment jsdom
 */
import React from "react";
import { unmountComponentAtNode } from "react-dom";
// import { within }
import { render, screen, within } from "@testing-library/react";

import "@testing-library/jest-dom"; // For focus matcher

import userEvent from "@testing-library/user-event";
import TodoList from "./TodoList";

let container = null;

describe("todo list", () => {
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  describe("when the list is empty", () => {
    it("renders a list with no items", () => {
      const list = [];
      const output = render(<TodoList items={list} />, container);
      const ul = output.queryByTestId("todos");
      expect(ul.children.length).toEqual(0);
    });
  });

  describe("when the list has one item", () => {
    it("renders a list with one item", () => {
      const list = [{ value: "a list item", checked: false }];
      const output = render(<TodoList items={list} />, container);
      const ul = output.queryByTestId("todos");
      expect(ul.children.length).toEqual(1);
    });

    it("renders a list item with content", () => {
      const list = [{ value: "a list item", checked: false }];
      const output = render(<TodoList items={list} />, container);
      const ul = output.queryByTestId("todos");
      expect(ul.children.length).toEqual(1);
      const firstChild = ul.children[0];
      expect(firstChild.textContent).toEqual(list[0].value);
    });
  });

  describe("when the list has multiple items", () => {
    it("renders a list with multiple items", () => {
      const list = [{ value: "a list item" }, { value: "another item" }];
      const output = render(<TodoList items={list} />, container);
      const ul = output.queryByTestId("todos");
      expect(ul.children.length).toEqual(2);
    });

    it("renders a list item with content", () => {
      const list = [{ value: "one" }, { value: "two" }];
      const output = render(<TodoList items={list} />, container);
      const ul = output.queryByTestId("todos");
      expect(ul.children[0].textContent).toEqual("one");
      expect(ul.children[1].textContent).toEqual("two");
    });

    it("renders a list item with some of the items checked", () => {
      const list = [{ value: "one" }, { value: "two", checked: true }];
      const output = render(<TodoList items={list} />, container);
      const ul = output.queryByTestId("todos");
      expect(within(ul).getAllByRole("checkbox")[0]).not.toBeChecked();
      expect(within(ul).getAllByRole("checkbox")[1]).toBeChecked();
    });
  });

  describe("mark all as complete", () => {
    it("renders a checkbox", () => {
      const output = render(<TodoList />);
      const markAllCheckbox = screen.queryByTestId("mark_all_checkbox");
      expect(markAllCheckbox).toBeTruthy();
    });

    it("callsback the callback", () => {
      const items = [];
      const cb = jest.fn();

      const output = render(<TodoList items={items} checkAllTodos={cb} />);
      const markAllCheckbox = screen.queryByTestId("mark_all_checkbox");
      userEvent.click(markAllCheckbox);

      expect(cb).toHaveBeenCalled();
    });
  });
});
