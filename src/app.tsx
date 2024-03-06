import React, { useState } from 'react'
import './app.css'
import { TodoHeader } from './components/TodoHeader/todo-header'
import { TodoList } from './components/TodoList/todo-list'
import { TodoFooter } from './components/TodoFooter/todo-footer'
import { Filter } from './types/filter'

export const App: React.FC = () => {
  const [filterBy, setFilterBy] = useState<Filter>(Filter.All)

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        <TodoList filterBy={filterBy}/>

        <TodoFooter filterBy={filterBy} setFilterBy={setFilterBy} />
      </div>
    </div>
  )
}
