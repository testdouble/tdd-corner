import useTodos from './useTodos'

describe('creating todos', () => {
  it('adds one to an empty list',() => {
    expect(useTodos.addTodoItem([], 'new item')).toEqual([{value: 'new item', checked: false}])
  })

  it('adds one to an existing list', () => {
    const existing = [{value: "stuff", checked: true}]
    expect(useTodos.addTodoItem(existing, 'new item')).toEqual([
      {value: "stuff", checked: true},
      {value: 'new item', checked: false}
    ])
  })
})