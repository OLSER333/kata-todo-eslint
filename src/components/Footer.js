import React, { useContext } from 'react'

import { todoContext } from '../App'

import TasksFilter from './TasksFilter'

const Footer = () => {
  const { state, dispatch } = useContext(todoContext)
  const todos = state.todos

  const getActiveCount = () => {
    return todos.filter((e) => !e.done).length
  }
  return (
    <footer className="footer">
      <span className="todo-count">{getActiveCount(todos)} items left</span>
      <TasksFilter />
      <button
        onClick={() => dispatch({ type: 'delAllCompleted' })}
        className="clear-completed"
      >
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
