import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import { Todo } from '../../types/todo'
import { Filter } from '../../types/filter'

import * as api from '../../todos'

type Props = {
  filterBy: Filter
}

export const TodoList: React.FC<Props> = ({
  filterBy,
}) => {
  const handleDeleteTodo = (todo: Todo): void => {
    api.deleteTodo(todo.id)
    setVisibleTodos(visibleTodos.filter((visibleTodo) => todo.id !==
      visibleTodo.id))
  }

  const handleUpdateTodo = async (todo: Todo): Promise<void> => {
    try {
      await api.updateTodo(todo.id, todo.title, !todo.completed)

      const updatedTodos = visibleTodos.map((thisTodo) => {
        if (thisTodo.id === todo.id) {
          return { ...thisTodo, 'completed': !todo.completed }
        }
        return thisTodo
      })

      setVisibleTodos(updatedTodos)
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([])

  useEffect(() => {
    const getTodos = async (): Promise<void> => {
      try {
        const todos = await api.getAll()
        setVisibleTodos(todos)
      } catch (error) {
        console.log(error)
      }
    }
    getTodos()
  }, [])

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map((todo) => {
        const { title, id, completed } = todo

        return (
          <div
            data-cy="Todo"
            className={cn('todo', { completed })}
            key={id}
          >
            <label
              className="todo__status-label"

            >
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
              onClick={(): void => handleDeleteTodo(todo)}
            >
              ×
            </button>
          </div>
        )
      })}
    </section>
  )
}
