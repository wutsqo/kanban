import { forwardRef, useState } from "react"
import { Modal } from "./Modal"
import { Input } from "../Form"
import { Button } from "../Button"
import { useDialog } from "../../hooks/useDialog"

interface Props {
  todosGroupId: number
}

export const NewTaskModal = forwardRef<HTMLDivElement, Props>(
  ({ todosGroupId }, ref) => {
    const { ref: modalRef, show, handleShow, handleHide } = useDialog()
    const [name, setName] = useState<string>("")
    const [progress, setProgress] = useState<number>(0)

    const handleCreateTask = () => {
      console.log("Create task")
    }

    return (
      <Modal
        title="Create Task"
        onDismiss={handleHide}
        show={show}
        ref={modalRef}
      >
        <Input
          placeholder="Type your task"
          label="Task Name"
          name="name"
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
            onClick={handleHide}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            title="Add new task"
            type="button"
            onClick={handleCreateTask}
          >
            Save Task
          </Button>
        </div>
      </Modal>
    )
  }
)

NewTaskModal.displayName = "NewTaskModal"
