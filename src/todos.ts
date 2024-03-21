/* eslint-disable promise/prefer-await-to-then */
import axios from 'axios'
import { Todo } from './types/todo'

axios.defaults.baseURL = 'http://localhost:3005'

export function getAll(): Promise<Todo[]> {
  return axios.get('http://localhost:3005/todos')
    .then((res) => res.data)
}

export function addTodo(title: string): Promise<Todo> {
  return axios.post('http://localhost:3005/todos', {
    title,
  })
}

export function deleteTodo(id: number): void {
  axios.delete(`http://localhost:3005/todos/${id}`)
}

export function updateTodo(
  id: number,
  title: string,
  completed: boolean,
): Promise<Todo> {
  return axios.put(`http://localhost:3005/todos/${id}`, { title, completed })
}
