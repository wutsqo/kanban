import { forwardRef, useContext, useState } from "react"
import { TodosContext } from "../Container/KanbanContainer"
import { serviceCreateTodoItem } from "../../services"
import { Modal } from "./Modal"
import { Input } from "../Form"
import { Button } from "../Button"

interface Props {
  todosGroupId: number
  show: boolean
  handleHide: () => void
}

export const NewTaskModal = forwardRef<HTMLDivElement, Props>(
  ({ todosGroupId, show, handleHide }, ref) => {
    const [name, setname] = useState<string>("")
    const [progress, setProgress] = useState<number>(0)

    const { createTodoItem } = useContext(TodosContext)

    const handleCreate = () => {
      serviceCreateTodoItem(todosGroupId, name, progress)
        .then((res) => {
          setname("")
          setProgress(0)
          handleHide()
          createTodoItem(res.data)
        })
        .catch((err) => {
          alert("Failed to create new task")
          console.log(err)
        })
    }

    return (
      <Modal title="Create Task" onDismiss={handleHide} show={show} ref={ref}>
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
            onClick={handleCreate}
          >
            Save Task
          </Button>
        </div>
      </Modal>
    )
  }
)

NewTaskModal.displayName = "NewTaskModal"
