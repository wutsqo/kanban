import { forwardRef } from "react"
import classNames from "classnames"

interface Props {
  title: string
  variant: "main" | "secondary" | "tertiary" | "quaternary"
}

const variantClasses = {
  main: "border-[#4DB5BC] text-[#01959F]",
  secondary: "border-[#FEEABC] text-[#FA9810]",
  tertiary: "border-[#F5B1B7] text-[#E11428]",
  quaternary: "border-[#B8DBCA] text-[#43936C]",
}

export const TodosGroupTitle = forwardRef<HTMLHeadingElement, Props>(
  ({ title, variant }, ref) => {
    return (
      <h2
        className={classNames(
          "border rounded px-2 py-0.5 max-w-fit text-xs",
          variantClasses[variant]
        )}
        ref={ref}
      >
        {title}
      </h2>
    )
  }
)

TodosGroupTitle.displayName = "TodosGroupTitle"
