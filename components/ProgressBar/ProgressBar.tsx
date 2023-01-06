import { forwardRef } from "react"
import classNames from "classnames"
import { ChecklistIcon } from "../Icons"

interface Props {
  progress: number
}

export const ProgressBar = forwardRef<HTMLDivElement, Props>(
  ({ progress }, ref) => {
    return (
      <div className="flex justify-between items-center gap-3 w-full">
        <div className="rounded-full h-4 overflow-hidden flex w-full" ref={ref}>
          <div
            className={classNames(
              "h-full",
              progress === 100 ? "bg-[#43936C]" : "bg-[#01959F]"
            )}
            style={{ width: `${progress}%` }}
          />
          <div
            className="bg-[#EDEDED] h-full"
            style={{ width: `${100 - progress}%` }}
          />
        </div>

        <div className="text-[#757575] font-normal text-xs">
          {progress === 100 ? <ChecklistIcon /> : `${progress}%`}
        </div>
      </div>
    )
  }
)

ProgressBar.displayName = "ProgressBar"
