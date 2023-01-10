import { forwardRef, useContext, useState } from "react"
import { serviceEditTodoItem } from "../../services"
import { TodosContext } from "../Container/KanbanContainer"
import { Modal } from "../Modal"
import { Button } from "../Button"
import { Input } from "../Form"
import { useDialog } from "../../hooks/useDialog"
import { TodoItem } from "../../types"
import { PencilIcon } from "../Icons"

interface Props {
  todoItem: TodoItem
  todosGroupId: number
}

export const TodosGroupEditTask = forwardRef<HTMLDivElement, Props>(
  ({ todoItem, todosGroupId }, ref) => {
    const { ref: modalRef, show, handleShow, handleHide } = useDialog()

    const [name, setname] = useState<string>(todoItem.name)
    const [progress, setProgress] = useState<number>(
      todoItem.progress_percentage
    )

    const { editTodoItem } = useContext(TodosContext)

    const handleEdit = () => {
      serviceEditTodoItem(todoItem.todo_id, todoItem.id, name, progress)
        .then((res) => {
          setname("")
          setProgress(0)
          handleHide()
          editTodoItem(res.data)
        })
        .catch((err) => {
          alert("Failed to edit task")
          console.log(err)
        })
    }

    return (
      <>
        <div className="text-sm mt-4" ref={ref}>
          <div className="flex items-center gap-4">
            <button
              className="flex gap-2 items-center"
              title="Edit task"
              type="button"
              onClick={handleShow}
            >
              <PencilIcon />
              Edit Task
            </button>
          </div>
        </div>

        <Modal
          title="Edit Task"
          onDismiss={handleHide}
          show={show}
          ref={modalRef}
        >
          <Input
            placeholder="Type your task"
            label="Task Name"
            name="task_name"
            type="text"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          <Input
            placeholder="Progress"
            label="Progress"
            name="progress"
            type="number"
            value={progress.toString()}
            onChange={(e) => setProgress(Number(e.target.value))}
          />
          <div className="flex justify-end gap-4 mt-4">
            <Button title="Cancel" onClick={handleHide}>
              Cancel
            </Button>
            <Button title="Save" onClick={handleEdit}>
              Save
            </Button>
          </div>
        </Modal>
      </>
    )
  }
)

TodosGroupEditTask.displayName = "TodosGroupEditTask"
