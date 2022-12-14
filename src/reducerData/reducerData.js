import { v4 } from 'uuid'

export const initialState = {
  todos: [
    {
      id: v4(),
      label: 'learn React',
      initialTimerTime: 120000,
      done: false,
      editing: false,
      createTime: Date.now(),
    },
    {
      id: v4(),
      label: 'use React',
      initialTimerTime: 745000,
      done: true,
      editing: false,
      createTime: Date.now(),
    },
    {
      id: v4(),
      label: 'Like React',
      initialTimerTime: 60000,
      done: true,
      editing: false,
      createTime: Date.now(),
    },
  ],
  curFilter: 'all',
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'changeFilter': {
      return { ...state, curFilter: action.payload.newFilter }
    }
    case 'addTodo': {
      return { ...state, todos: [action.payload, ...state.todos] }
    }
    case 'delTodo': {
      return {
        ...state,
        todos: state.todos.filter((el) => el.id !== action.payload.id),
      }
    }
    case 'toggleValue': {
      return {
        ...state,
        todos: state.todos.map((el) => {
          return el.id !== action.payload.id
            ? el
            : {
                ...el,
                [action.payload.prop]: !el[action.payload.prop],
              }
        }),
      }
    }
    case 'setNewValue': {
      return {
        ...state,
        todos: state.todos.map((el) => {
          return el.id !== action.payload.id
            ? el
            : {
                ...el,
                [action.payload.prop]: action.payload.newVal,
              }
        }),
      }
    }
    case 'delAllCompleted': {
      return {
        ...state,
        todos: state.todos.filter((el) => !el.done),
      }
    }
  }
}
