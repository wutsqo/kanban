import { forwardRef, useContext, useState } from "react"
import classNames from "classnames"
import { TodoItem } from "../../types"
import { ProgressBar } from "../ProgressBar"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ExclamationIcon,
  PencilIcon,
  TrashIcon,
} from "../Icons"
import { Dropdown } from "../Dropdown"
import { useDialog } from "../../hooks/useDialog"
import { Button } from "../Button"
import { Modal } from "../Modal"
import { TodosContext } from "../Container/KanbanContainer"
import {
  serviceDeleteTodoItem,
  serviceEditTodoItem,
  serviceMoveTodoItem,
} from "../../services"
import { Input } from "../Form"

interface Props {
  todoItem: TodoItem
  leftTodosGroupId?: number
  rightTodosGroupId?: number
}

export const TodosGroupItem = forwardRef<HTMLDivElement, Props>(
  ({ todoItem, leftTodosGroupId, rightTodosGroupId }, ref) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [name, setName] = useState<string>(todoItem.name)
    const [progress, setProgress] = useState<number>(
      todoItem.progress_percentage
    )

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

    const { deleteTodoItem, moveTodoItem, editTodoItem } =
      useContext(TodosContext)

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

    const handleEdit = () => {
      serviceEditTodoItem(todoItem.todo_id, todoItem.id, name, progress)
        .then((res) => {
          setName("")
          setProgress(0)
          handleHideEditDialog()
          editTodoItem(res.data)
        })
        .catch((err) => {
          alert("Failed to create new task")
          console.log(err)
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

        <Modal
          title="Edit Task"
          onDismiss={handleHideEditDialog}
          show={showEditDialog}
          ref={editDialogRef}
        >
          <Input
            placeholder="Type your task"
            label="Task Name"
            name="task_name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Progress"
            label="Progress"
            name="progress"
            type="number"
            value={progress.toString()}
            onChange={(e) => setProgress(Number(e.target.value))}
            min={0}
            max={100}
            step={10}
          />

          <div className="flex justify-end gap-2 mt-6">
            <Button
              variant="secondary"
              title="Add new task"
              type="button"
              onClick={handleHideEditDialog}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              title="Add new task"
              type="button"
              onClick={handleEdit}
            >
              Save Change
            </Button>
          </div>
        </Modal>
      </div>
    )
  }
)

TodosGroupItem.displayName = "TodosGroupItem"
