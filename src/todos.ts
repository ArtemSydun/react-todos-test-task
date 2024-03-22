import axios from 'axios'
import { Todo } from './types/todo'

axios.defaults.baseURL = 'http://localhost:3005'

export async function getAll(): Promise<Todo[]> {
  try {
    const res = await axios.get('/todos')
    return res.data
  } catch {
    throw new Error('Failed to fetch todos')
  }
}

export async function addTodo(title: string): Promise<Todo> {
  try {
    const res = await axios.post('/todos', { title })
    return res.data
  } catch {
    throw new Error('Failed to add todo')
  }
}

export async function deleteTodo(id: string): Promise<void> {
  try {
    await axios.delete(`/todos/${id}`)
  } catch {
    throw new Error('Failed to delete todo')
  }
}

export async function updateTodo(todo: Todo): Promise<Todo> {
  try {
    const { id, title, completed } = todo
    const newCompleted = !completed
    const res = await axios.put(`/todos/${id}`, {
      title,
      'completed': newCompleted,
    })
    return res.data
  } catch {
    throw new Error('Failed to update todo')
  }
}
