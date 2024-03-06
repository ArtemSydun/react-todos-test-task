import React from 'react'
import cn from 'classnames'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { clearCompleted } from '../../features/todos/todos-slice'
import { Filter } from '../../types/filter'

type Props = {
  filterBy: Filter
  setFilterBy: (value: Filter) => void
}

export const TodoFooter: React.FC<Props> = ({ setFilterBy, filterBy }) => {
  const todos = useAppSelector((state) => state.todos)
  const dispatch = useAppDispatch()

  const activeCount = todos.todos.filter((todo) => !todo.completed).length
  const completedCount = todos.todos.filter((todo) => todo.completed).length

  const handleClearCompleted = (): void => {
    dispatch(clearCompleted())
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${completedCount} completed`}
      </span>

      <span className="todo-count" data-cy="TodosCounter">
        {`${activeCount} active`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            'selected': filterBy === Filter.All,
          })}
          data-cy="FilterLinkAll"
          onClick={(): void => setFilterBy(Filter.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            'selected': filterBy === Filter.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={(): void => setFilterBy(Filter.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            'selected': filterBy === Filter.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={(): void => setFilterBy(Filter.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={(): void => handleClearCompleted()}
      >
          Clear completed
      </button>
    </footer>
  )
}
