import { Menu } from "@headlessui/react"
import classNames from "classnames"
import { forwardRef } from "react"

interface Props {
  children: React.ReactNode
  onClick: () => void
  key: number
  icon: React.ReactNode
  activeClassname?: string
}

export const DropdownItem = forwardRef<HTMLDivElement, Props>(
  ({ children, onClick, icon, activeClassname, ...props }, ref) => {
    return (
      <Menu.Item as="div" ref={ref}>
        {({ active }) => (
          <button
            className={classNames(
              "w-full text-left px-4 py-2 text-sm flex gap-3 items-center",
              active ? activeClassname : ""
            )}
            onClick={onClick}
            {...props}
          >
            {icon}
            {children}
          </button>
        )}
      </Menu.Item>
    )
  }
)

DropdownItem.displayName = "DropdownItem"
