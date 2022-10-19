import { v4 as uuidv4 } from 'uuid'
import { createSlice } from '@reduxjs/toolkit'

const todosSlice = createSlice({
  name: 'toolkit',
  initialState: {
    todos: [
      {
        id: uuidv4(),
        label: 'learn React',
        initialTimerTime: 120000,
        done: false,
        editing: false,
        createTime: Date.now(),
      },
      {
        id: uuidv4(),
        label: 'use React',
        initialTimerTime: 745000,
        done: true,
        editing: false,
        createTime: Date.now(),
      },
      {
        id: uuidv4(),
        label: 'Like React',
        initialTimerTime: 60000,
        done: false,
        editing: false,
        createTime: Date.now(),
      },
    ],
  },
  reducers: {
    addTodo(state, action) {
      state.todos.unshift(action.payload)
    },
    delTodo(state, action) {
      state.todos = state.todos.filter((el) => el.id !== action.payload.id)
    },
    toggleValue(state, action) {
      state.todos = state.todos.map((el) => {
        return el.id !== action.payload.id
          ? el
          : {
              ...el,
              [action.payload.prop]: !el[action.payload.prop],
            }
      })
    },
    setNewValue(state, action) {
      state.todos = state.todos.map((el) => {
        return el.id !== action.payload.id
          ? el
          : {
              ...el,
              [action.payload.prop]: action.payload.newVal,
            }
      })
    },
    delAllCompleted(state) {
      state.todos = state.todos.filter((el) => !el.done)
    },
  },
})

export default todosSlice.reducer

export const { addTodo, delTodo, toggleValue, setNewValue, delAllCompleted } =
  todosSlice.actions
