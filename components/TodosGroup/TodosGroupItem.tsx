import { forwardRef, useContext, useState } from "react"
import classNames from "classnames"
import { TodoItem } from "../../types"
import { ProgressBar } from "../ProgressBar"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ExclamationIcon,
  TrashIcon,
} from "../Icons"
import { Dropdown } from "../Dropdown"
import { useDialog } from "../../hooks/useDialog"
import { Button } from "../Button"
import { Modal } from "../Modal"
import { TodosContext } from "../Container/KanbanContainer"
import { serviceDeleteTodoItem, serviceMoveTodoItem } from "../../services"

interface Props {
  todoItem: TodoItem
  todosGroupId: number
  leftTodosGroupId?: number
  rightTodosGroupId?: number
}

export const TodosGroupItem = forwardRef<HTMLDivElement, Props>(
  ({ todoItem, leftTodosGroupId, rightTodosGroupId }, ref) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const {
      ref: deleteDialogRef,
      show: showDeleteDialog,
      handleShow: handleShowDeleteDialog,
      handleHide: handleHideDeleteDialog,
    } = useDialog()

    const { deleteTodoItem, moveTodoItem } = useContext(TodosContext)

    const handleDelete = () => {
      serviceDeleteTodoItem(todoItem.todo_id, todoItem.id)
        .then(() => {
          handleHideDeleteDialog()
          deleteTodoItem(todoItem.id)
        })
        .catch((err) => {
          alert("Failed to delete task")
          console.log(err)
        })
    }

    const handleMove = (targetTodosGroupId: number) => {
      serviceMoveTodoItem(
        todoItem.todo_id,
        todoItem.id,
        targetTodosGroupId
      ).then(() => {
        moveTodoItem(todoItem.id, targetTodosGroupId)
      })
    }

    const actions = []
    if (leftTodosGroupId)
      actions.push({
        icon: <ArrowLeftIcon />,
        children: "Move Left",
        onClick: () => handleMove(leftTodosGroupId),
        activeClassname: "text-primary-main",
      })

    if (rightTodosGroupId)
      actions.push({
        icon: <ArrowRightIcon />,
        children: "Move Right",
        onClick: () => handleMove(rightTodosGroupId),
        activeClassname: "text-primary-main",
      })

    actions.push({
      icon: <TrashIcon />,
      children: "Delete",
      onClick: handleShowDeleteDialog,
      activeClassname: "text-red-500",
    })

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
            actions={actions}
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
