import { FC } from "react"

interface Props {
  description: string
}

export const TodosGroupDescription: FC<Props> = ({ description }) => {
  return <div className="mt-4 text-xs font-bold">{description}</div>
}
