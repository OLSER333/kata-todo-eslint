import React from 'react'
import PropTypes from 'prop-types'

const TasksFilter = ({ curFilter, onFiltered }) => {
  return (
    <React.Fragment>
      <ul className="filters">
        <li>
          <button
            onClick={() => onFiltered('all')}
            className={curFilter === 'all' ? 'selected' : null}
          >
            All
          </button>
        </li>
        <li>
          <button
            onClick={() => onFiltered('active')}
            className={curFilter === 'active' ? 'selected' : null}
          >
            Active
          </button>
        </li>
        <li>
          <button
            onClick={() => onFiltered('completed')}
            className={curFilter === 'completed' ? 'selected' : null}
          >
            Completed
          </button>
        </li>
      </ul>
    </React.Fragment>
  )
}
TasksFilter.defaultProps = {
  curFilter: 'all',
  // onFiltered: () => {}
}
TasksFilter.propTypes = {
  curFilter: PropTypes.string,
  onFiltered: PropTypes.func,
}
export default TasksFilter
