export function saveToLocal(id, key, value) {
  let todo = window.localStorage.__todo__
  if (!todo) {
    todo = undefined
    todo.id = undefined
  } else {
    todo = JSON.parse(todo)
    if (!todo[id]) {
      todo[id] = {}
    }
  }
  todo.id.key = value
  window.localStorage.__todo__ = JSON.stringify(todo)
}
