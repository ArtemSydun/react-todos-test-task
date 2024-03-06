import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Todo } from '../../types/todo'

interface TodoState {
  todos: Todo[]
}

const initialState: TodoState = {
  'todos':
    [
      {
        'id': 1,
        'title': 'first',
        'completed': true,
      },

      {
        'id': 2,
        'title': 'second',
        'completed': false,
      },
    ],
}

export const todoSlice = createSlice({
  'name': 'todos',
  initialState,
  'reducers': {
    'addTodo': (state, action: PayloadAction<Todo>): void => {
      state.todos.push(action.payload)
    },

    'removeTodo': (state, action: PayloadAction<Todo>): void => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id)
    },

    'clearCompleted': (state): void => {
      state.todos = state.todos.filter((todo) => !todo.completed)
    },

    'toggleTodo': (state, action: PayloadAction<Todo>): void => {
      const todo = state.todos.find(
        (todoToToggle) => action.payload.id === todoToToggle.id,
      )
      if (todo) {
        todo.completed = !todo.completed
      }
    },
  },
})

export const {
  addTodo,
  removeTodo,
  clearCompleted,
  toggleTodo,
} = todoSlice.actions

export default todoSlice.reducer
