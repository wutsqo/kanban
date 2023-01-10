import { forwardRef } from "react"

interface Props {
  label: string
  name: string
  type: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  step?: number
  min?: number
  max?: number
  width?: string
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, name, type, placeholder, value, onChange, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-3 items-start mt-6">
        <label htmlFor={name} className="text-xs font-bold">
          {label}
        </label>
        <input
          ref={ref}
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="border-2 border-[#EDEDED] px-4 py-2 rounded-md focus:outline-none w-full"
          style={{ width: props.width }}
          {...props}
        />
      </div>
    )
  }
)

Input.displayName = "Input"
