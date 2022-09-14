import React from 'react'
import PropTypes from 'prop-types'

import TasksFilter from './TasksFilter'

const Footer = ({ curFilter, onDeleteCompleted, onFiltered, activeCount }) => {
  return (
    <React.Fragment>
      <footer className="footer">
        <span className="todo-count">{activeCount} items left</span>
        <TasksFilter
          onFiltered={(newFilter) => onFiltered(newFilter)}
          curFilter={curFilter}
        />
        <button onClick={onDeleteCompleted} className="clear-completed">
          Clear completed
        </button>
      </footer>
    </React.Fragment>
  )
}
Footer.defaultProps = {
  activeCount: 0,
  onDeleteCompleted: () => {},
  curFilter: 'all',
  onFiltered: () => {},
}

Footer.propTypes = {
  activeCount: PropTypes.number,
  onDeleteCompleted: PropTypes.func,
  curFilter: PropTypes.string,
  onFiltered: PropTypes.func,
}

export default Footer
