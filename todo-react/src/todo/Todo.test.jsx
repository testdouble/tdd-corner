/**
 * @jest-environment jsdom
 */
import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import {
  render,
  getByLabelText,
  getByText,
  getByTestId,
  queryByTestId,
  // Tip: all queries are also exposed on an object
  // called "queries" which you could import here as well
  waitFor,
} from '@testing-library/react'
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom'

import Todo from "./todo";

let container = null;

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

it("shows the user a title", () => {

  const output = render(<Todo />);
  const title = output.getByText("This is a Title");
  expect(title).toBeTruthy();
});

describe("when the list is empty", () => {
    it("renders a list with no items", () => {
        const list = []
        // act(() => {
            const output = render(<Todo items={list}/>, container);
        // });
        const ul = output.queryByTestId("todos")
        expect(ul.length).toEqual(0)
    });
});
