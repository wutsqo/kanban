export interface todosGroup {
  id: number
  title: string
  created_by: string
  created_at: string
  updated_at: string
  description: string
}

export interface TodoItem {
  id: number
  name: string
  done: boolean
  todo_id: number
  created_at: string
  updated_at: string
  progress_percentage: number
}
