import React, { useState } from 'react'
import { useAppDispatch } from '../../hooks/redux-hooks'
import { addTodo } from '../../features/todos/todos-slice'
import { Errors } from '../../types/errors'

type Props = {
  setError: (error: Errors) => void
}

export const TodoHeader: React.FC<Props> = ({ setError }) => {
  const [newTodo, setNewTodo] = useState('')
  const dispatch = useAppDispatch()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    if (newTodo.trim() && newTodo.trim().length < 15) {
      dispatch(addTodo({
        'id': Math.floor(
          Math.random() * 1000,
        ),
        'title': newTodo,
        'completed': false,
      }))
      setNewTodo('')
    } else {
      setNewTodo('')
      setError(Errors.Add)
    }

    if (newTodo.trim().length === 0) {
      setError(Errors.EmptyTitle)
    }
  }
  return (
    <header className="todoapp__header">
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={(event): void => setNewTodo(event.target.value)}
          value={newTodo}
        />
      </form>
    </header>
  )
}
