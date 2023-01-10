import { forwardRef, useContext, useState } from "react"
import classNames from "classnames"
import { TodoItem } from "../../types"
import { ProgressBar } from "../ProgressBar"
import { ArrowLeftIcon, ArrowRightIcon, PencilIcon, TrashIcon } from "../Icons"
import { Dropdown } from "../Dropdown"
import { useDialog } from "../../hooks/useDialog"
import { DeleteTaskModal, EditTaskModal } from "../Modal"
import { TodosContext } from "../Container/KanbanContainer"
import { serviceMoveTodoItem } from "../../services"

interface Props {
  todoItem: TodoItem
  leftTodosGroupId?: number
  rightTodosGroupId?: number
}

export const TodosGroupItem = forwardRef<HTMLDivElement, Props>(
  ({ todoItem, leftTodosGroupId, rightTodosGroupId }, ref) => {
    const [isDropdownOpen] = useState(false)

    const {
      ref: deleteDialogRef,
      show: showDeleteDialog,
      handleShow: handleShowDeleteDialog,
      handleHide: handleHideDeleteDialog,
    } = useDialog()

    const {
      ref: editDialogRef,
      show: showEditDialog,
      handleShow: handleShowEditDialog,
      handleHide: handleHideEditDialog,
    } = useDialog()

    const { moveTodoItem } = useContext(TodosContext)

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
      icon: <PencilIcon />,
      children: "Edit",
      onClick: handleShowEditDialog,
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

        <DeleteTaskModal
          todoItem={todoItem}
          show={showDeleteDialog}
          handleHide={handleHideDeleteDialog}
          ref={deleteDialogRef}
        />

        <EditTaskModal
          todoItem={todoItem}
          show={showEditDialog}
          handleHide={handleHideEditDialog}
          ref={editDialogRef}
        />
      </div>
    )
  }
)

TodosGroupItem.displayName = "TodosGroupItem"
