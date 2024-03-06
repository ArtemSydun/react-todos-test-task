import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { removeTodo } from '../../features/todos/todos-slice'
import { Todo } from '../../types/todo'
import { Filter } from '../../types/filter'

type Props = {
  filterBy: Filter
}

export const TodoList: React.FC<Props> = ({
  filterBy,
}) => {
  const todoList = useAppSelector((state) => state.todos)
  const dispatch = useAppDispatch()

  const handleDeleteTodo = (todo: Todo): void => {
    dispatch(removeTodo(todo))
  }

  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([])

  useEffect(() => {
    switch (filterBy) {
      case Filter.Completed: {
        setVisibleTodos(todoList.todos.filter((todo) => todo.completed))
        break
      }

      case Filter.Active: {
        setVisibleTodos(todoList.todos.filter((todo) => !todo.completed))
        break
      }

      default: {
        setVisibleTodos(todoList.todos)
        break
      }
    }
  }, [filterBy, todoList])

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
            {/* overlay will cover the todo while it is being updated */}
            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
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

            {/* overlay will cover the todo while it is being updated */}
            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        )
      })}
    </section>
  )
}
