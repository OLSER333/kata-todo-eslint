import React from 'react'
import PropTypes from 'prop-types'

import Task from './Task'

const TaskList = (props) => {
  const items = props.dataList.map((el) => {
    const { id, done, ...otherData } = el

    return (
      <li className={done ? 'completed' : null} key={id}>
        <Task
          // onActive={() => props.onActive(id)}
          onCompleted={() => props.onCompleted(id)}
          onDeleted={() => props.onDeleted(id)}
          done={done}
          {...otherData}
        ></Task>
      </li>
    )
  })

  return <ul className="todo-list">{items}</ul>
}
TaskList.defaultProps = {
  id: Math.round(Math.random() * Date.now()),
  done: false,
  dataList: [],
  onDeleted: () => {},
  onCompleted: () => {},
  // onActive: () => {},
}

TaskList.propTypes = {
  id: PropTypes.number,
  done: PropTypes.bool,
  dataList: PropTypes.array,
  onDeleted: PropTypes.func,
  onCompleted: PropTypes.func,
  // onActive: PropTypes.func,
}

export default TaskList
