import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import { todoContext } from '../App'

import Timer from './Timer'
const Task = ({ label, done, id, createTime }) => {
  const { state, dispatch } = useContext(todoContext)

  const curFilter = state.curFilter
  const [labelValue, setLabelValue] = useState(label)

  const changeLabel = (e) => {
    e.preventDefault()
    if (labelValue !== '') {
      dispatch({
        type: 'setNewValue',
        payload: { id, prop: 'label', newVal: labelValue },
      })
      dispatch({
        type: 'toggleValue',
        payload: { id, prop: 'editing' },
      })
    }
  }

  return (
    <div
      hidden={
        (done && curFilter === 'active') || (!done && curFilter === 'completed')
      }
    >
      <form onSubmit={(e) => changeLabel(e)}>
        <input
          onChange={(e) => setLabelValue(e.target.value)}
          type="text"
          className="edit"
          value={labelValue}
        />
      </form>
      <div className="view">
        <input
          onChange={() =>
            dispatch({ type: 'toggleValue', payload: { id, prop: 'done' } })
          }
          checked={done}
          className="toggle"
          type="checkbox"
        />
        <label className="view-label">
          <span
            onClick={() =>
              dispatch({ type: 'toggleValue', payload: { id, prop: 'done' } })
            }
            className="description"
          >
            {label}
          </span>
        </label>
        <Timer done={done} id={id} />
        <span className="created">{formatDistanceToNow(createTime)}</span>
        <div className="view-buttons">
          <button
            onClick={() =>
              dispatch({
                type: 'toggleValue',
                payload: { id, prop: 'editing' },
              })
            }
            className="icon icon-edit"
          ></button>
          <button
            onClick={() => dispatch({ type: 'delTodo', payload: { id } })}
            className="icon icon-destroy"
          ></button>
        </div>
      </div>
    </div>
  )
}

export default Task
Task.defaultProps = {
  label: '',
  done: false,
  id: '',
  createTime: Date.now(),
}

Task.propTypes = {
  label: PropTypes.string,
  done: PropTypes.bool,
  id: PropTypes.string,
  createTime: PropTypes.number,
}
