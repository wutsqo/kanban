import { TodosGroup } from "../../types"
import { forwardRef } from "react"
import { TodosGroupTitle } from "./TodosGroupTitle"
import classNames from "classnames"
import { TodosGroupItem } from "./TodosGroupItem"
import { TodosGroupDescription } from "./TodosGroupDescription"
import { TodosGroupNewTask } from "./TodosGroupNewTask"

interface TodosGroupProps {
  todosGroup: TodosGroup
  variant: "main" | "secondary" | "tertiary" | "quaternary"
  leftTodosGroupId?: number
  rightTodosGroupId?: number
}

const variantClasses = {
  main: "bg-[#F7FEFF] border-[#01959F]",
  secondary: "bg-[#FFFCF5] border-[#FEEABC]",
  tertiary: "bg-[#FFFAFA] border-[#F5B1B7]",
  quaternary: "bg-[#F8FBF9] border-[#B8DBCA]",
}

export const TodosGroupCard = forwardRef<HTMLDivElement, TodosGroupProps>(
  ({ todosGroup, variant, leftTodosGroupId, rightTodosGroupId }, ref) => {
    const { todoItems = [] } = todosGroup

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
          {todoItems.map((todoItem, i) => (
            <TodosGroupItem
              key={todoItem.id}
              todoItem={todoItem}
              leftTodosGroupId={leftTodosGroupId}
              rightTodosGroupId={rightTodosGroupId}
            />
          ))}

          {todoItems.length === 0 && (
            <div className="border border-[#E0E0E0] bg-[#FAFAFA] text-[#757575] rounded px-4 py-2">
              No Task
            </div>
          )}
        </div>

        <TodosGroupNewTask todosGroupId={todosGroup.id} />
      </div>
    )
  }
)

TodosGroupCard.displayName = "TodosGroupCard"
