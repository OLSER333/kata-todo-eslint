import React from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

const Task = (props) => {
  const { label, active, onActive, onCompleted, onDeleted, createTime } = props

  return (
    <React.Fragment>
      <div className="view">
        <input
          onChange={() => onActive()}
          checked={active}
          className="toggle"
          type="checkbox"
        />
        <label>
          <span onClick={() => onCompleted()} className="description">
            {label}
          </span>
          <span className="created">{formatDistanceToNow(createTime)}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button onClick={onDeleted} className="icon icon-destroy"></button>
      </div>
    </React.Fragment>
  )
}
Task.defaultProps = {
  label: '',
  active: false,
  // onActive: () => {},
  // onDeleted: () => {},
  // onCompleted: () => {},
  createTime: Date.now(),
}

Task.propTypes = {
  label: PropTypes.string,
  active: PropTypes.bool,
  onActive: PropTypes.func,
  onDeleted: PropTypes.func,
  onCompleted: PropTypes.func,
  createTime: PropTypes.number,
}
export default Task
