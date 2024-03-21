import React, { useState } from 'react'
import { Errors } from '../../types/errors'
import * as api from '../../todos'

type Props = {
  setError: (error: Errors) => void
}

export const TodoHeader: React.FC<Props> = ({ setError }) => {
  const [newTodo, setNewTodo] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    if (newTodo.trim() && newTodo.trim().length < 15) {
      api.addTodo(newTodo)
      api.getAll()
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
