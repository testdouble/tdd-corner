
const addTodoItem = (list, itemValue) => {
  return [
    ...list,
   {value: itemValue, checked: false}
  ]
}
export default {addTodoItem}