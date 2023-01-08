import { FC, createContext, useEffect, useState } from "react"
import { TodoItem, TodosGroup } from "../../types"
import { TodosGroupCard } from "../TodosGroup/TodosGroup"
import { serviceGetTodoItems, serviceGetTodosGroups } from "../../services"

type variant = "main" | "secondary" | "tertiary" | "quaternary"

export const TodosContext = createContext({
  todosGroups: [] as TodosGroup[],
  setTodosGroups: (_todosGroups: TodosGroup[]) => {},
  createTodoItem: (_todoItem: TodoItem) => {},
  deleteTodoItem: (_todoItemId: number) => {},
  moveTodoItem: (_todoItemId: number, _targetTodoGroupId: number) => {},
  editTodoItem: (_todoItem: TodoItem) => {},
})

export const KanbanContainer: FC = () => {
  const [todosGroups, setTodosGroups] = useState<TodosGroup[]>([])
  const variants: variant[] = ["main", "secondary", "tertiary", "quaternary"]

  const getInitialData = async () => {
    const { data: todosGroups } = await serviceGetTodosGroups()
    for (const tg of todosGroups) {
      const { data: todoItems } = await serviceGetTodoItems(tg.id)
      for (const ti of todoItems) {
        ti.todosGroupId = tg.id
      }
      tg.todoItems = todoItems
    }
    setTodosGroups(todosGroups)
  }

  useEffect(() => {
    getInitialData()

    return () => {
      setTodosGroups([])
    }
  }, [])

  const createTodoItem = (todoItem: TodoItem) => {
    const newTodosGroups = [...todosGroups]
    const found = newTodosGroups.find((tg) => tg.id === todoItem.todo_id)

    if (found) {
      found.todoItems = [...found.todoItems, todoItem]
      setTodosGroups(newTodosGroups)
    }
  }

  const deleteTodoItem = (todoItemId: number) => {
    const newTodosGroups = [...todosGroups]
    const found = newTodosGroups.find((tg) =>
      tg.todoItems.find((ti) => ti.id === todoItemId)
    )

    if (found) {
      found.todoItems = found.todoItems.filter((ti) => ti.id !== todoItemId)
      setTodosGroups(newTodosGroups)
    }
  }

  const moveTodoItem = (todoItemId: number, targetTodoItemId: number) => {
    const newTodosGroups = [...todosGroups]
    const found = newTodosGroups.find((tg) =>
      tg.todoItems.find((ti) => ti.id === todoItemId)
    )
    const targetFound = newTodosGroups.find((tg) => tg.id === targetTodoItemId)

    if (found && targetFound) {
      const todoItem = found.todoItems.find((ti) => ti.id === todoItemId)
      if (todoItem) {
        todoItem.todo_id = targetFound.id
        found.todoItems = found.todoItems.filter((ti) => ti.id !== todoItemId)
        targetFound.todoItems = [...targetFound.todoItems, todoItem]
      }
    }

    setTodosGroups(newTodosGroups)
  }

  const editTodoItem = (todoItem: TodoItem) => {
    // TODO: implement editTodoItem
  }

  return (
    <TodosContext.Provider
      value={{
        todosGroups,
        setTodosGroups,
        createTodoItem,
        deleteTodoItem,
        moveTodoItem,
        editTodoItem,
      }}
    >
      <div className="p-5 flex gap-5 overflow-x-auto pb-24">
        {todosGroups.map((tg, i) => (
          <TodosGroupCard
            key={i}
            todosGroup={tg}
            variant={variants[i % variants.length]}
            leftTodosGroupId={i !== 0 ? todosGroups[i - 1]?.id : undefined}
            rightTodosGroupId={
              i !== todosGroups.length - 1 ? todosGroups[i + 1]?.id : undefined
            }
          />
        ))}
      </div>
    </TodosContext.Provider>
  )
}
