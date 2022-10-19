import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { delAllCompleted } from '../redux/todosSlice'

import TasksFilter from './TasksFilter'

const Footer = () => {
  const todos = useSelector((state) => state.toolkit.todos)

  const getActiveCount = () => {
    return todos.filter((e) => !e.done).length
  }
  const dispatch = useDispatch()
  return (
    <footer className="footer">
      <span className="todo-count">{getActiveCount(todos)} items left</span>
      <TasksFilter />
      <button
        onClick={() => dispatch(delAllCompleted())}
        className="clear-completed"
      >
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
