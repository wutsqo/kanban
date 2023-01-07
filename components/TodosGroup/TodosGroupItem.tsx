import { forwardRef, useState } from "react"
import classNames from "classnames"
import { TodoItem } from "../../types"
import { ProgressBar } from "../ProgressBar"
import { TrashIcon } from "../Icons"
import { Dropdown } from "../Dropdown"
import axios from "../../lib/axios"
import { AxiosError } from "axios"

interface Props {
  todoItem: TodoItem
  todosGroupId: number
  handleDeleteTask: (todoItemId: number) => void
}

export const TodosGroupItem = forwardRef<HTMLDivElement, Props>(
  ({ todoItem, todosGroupId, handleDeleteTask }, ref) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const handleDelete = () => {
      axios
        .delete(`/todos/${todosGroupId}/items/${todoItem.id}`)
        .then(() => {
          handleDeleteTask(todoItem.id)
        })
        .catch((err: AxiosError) => {
          alert("Something went wrong")
          console.log(err)
        })
        .finally(() => {
          setIsDropdownOpen(false)
        })
    }

    return (
      <div
        className={classNames(
          "border border-[#E0E0E0] rounded p-4 text-sm font-bold"
        )}
        ref={ref}
      >
        <div>{todoItem.name}</div>

        <hr className="my-4 border-dashed" />

        <div className="flex justify-between items-center gap-6 relative">
          <ProgressBar progress={todoItem.progress_percentage} />
          <Dropdown
            actions={[
              {
                icon: <TrashIcon />,
                children: "Delete",
                onClick: handleDelete,
                activeClassname: "text-red-500",
              },
            ]}
            onDismiss={() => {}}
            isOpen={isDropdownOpen}
          />
        </div>
      </div>
    )
  }
)

TodosGroupItem.displayName = "TodosGroupItem"
