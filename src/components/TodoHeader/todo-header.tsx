import React, { useState } from 'react'
import * as api from '../../todos'
import { useMutation, useQueryClient } from 'react-query'

export const TodoHeader: React.FC = () => {
  const queryClient = useQueryClient()
  const [newTodo, setNewTodo] = useState('')

  const { 'mutateAsync': addTodoMutation } = useMutation({
    'mutationFn': api.addTodo,
    'onSuccess': () => {
      queryClient.invalidateQueries(['todos'])
    },
  })

  const handleSubmit = async (): Promise<void> => {
    event?.preventDefault()
    try {
      await addTodoMutation(newTodo)
      setNewTodo('')
    } catch (error) {
      console.log(error)
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
