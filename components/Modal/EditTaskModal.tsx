import { forwardRef, useContext, useState } from "react"
import { TodoItem } from "../../types"
import { TodosContext } from "../Container/KanbanContainer"
import { serviceEditTodoItem } from "../../services"
import { Modal } from "./Modal"
import { Button } from "../Button"
import { Input } from "../Form"

interface Props {
  todoItem: TodoItem
  show: boolean

  handleHide: () => void
}

export const EditTaskModal = forwardRef<HTMLDivElement, Props>(
  ({ todoItem, show, handleHide }, ref) => {
    const [name, setName] = useState<string>(todoItem.name)
    const [progress, setProgress] = useState<number>(
      todoItem.progress_percentage
    )

    const { editTodoItem } = useContext(TodosContext)

    const handleEdit = () => {
      serviceEditTodoItem(todoItem.todo_id, todoItem.id, name, progress)
        .then((res) => {
          setName("")
          setProgress(0)
          handleHide()
          editTodoItem(res.data)
        })
        .catch((err) => {
          alert("Failed to create new task")
          console.log(err)
        })
    }

    return (
      <Modal title="Edit Task" onDismiss={handleHide} show={show} ref={ref}>
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
          width="8rem"
        />

        <div className="flex justify-end gap-2 mt-6">
          <Button
            variant="secondary"
            title="Add new task"
            type="button"
            onClick={handleHide}
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
    )
  }
)

EditTaskModal.displayName = "EditTaskModal"
