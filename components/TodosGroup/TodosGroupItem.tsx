import { forwardRef } from "react"
import classNames from "classnames"
import { TodoItem } from "../../types"
import { ProgressBar } from "../ProgressBar"
import { MeatBallMenuIcon } from "../Icons"

interface Props {
  todoItem: TodoItem
}

export const TodosGroupItem = forwardRef<HTMLDivElement, Props>(
  ({ todoItem }, ref) => {
    return (
      <div
        className={classNames(
          "border border-[#E0E0E0] rounded p-4 text-sm font-bold"
        )}
        ref={ref}
      >
        <div>{todoItem.name}</div>

        <hr className="my-4 border-dashed" />

        <div className="flex justify-between items-center gap-6">
          <ProgressBar progress={todoItem.progress_percentage} />
          <MeatBallMenuIcon />
        </div>
      </div>
    )
  }
)

TodosGroupItem.displayName = "TodosGroupItem"
