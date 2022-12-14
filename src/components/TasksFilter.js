import React, { useContext } from 'react'

import { todoContext } from '../App'

const TasksFilter = () => {
  const { state, dispatch } = useContext(todoContext)

  const curFilter = state.curFilter
  const _filterBtns = ['all', 'active', 'completed']

  return (
    <ul className="filters">
      {_filterBtns.map((el) => {
        return (
          <li key={el}>
            <button
              onClick={() =>
                dispatch({ type: 'changeFilter', payload: { newFilter: el } })
              }
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
