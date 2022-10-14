import React from 'react'
import PropTypes from 'prop-types'

const TasksFilter = (props) => {
  const { curFilter, onFiltered } = props
  const _filterBtns = ['all', 'active', 'completed']

  return (
    <ul className="filters">
      {_filterBtns.map((el) => {
        return (
          <li key={el}>
            <button
              onClick={() => onFiltered(el)}
              className={curFilter === el ? 'selected' : null}
            >
              {el}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
export default TasksFilter
TasksFilter.defaultProps = {
  curFilter: 'all',
}
TasksFilter.propTypes = {
  curFilter: PropTypes.string,
  onFiltered: PropTypes.func,
}
