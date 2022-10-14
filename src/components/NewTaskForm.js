import React from 'react'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'

class NewTaskForm extends React.Component {
  state = {
    formVal: '',
    formMin: '',
    formSec: '',
  }

  getFormVal = (e) => {
    e.preventDefault()
    if (
      this.state.formVal !== '' &&
      this.state.formMin !== '' &&
      this.state.formSec !== ''
    ) {
      const id = uuidv4()
      const timerTime = this.state.formMin * 60000 + this.state.formSec * 1000
      this.props.onAddItem(this.state.formVal, id, timerTime)
      this.setState({ formVal: '', formMin: '', formSec: '' })
    }
  }

  setStateInput = (e, inp) => {
    switch (inp) {
      case 'case': {
        this.setState({
          formVal: e.target.value,
        })
        break
      }
      case 'min': {
        this.setState(() => {
          if (String(e.target.value).length > 1)
            return { formMin: Number(String(e.target.value).slice(0, 2)) }
          else return { formMin: e.target.value }
        })

        break
      }
      case 'sec': {
        this.setState(() => {
          if (String(e.target.value).length > 1)
            return { formSec: Number(String(e.target.value).slice(0, 2)) }
          else return { formSec: e.target.value }
        })
        break
      }
    }
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form
          onSubmit={(e) => {
            this.getFormVal(e)
          }}
          className="new-todo-form"
        >
          <input
            value={this.state.formVal}
            onChange={(e) => this.setStateInput(e, 'case')}
            className="new-todo"
            placeholder="What needs to be done?"
            required
          />
          <input
            value={this.state.formMin}
            onChange={(e) => this.setStateInput(e, 'min')}
            className="new-todo-form__timer"
            step="1"
            min="0"
            max="99"
            placeholder="Min"
            type={'number'}
            required
          />
          <input
            value={this.state.formSec}
            onChange={(e) => this.setStateInput(e, 'sec')}
            className="new-todo-form__timer"
            step="1"
            min="0"
            max="99"
            placeholder="Sec"
            type={'number'}
            required
          />
          <input type="submit" style={{ display: 'none' }} />
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
