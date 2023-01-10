import { forwardRef } from "react"
import { PlusIcon } from "../Icons"
import { useDialog } from "../../hooks/useDialog"
import { NewTaskModal } from "../Modal"

interface Props {
  todosGroupId: number
}

export const TodosGroupNewTask = forwardRef<HTMLDivElement, Props>(
  ({ todosGroupId }, ref) => {
    const { ref: modalRef, show, handleShow, handleHide } = useDialog()

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

        <NewTaskModal
          handleHide={handleHide}
          show={show}
          ref={modalRef}
          todosGroupId={todosGroupId}
        />
      </>
    )
  }
)

TodosGroupNewTask.displayName = "TodosGroupNewTask"
