import { FC, useEffect, useState } from "react"
import { todosGroup } from "../../types"
import axios from "../../lib/axios"
import { TodosGroupCard } from "../TodosGroup/TodosGroup"

type variant = "main" | "secondary" | "tertiary" | "quaternary"

export const KanbanContainer: FC = () => {
  const [todosGroups, settodosGroups] = useState<todosGroup[]>([])
  const variants: variant[] = ["main", "secondary", "tertiary", "quaternary"]

  useEffect(() => {
    axios.get("/todos").then((res) => {
      settodosGroups(res.data)
    })

    return () => {
      settodosGroups([])
    }
  }, [])

  return (
    <div className="p-5 flex gap-5 overflow-x-auto">
      {todosGroups.map((todosGroups, i) => (
        <TodosGroupCard
          key={i}
          todosGroup={todosGroups}
          variant={variants[i % variants.length]}
        />
      ))}
    </div>
  )
}
