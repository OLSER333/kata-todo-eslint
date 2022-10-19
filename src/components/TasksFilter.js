import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { changeFilter } from '../redux/curFilterSlice'

const TasksFilter = () => {
  const curFilter = useSelector((state) => state.curFilter.curFilter)
  const dispatch = useDispatch()
  const _filterBtns = ['all', 'active', 'completed']

  return (
    <ul className="filters">
      {_filterBtns.map((el) => {
        return (
          <li key={el}>
            <button
              onClick={() => dispatch(changeFilter({ newFilter: el }))}
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
