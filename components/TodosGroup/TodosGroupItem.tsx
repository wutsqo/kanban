import { forwardRef, useState } from "react"
import classNames from "classnames"
import { TodoItem } from "../../types"
import { ProgressBar } from "../ProgressBar"
import { ExclamationIcon, TrashIcon } from "../Icons"
import { Dropdown } from "../Dropdown"
import axios from "../../lib/axios"
import { AxiosError } from "axios"
import { useDialog } from "../../hooks/useDialog"
import { Button } from "../Button"
import { Modal } from "../Modal"

interface Props {
  todoItem: TodoItem
  todosGroupId: number
  handleDeleteTask: (todoItemId: number) => void
}

export const TodosGroupItem = forwardRef<HTMLDivElement, Props>(
  ({ todoItem, todosGroupId, handleDeleteTask }, ref) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const {
      ref: deleteDialogRef,
      show: showDeleteDialog,
      handleShow: handleShowDeleteDialog,
      handleHide: handleHideDeleteDialog,
    } = useDialog()

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
                onClick: handleShowDeleteDialog,
                activeClassname: "text-red-500",
              },
            ]}
            onDismiss={() => {}}
            isOpen={isDropdownOpen}
          />
        </div>

        <Modal
          title={
            <div className="flex gap-2 items-center">
              <ExclamationIcon /> Delete Task
            </div>
          }
          onDismiss={handleHideDeleteDialog}
          show={showDeleteDialog}
          ref={deleteDialogRef}
        >
          <div className="text-left">
            Are you sure want to delete this task? your action can’t be
            reverted.
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button
              variant="secondary"
              title="Cancel"
              type="button"
              onClick={handleHideDeleteDialog}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              title="Delete"
              type="button"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </Modal>
      </div>
    )
  }
)

TodosGroupItem.displayName = "TodosGroupItem"
