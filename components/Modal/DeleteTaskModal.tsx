import { forwardRef, useContext } from "react"
import { Modal } from "./Modal"
import { Button } from "../Button"
import { serviceDeleteTodoItem } from "../../services"
import { TodosContext } from "../Container/KanbanContainer"
import { ExclamationIcon } from "../Icons"
import { TodoItem } from "../../types"

interface Props {
  todoItem: TodoItem
  show: boolean
  handleHide: () => void
}

export const DeleteTaskModal = forwardRef<HTMLDivElement, Props>(
  ({ todoItem, show, handleHide }, ref) => {
    const { deleteTodoItem } = useContext(TodosContext)

    const handleDelete = () => {
      serviceDeleteTodoItem(todoItem.todo_id, todoItem.id)
        .then(() => {
          handleHide()
          deleteTodoItem(todoItem.id)
        })
        .catch((err) => {
          alert("Failed to delete task")
          console.log(err)
        })
    }

    return (
      <Modal
        title={
          <div className="flex gap-2 items-center">
            <ExclamationIcon /> Delete Task
          </div>
        }
        onDismiss={handleHide}
        show={show}
        ref={ref}
      >
        <div className="text-left">
          Are you sure want to delete this task? your action can’t be reverted.
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button
            variant="secondary"
            title="Cancel"
            type="button"
            onClick={handleHide}
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
    )
  }
)

DeleteTaskModal.displayName = "DeleteTaskModal"
