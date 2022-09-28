import React from 'react'
import PropTypes from 'prop-types'

class NewTaskForm extends React.Component {
  state = {
    formVal: '',
  }

  getFormVal = (e) => {
    e.preventDefault()
    if (this.state.formVal !== '') {
      this.props.onAddItem(this.state.formVal)
      this.setState({ formVal: '' })
    }
  }

  setStateInpVal = (e) => {
    this.setState({
      formVal: e.target.value,
    })
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.getFormVal}>
          <input
            value={this.state.formVal}
            onChange={this.setStateInpVal}
            className="new-todo"
            placeholder="What needs to be done?"
          />
        </form>
      </header>
    )
  }
}

NewTaskForm.propTypes = {
  onAddItem: PropTypes.func,
}

NewTaskForm.defaultProps = {
  onAddItem: () => {},
}

export default NewTaskForm
