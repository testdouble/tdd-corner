import useTodos from "./useTodos";
import { renderHook, act } from "@testing-library/react-hooks";

describe("creating todos", () => {
  it("adds one to an empty list", () => {
    const { result } = renderHook(() => useTodos());
    const { addTodoItem } = result.current;
    act(() => {
      addTodoItem("new item");
    });
    const { todos } = result.current;
    expect(todos).toEqual([{ value: "new item", checked: false }]);
  });

  it("adds one to an existing list", () => {
    const existing = [{ value: "stuff", checked: true }];
    const { result } = renderHook(() => useTodos(existing));
    const { addTodoItem } = result.current;
    act(() => {
      addTodoItem("new item");
    });
    const { todos } = result.current;

    expect(todos).toEqual([
      { value: "stuff", checked: true },
      { value: "new item", checked: false },
    ]);
  });
});

describe("checks all todos", () => {
  it("checks all todos", () => {
    const existing = [
      { value: "stuff", checked: false },
      { value: "baba booey", checked: false },
    ];
    const { result } = renderHook(() => useTodos(existing));

    const { checkAllTodos } = result.current;
    act(() => {
      checkAllTodos(true);
    });
    const { todos } = result.current;

    expect(todos).toEqual([
      { value: "stuff", checked: true },
      { value: "baba booey", checked: true },
    ]);
  });

  it("unchecks all todos", () => {
    const existing = [
      { value: "stuff", checked: true },
      { value: "baba booey", checked: true },
    ];
    const { result } = renderHook(() => useTodos(existing));

    const { checkAllTodos } = result.current;
    act(() => {
      checkAllTodos(false);
    });
    const { todos } = result.current;

    expect(todos).toEqual([
      { value: "stuff", checked: false },
      { value: "baba booey", checked: false },
    ]);
  });
});

describe("checks a single todo", () => {
  it("can be checked", () => {
    const existing = { value: "stuff", checked: false };
    const { result } = renderHook(() => useTodos([existing]));

    const { toggleTodo } = result.current;
    act(() => {
      toggleTodo(existing);
    });

    const { todos } = result.current;

    expect(todos).toEqual([{ value: "stuff", checked: true }]);
  });
});
