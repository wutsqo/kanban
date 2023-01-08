import { forwardRef, useContext, useState } from "react"
import { PlusIcon } from "../Icons"
import { useDialog } from "../../hooks/useDialog"
import { Modal } from "../Modal/Modal"
import { Input } from "../Form"
import { Button } from "../Button"
import { serviceCreateTodoItem } from "../../services"
import { TodosContext } from "../Container/KanbanContainer"

interface Props {
  todosGroupId: number
}

export const TodosGroupNewTask = forwardRef<HTMLDivElement, Props>(
  ({ todosGroupId }, ref) => {
    const { ref: modalRef, show, handleShow, handleHide } = useDialog()

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
      <>
        <div className="text-sm mt-4" ref={ref}>
          <div className="flex items-center gap-4">
            <button
              className="flex gap-2 items-center"
              title="Add new task"
              type="button"
              onClick={handleShow}
            >
              <PlusIcon />
              New Task
            </button>
          </div>
        </div>

        <Modal
          title="Create Task"
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
              onClick={handleCreate}
            >
              Save Task
            </Button>
          </div>
        </Modal>
      </>
    )
  }
)

TodosGroupNewTask.displayName = "TodosGroupNewTask"
