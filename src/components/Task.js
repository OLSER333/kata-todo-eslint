import React from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

export default class Task extends React.Component {
  state = {
    labelValue: this.props.label,
  }

  changeLabel = (e) => {
    e.preventDefault()
    if (this.state.labelValue !== '') {
      this.props.onEdited(this.state.labelValue)
    }
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
          <div className="view">
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
              <span className="created">{formatDistanceToNow(createTime)}</span>
            </label>
            <button onClick={toggleEditing} className="icon icon-edit"></button>
            <button onClick={onDeleted} className="icon icon-destroy"></button>
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
