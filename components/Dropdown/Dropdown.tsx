import { Menu } from "@headlessui/react"
import { forwardRef } from "react"
import { MeatBallMenuIcon } from "../Icons"
import { DropdownItem } from "./DropdownItem"

interface Props {
  isOpen: boolean
  onDismiss: () => void
  actions: {
    icon: React.ReactNode
    children: React.ReactNode
    activeClassname?: string
    onClick: () => void
  }[]
}

export const Dropdown = forwardRef<HTMLDivElement, Props>(
  ({ isOpen, onDismiss, actions, ...props }, ref) => {
    return (
      <Menu as="div" className="flex items-center">
        <Menu.Button className="hover:bg-[#EDEDED] rounded">
          <MeatBallMenuIcon />
        </Menu.Button>
        <Menu.Items
          as="div"
          className="absolute top-6 right-0 bg-white shadow-lg rounded-lg py-2 w-72"
        >
          {actions.map((action, index) => (
            <DropdownItem
              key={index}
              onClick={action.onClick}
              icon={action.icon}
              activeClassname={action.activeClassname}
            >
              {action.children}
            </DropdownItem>
          ))}
        </Menu.Items>
      </Menu>
    )
  }
)

Dropdown.displayName = "Dropdown"
