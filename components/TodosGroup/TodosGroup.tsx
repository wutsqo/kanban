import { todosGroup, TodoItem } from "../../types"
import { forwardRef } from "react"
import { TodosGroupTitle } from "./TodosGroupTitle"
import classNames from "classnames"

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
    return (
      <div
        className={classNames(
          "border w-80 shrink-0 p-4 rounded",
          variantClasses[variant]
        )}
        ref={ref}
      >
        <TodosGroupTitle title={todosGroup.title} variant={variant} />

        <div className="mt-4 text-xs">{todosGroup.description}</div>
      </div>
    )
  }
)

TodosGroupCard.displayName = "TodosGroupCard"
