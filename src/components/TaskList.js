import React, { useContext } from 'react'

import { todoContext } from '../App'

import Task from './Task'

const TaskList = () => {
  const { state } = useContext(todoContext)
  const todos = state.todos

  function getCurClass(done, editing) {
    if (editing) return 'editing'
    else if (done) return 'completed'
    else return null
  }

  return (
    <ul className="todo-list">
      {todos.map((el) => {
        const { id, done, editing, ...otherData } = el

        return (
          <li className={getCurClass(done, editing)} key={id}>
            <Task editing={editing} id={id} done={done} {...otherData}></Task>
          </li>
        )
      })}
    </ul>
  )
}

export default TaskList
