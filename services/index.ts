import axios from "../lib/axios"

const getTodosGroups = () => {
  return axios.get("/todos")
}

const getTodoItems = (todoId: number) => {
  return axios.get(`/todos/${todoId}/items`)
}

const createTodoItem = (
  todosGroupId: number,
  name: string,
  progress_percentage: number
) => {
  return axios.post(`/todos/${todosGroupId}/items`, {
    name,
    progress_percentage,
  })
}

const deleteTodoItem = (todoId: number, todoItemId: number) => {
  return axios.delete(`/todos/${todoId}/items/${todoItemId}`)
}

const moveTodoItem = (
  todoId: number,
  todoItemId: number,
  targetTodoId: number
) => {
  return axios.patch(`/todos/${todoId}/items/${todoItemId}`, {
    target_todo_id: targetTodoId,
  })
}

const editTodoItem = (
  todoId: number,
  todoItemId: number,
  name: string,
  progress_percentage: number
) => {
  return axios.patch(`/todos/${todoId}/items/${todoItemId}`, {
    name,
    progress_percentage,
    target_todo_id: todoId,
  })
}

export {
  getTodosGroups as serviceGetTodosGroups,
  getTodoItems as serviceGetTodoItems,
  createTodoItem as serviceCreateTodoItem,
  deleteTodoItem as serviceDeleteTodoItem,
  moveTodoItem as serviceMoveTodoItem,
  editTodoItem as serviceEditTodoItem,
}
