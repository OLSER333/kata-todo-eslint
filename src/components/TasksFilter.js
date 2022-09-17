import React from 'react'
import PropTypes from 'prop-types'

export default class TasksFilter extends React.Component {
  render() {
    const { curFilter, onFiltered } = this.props

    return (
      <ul className="filters">
        {['all', 'active', 'completed'].map((el) => {
          return (
            <li key={el}>
              <button
                onClick={() => onFiltered(el)}
                className={curFilter === el ? el : null}
              >
                {el}
              </button>
            </li>
          )
        })}
      </ul>
    )
  }
}
TasksFilter.defaultProps = {
  curFilter: 'all',
  // onFiltered: () => {}
}
TasksFilter.propTypes = {
  curFilter: PropTypes.string,
  onFiltered: PropTypes.func,
}
