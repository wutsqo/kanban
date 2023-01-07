import { todosGroup, TodoItem } from "../../types"
import { forwardRef, useEffect, useState } from "react"
import { TodosGroupTitle } from "./TodosGroupTitle"
import classNames from "classnames"
import axios from "../../lib/axios"
import { TodosGroupItem } from "./TodosGroupItem"
import { TodosGroupDescription } from "./TodosGroupDescription"
import { TodosGroupNewTask } from "./TodosGroupNewTask"

interface TodosGroupProps {
  todosGroup: todosGroup
  variant: "main" | "secondary" | "tertiary" | "quaternary"
}

const variantClasses = {
  main: "bg-[#F7FEFF] border-[#01959F]",
  secondary: "bg-[#FFFCF5] border-[#FEEABC]",
  tertiary: "bg-[#FFFAFA] border-[#F5B1B7]",
  quaternary: "bg-[#F8FBF9] border-[#B8DBCA]",
}

export const TodosGroupCard = forwardRef<HTMLDivElement, TodosGroupProps>(
  ({ todosGroup, variant }, ref) => {
    const [todoItems, setTodoItems] = useState<TodoItem[]>([])

    const handleCreateTask = (todoItem: TodoItem) => {
      setTodoItems((prev) => [...prev, todoItem])
    }

    useEffect(() => {
      axios.get(`/todos/${todosGroup.id}/items`).then((res) => {
        setTodoItems(res.data)
      })
    }, [todosGroup.id])

    return (
      <div
        className={classNames(
          "border w-80 shrink-0 p-4 rounded self-start",
          variantClasses[variant]
        )}
        ref={ref}
      >
        <TodosGroupTitle title={todosGroup.title} variant={variant} />

        <TodosGroupDescription description={todosGroup.description} />

        <div className="mt-4 flex flex-col gap-4">
          {todoItems.map((todoItem) => (
            <TodosGroupItem key={todoItem.id} todoItem={todoItem} />
          ))}

          {todoItems.length === 0 && (
            <div className="border border-[#E0E0E0] bg-[#FAFAFA] text-[#757575] rounded px-4 py-2">
              No Task
            </div>
          )}
        </div>

        <TodosGroupNewTask
          todosGroupId={todosGroup.id}
          createTaskCallback={handleCreateTask}
        />
      </div>
    )
  }
)

TodosGroupCard.displayName = "TodosGroupCard"
