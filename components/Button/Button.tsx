import classNames from "classnames"
import { forwardRef } from "react"

interface Props {
  children: React.ReactNode
  title: string
  type?: "button" | "submit" | "reset"
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  variant?: "primary" | "secondary" | "danger"
}

const variants = {
  primary: "bg-[#01959F] border-[#01959F] text-white hover:brightness-90",
  secondary: "bg-white border-[#E0E0E0] text-black",
  danger: "bg-red-500 border-red-500 text-white hover:brightness-90",
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ children, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={classNames(
          "px-4 py-1 rounded-lg focus:outline-none border text-sm font-bold",
          variants[variant]
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"
