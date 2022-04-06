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
      toggleTodo(0);
    });

    const { todos } = result.current;

    expect(todos).toEqual([{ value: "stuff", checked: true }]);
  });
});

describe("multiple todo items with the same value", () => {
  it("only checks one", () => {
    const existing = [
      { value: "stuff", checked: false },
      { value: "stuff", checked: false },
    ];
    const { result } = renderHook(() => useTodos(existing));

    const { toggleTodo } = result.current;
    act(() => {
      toggleTodo(0);
    });
    const { todos } = result.current;

    expect(todos).toEqual([
      { value: "stuff", checked: true },
      { value: "stuff", checked: false },
    ]);
  });
});

describe("areAllChecked", () => {
  it("will be all checked if all todos are checked", () => {
    const existing = [{ value: "stuff", checked: true }];
    const { result } = renderHook(() => useTodos(existing));

    const { areAllChecked } = result.current;

    expect(areAllChecked()).toEqual(true);
  });

  it("is unchecked when there are no todos", () => {
    const existing = []
    const { result } = renderHook(() => useTodos(existing));

    const { areAllChecked } = result.current;

    expect(areAllChecked()).toEqual(false);
  })

});

describe("clearing checked todos", () => {
  it("will delete a checked todo", () => {
    const existing = [{ value: "stuff", checked: true }];
    const { result } = renderHook(() => useTodos(existing));

    const { clearAllChecked } = result.current;

    act(() => {
      clearAllChecked();
    });

    const { todos } = result.current;
    expect(todos).toEqual([]);
  });

  it("will delete only checked todos", () => {
    const existing = [
      { value: "stuff", checked: true },
      { value: "work", checked: false },
      { value: "wordle", checked: true },
    ];
    const { result } = renderHook(() => useTodos(existing));

    const { clearAllChecked } = result.current;

    act(() => {
      clearAllChecked();
    });

    const { todos } = result.current;
    expect(todos).toEqual([{ value: "work", checked: false }]);
  });
});

describe("areAnyChecked", () => {
  it("will be checked if any todos are checked", () => {
    const existing = [{ value: "stuff", checked: true }, { value: "more", checked: false}];
    const { result } = renderHook(() => useTodos(existing));

    const { areAnyChecked } = result.current;

    expect(areAnyChecked()).toEqual(true);
  });

  it("will not be checked if any todos are checked", () => {
    const existing = [{ value: "stuff", checked: false }, { value: "more", checked: false}];
    const { result } = renderHook(() => useTodos(existing));

    const { areAnyChecked } = result.current;

    expect(areAnyChecked()).toEqual(false);
  });
});
