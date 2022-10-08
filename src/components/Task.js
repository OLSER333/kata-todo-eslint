import React from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import { getTime } from '../utils/utils'

export default class Task extends React.PureComponent {
  state = {
    labelValue: this.props.label,
    timerRun: false,
    timerTime: this.props.initialTimerTime,
    timerStart: null,
    timerClassName:
      this.props.initialTimerTime === 0
        ? 'timer__play timer__disable'
        : 'timer__play',
    curIntervalId: null,
  }

  changeLabel = (e) => {
    e.preventDefault()
    if (this.state.labelValue !== '') {
      this.props.onEdited(this.state.labelValue)
    }
  }

  async playPausePressed() {
    if (this.state.timerTime !== 0) {
      await this.setState({ timerStart: Date.now() })
      if (this.state.timerTime !== 0) {
        await this.setState((curState) => {
          return { timerRun: !curState.timerRun }
        })
      }
      this.getTimerClassName()
      // eslint-disable-next-line no-unused-vars
      clearInterval(this.state.curIntervalId)
      const curId = setInterval(() => {
        if (!this.state.timerRun || this.state.timerTime === 1000) {
          clearInterval(curId)
          this.setState({ timerRun: false })
          this.getTimerClassName()
        }
        if (this.state.timerRun) {
          this.setState((curState) => {
            let temp = curState.timerTime - (Date.now() - this.state.timerStart)
            return {
              timerTime: Math.round(temp / 1000) * 1000,
            }
          })
        }
        this.setState({ timerStart: Date.now() })
      }, 1000)
      this.setState({ curIntervalId: curId })
    }
  }

  getTimerClassName() {
    this.setState((curState) => {
      if (curState.timerTime === 1000) {
        return { timerClassName: 'timer__play timer__disable' }
      } else {
        return {
          timerClassName: curState.timerRun ? 'timer__pause' : 'timer__play',
        }
      }
    })
  }

  render() {
    const {
      label,
      done,
      editing,
      createTime,
      onCompleted,
      onDeleted,
      toggleEditing,
    } = this.props
    return (
      <>
        {editing ? (
          <form onSubmit={(e) => this.changeLabel(e)}>
            <input
              onChange={(e) => this.setState({ labelValue: e.target.value })}
              type="text"
              className="edit"
              value={this.state.labelValue}
            />
          </form>
        ) : (
          <div
            className="view"
            onClick={() => console.log('state', this.state)}
          >
            <input
              onChange={() => onCompleted()}
              checked={done}
              className="toggle"
              type="checkbox"
            />
            <label>
              <span onClick={() => onCompleted()} className="description">
                {label}
              </span>
            </label>

            <div className="timer" onClick={(e) => this.playPausePressed(e)}>
              <button
                type={'button'}
                className={this.state.timerClassName}
              ></button>
              <p className="timer__time">{getTime(this.state.timerTime)}</p>
            </div>

            <span
              onClick={() => console.log('state task', this.state)}
              className="created"
            >
              {formatDistanceToNow(createTime)}
            </span>
            <div className="view-buttons">
              <button
                onClick={toggleEditing}
                className="icon icon-edit"
              ></button>
              <button
                onClick={onDeleted}
                className="icon icon-destroy"
              ></button>
            </div>
          </div>
        )}
      </>
    )
  }
}
Task.defaultProps = {
  label: '',
  active: false,
  done: false,
  // onActive: () => {},
  // onDeleted: () => {},
  // onCompleted: () => {},
  // toggleEditing: () => {},
  createTime: Date.now(),
}

Task.propTypes = {
  label: PropTypes.string,
  editing: PropTypes.bool,
  active: PropTypes.bool,
  done: PropTypes.bool,
  createTime: PropTypes.number,
  onActive: PropTypes.func,
  onDeleted: PropTypes.func,
  onCompleted: PropTypes.func,
  toggleEditing: PropTypes.func,
}
