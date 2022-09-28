import React from 'react'
import PropTypes from 'prop-types'

import Task from './Task'

const TaskList = (props) => {
  function getCurClass(done, editing) {
    if (editing) return 'editing'
    else if (done) return 'completed'
    else return null
  }

  return (
    <ul className="todo-list">
      {props.dataList.map((el) => {
        const { id, done, editing, ...otherData } = el

        return (
          <li className={getCurClass(done, editing)} key={id}>
            <Task
              editing={editing}
              // onActive={() => props.onActive(id)}
              onEdited={(value) => props.onEdited(id, value)}
              toggleEditing={() => props.toggleEditing(id)}
              onCompleted={() => props.onCompleted(id)}
              onDeleted={() => props.onDeleted(id)}
              done={done}
              {...otherData}
            ></Task>
          </li>
        )
      })}
    </ul>
  )
}
TaskList.defaultProps = {
  id: Math.round(Math.random() * Date.now()),
  done: false,
  dataList: [],
  onDeleted: () => {},
  onCompleted: () => {},
  // onEdited: () => {},
  // toggleEditing: () => {},
  // onActive: () => {},
}

TaskList.propTypes = {
  id: PropTypes.number,
  done: PropTypes.bool,
  dataList: PropTypes.array,
  onDeleted: PropTypes.func,
  onCompleted: PropTypes.func,
  toggleEditing: PropTypes.func,
  onEdited: PropTypes.func,
  // onActive: PropTypes.func,
}

export default TaskList
