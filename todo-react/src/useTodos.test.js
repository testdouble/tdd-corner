import useTodos from './useTodos'
import {renderHook, act} from '@testing-library/react-hooks'

describe('creating todos', () => {
  it('adds one to an empty list',() => {
    const { result } = renderHook(() => useTodos());
    const [todos, addTodoItem] = result.current;
    act(() => {
      addTodoItem('new item')
    })
    const [newTodos, _] = result.current;
    expect(newTodos).toEqual([{value: 'new item', checked: false}])
  })

  it('adds one to an existing list', () => {
    const existing = [{value: "stuff", checked: true}]
    expect(useTodos.addTodoItem(existing, 'new item')).toEqual([
      {value: "stuff", checked: true},
      {value: 'new item', checked: false}
    ])
  })
})