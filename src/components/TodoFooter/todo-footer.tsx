import React from 'react'
import cn from 'classnames'
import { Filter } from '../../types/filter'

type Props = {
  filterBy: Filter
  setFilterBy: (value: Filter) => void
}

export const TodoFooter: React.FC<Props> = ({ setFilterBy, filterBy }) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${1} completed`}
      </span>

      <span className="todo-count" data-cy="TodosCounter">
        {`${1} active`}
      </span>

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
      >
          Clear completed
      </button>
    </footer>
  )
}
