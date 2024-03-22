import React from 'react'
import cn from 'classnames'
import { Todo } from '../../types/todo'
import { Filter } from '../../types/filter'

import * as api from '../../todos'

import { useMutation, useQuery, useQueryClient } from 'react-query'

type Props = {
  filterBy: Filter
}

export const TodoList: React.FC<Props> = ({ filterBy }) => {
  const queryClient = useQueryClient()

  const { 'data': todos, isLoading } = useQuery({
    'queryFn': () => api.getAll(),
    'queryKey': ['todos'],
  })

  const { 'mutateAsync': deleteTodoMutation } = useMutation({
    'mutationFn': api.deleteTodo,
    'onSuccess': () => {
      queryClient.invalidateQueries(['todos'])
    },
  })

  const { 'mutateAsync': updateTodoMutation } = useMutation({
    'mutationFn': api.updateTodo,
    'onSuccess': () => {
      queryClient.invalidateQueries(['todos'])
    },
  })

  const handleDeleteTodo = async (id: string): Promise<void> => {
    event?.preventDefault()
    try {
      await deleteTodoMutation(id)
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateTodo = async (todo: Todo): Promise<void> => {
    event?.preventDefault()
    try {
      await updateTodoMutation(todo)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {isLoading ? <>Loading</> : todos?.map((todo: Todo) => {
        const { title, id, completed } = todo
        return (
          <div data-cy="Todo" className={cn('todo', { completed })} key={id}>
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                onClick={(): void => {
                  handleUpdateTodo(todo)
                }}
              />
            </label>

            <span
              data-cy="TodoTitle"
              className="todo__title"
              onClick={(): void => {
                handleUpdateTodo(todo)
              }}
            >
              {title}
            </span>

            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={(): Promise<void> => handleDeleteTodo(id)}
            >
                ×
            </button>
          </div>
        )
      })
      }
    </section>
  )
}
