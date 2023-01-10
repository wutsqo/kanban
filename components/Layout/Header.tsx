import { FC } from "react"

export const Header: FC = () => {
  return (
    <div className="px-5 h-16 shadow flex items-center fixed top-0 w-screen bg-white z-50">
      <div className="font-bold text-lg">Product Roadmap</div>
    </div>
  )
}
