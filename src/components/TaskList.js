import React from 'react'
import { useSelector } from 'react-redux'

import Task from './Task'

const TaskList = () => {
  const todos = useSelector((state) => state.toolkit.todos)

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

// const getFilteredData = () => {
//   switch (curFilter) {
//     case 'all':
//       return todos
//     case 'active':
//       return todos.filter((el) => !el.done)
//     case 'completed':
//       return todos.filter((el) => el.done)
//     default:
//       return todos
//   }
// }
