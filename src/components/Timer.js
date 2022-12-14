import React, { useContext, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { getTime } from '../utils/utils'
import { todoContext } from '../App'

const Timer = ({ done, id }) => {
  const { state } = useContext(todoContext)

  const getInitialTimerTime = () => {
    let needIdx = 0
    state.todos.forEach((el, idx) => {
      if (el.id === id) {
        needIdx = idx
      }
    })
    return state.todos[needIdx].initialTimerTime
  }

  const initialTimerTime = getInitialTimerTime()

  const timerTime = useRef(initialTimerTime)
  const [timerView, setTimerView] = useState(timerTime.current)
  const [timerRun, setTimerRun] = useState(false)

  const [timerClassName, setTimerClassName] = useState(
    initialTimerTime === 0 || done
      ? 'timer__play timer__disable'
      : 'timer__play'
  )

  useEffect(() => {
    getTimerClassName()
    let curId = null
    let start = Date.now()
    if (timerRun) {
      curId = setInterval(() => {
        if (timerTime.current > 999) {
          timerTime.current = timerTime.current - (Date.now() - start)
        } else {
          stopTimer()
          timerTime.current = 0
        }
        setTimerView(timerTime.current)
        start = Date.now()
      }, 1000)
    }

    return () => {
      clearInterval(curId)
    }
  }, [timerRun])

  useEffect(() => {
    if (done) {
      stopTimer()
    }
    getTimerClassName()
  }, [done])

  useEffect(() => {
    if (timerTime.current === 0) {
      stopTimer()
    }
  }, [timerTime.current])

  const startTimer = () => {
    if (timerTime.current !== 0 && !done) {
      setTimerRun(true)
    }
  }

  const stopTimer = () => {
    setTimerRun(false)
  }

  function getTimerClassName() {
    setTimerClassName(() => {
      if (timerTime.current === 0 || done) {
        return 'timer__play timer__disable'
      } else {
        return timerRun ? 'timer__pause' : 'timer__play'
      }
    })
  }

  return (
    <div className="timer">
      <button
        onClick={() => (timerRun ? stopTimer() : startTimer())}
        type={'button'}
        className={timerClassName}
      ></button>
      <p className="timer__time">{getTime(timerView)}</p>
    </div>
  )
}

export default Timer
Timer.defaultProps = {
  done: false,
  id: '',
}
Timer.propTypes = {
  done: PropTypes.bool,
  id: PropTypes.string,
}
