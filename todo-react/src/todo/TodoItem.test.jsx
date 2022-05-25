/**
 * @jest-environment jsdom
 */
import React from "react";

import { render, screen, prettyDOM } from "@testing-library/react";
import "@testing-library/jest-dom"; // For focus matcher

import userEvent from "@testing-library/user-event";

import TodoItem from "./TodoItem";

describe("TodoItem", () => {
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
    render(<TodoItem initialText={todoText} />);

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

  it("calls the handler when checked", async () => {
    const handler = jest.fn();
    render(<TodoItem onChange={handler} checked={false} />);
    const checkbox = screen.getByRole("checkbox");

    await userEvent.click(checkbox);
    expect(handler).toBeCalled();
  });

  it("calls the handler when unchecked", async () => {
    const handler = jest.fn();
    render(<TodoItem onChange={handler} checked={true} />);
    const checkbox = screen.getByRole("checkbox");

    await userEvent.click(checkbox);
    expect(handler).toBeCalled();
  });

  it("clicking on the label does not checky the boxy", async () => {
    render(<TodoItem initialText="I am an item" />);

    const label = screen.getByText("I am an item");
    await userEvent.click(label);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  describe("edit mode", () => {
    let user;

    beforeEach(async () => {
      user = userEvent.setup();
      render(<TodoItem initialText="edit me" checked={true} />);

      const label = screen.getByText("edit me");

      await user.dblClick(label);
    });

    it("double clicking puts us in edit mode", () => {
      const li = screen.getByRole("listitem");
      expect(li.className.split(" ")).toContain("editing");
    });

    it("double clicking presents an input", () => {
      const input = screen.getByRole("textbox");
      expect(input).toBeTruthy();
    });

    it("label text goes away while editing", () => {
      expect(screen.queryByText("edit me")).toBeNull();
    });

    it("puts the todo item in the input", () => {
      const input = screen.getByRole("textbox");
      expect(input.value).toEqual("edit me");
    });

    it("focuses the input", () => {
      const input = screen.getByRole("textbox");
      expect(input).toHaveFocus();
    });

    it("is no longer in edit mode when blurred", async () => {
      const body = document.getElementsByTagName("body")[0];
      await user.click(body);

      const li = screen.getByRole("listitem");
      expect(li.className.split(" ")).not.toContain("editing");
    });

    it("it is no longer in edit mode when you hit return", async () => {
      const input = screen.getByRole("textbox");
      await user.type(input, "more things {enter}");

      const li = screen.getByRole("listitem");
      expect(li.className.split(" ")).not.toContain("editing");
    });

    it("the change is saved on blur", async () => {
      const input = screen.getByRole("textbox");
      await user.type(input, "tex");

      const body = document.getElementsByTagName("body")[0];
      await user.click(body);

      const li = screen.getByRole("listitem");
      expect(li.textContent).toEqual("edit metex");
    });
  });
});
