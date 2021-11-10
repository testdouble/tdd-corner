/**
 * @jest-environment jsdom
 */
import React from "react";
import { unmountComponentAtNode } from "react-dom";

import {
  render,
} from '@testing-library/react'

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
      const output = render(<Todo items={list}/>, container);
      const ul = output.queryByTestId("todos")
      expect(ul.children.length).toEqual(0)
    });
});

describe('when the list has one item', () => {
  it('renders a list with one item', () => {
    const list = ['a list item']
    const output = render(<Todo items={list}/>, container);
    const ul = output.queryByTestId("todos")
    expect(ul.children.length).toEqual(1)
  })

  it('renders a list item with content', () => {
    const list = ['a list item']
    const output = render(<Todo items={list}/>, container);
    const ul = output.queryByTestId("todos")
    expect(ul.children.length).toEqual(1)
    const firstChild = ul.children[0];
    expect(firstChild.textContent).toEqual(list[0]);
  });
})

describe('when the list has multiple items', () => {
  it('renders a list with multiple items', () => {
    const list = ['a list item', 'another item']
    const output = render(<Todo items={list}/>, container);
    const ul = output.queryByTestId("todos")
    expect(ul.children.length).toEqual(2)
  })

  it('renders a list item with content', () => {
    const list = ['one', 'two']
    const output = render(<Todo items={list}/>, container);
    const ul = output.queryByTestId("todos")
    expect(ul.children[0].textContent).toEqual('one');
    expect(ul.children[1].textContent).toEqual('two');
  });
})