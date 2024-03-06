import React, { useState } from 'react'
import { useAppDispatch } from '../../hooks/redux-hooks'
import { addTodo } from '../../features/todos/todos-slice'

export const TodoHeader: React.FC = () => {
  const [newTodo, setNewTodo] = useState('')
  const dispatch = useAppDispatch()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    if (newTodo.trim()) {
      dispatch(addTodo({
        'id': Math.floor(
          Math.random() * 1000,
        ),
        'title': newTodo,
        'completed': false,
      }))
      setNewTodo('')
    }
  }
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

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
