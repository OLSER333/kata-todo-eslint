import React, { useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { todoContext } from '../App'
const NewTaskForm = () => {
  const { dispatch } = useContext(todoContext)
  const [formVal, setFormVal] = useState('')
  const [formMin, setFormMin] = useState('')
  const [formSec, setFormSec] = useState('')

  const getFormVal = (e) => {
    e.preventDefault()
    if (formVal !== '') {
      const newItem = {
        id: uuidv4(),
        label: formVal,
        initialTimerTime: formMin * 60000 + formSec * 1000,
        done: false,
        editing: false,
        createTime: Date.now(),
      }

      dispatch({
        type: 'addTodo',
        payload: newItem,
      })

      setFormVal('')
      setFormMin('')
      setFormSec('')
    }
  }

  const setStateInput = (e, inp) => {
    switch (inp) {
      case 'label': {
        setFormVal(e.target.value)
        break
      }
      case 'min': {
        if (String(e.target.value).length > 1)
          setFormMin(Number(String(e.target.value).slice(0, 2)))
        else setFormMin(e.target.value)

        break
      }
      case 'sec': {
        if (String(e.target.value).length > 1)
          setFormSec(Number(String(e.target.value).slice(0, 2)))
        else setFormSec(e.target.value)
        break
      }
    }
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form
        onSubmit={(e) => {
          getFormVal(e)
        }}
        className="new-todo-form"
      >
        <input
          value={formVal}
          onChange={(e) => setStateInput(e, 'label')}
          className="new-todo"
          placeholder="What needs to be done?"
          required
        />
        <input
          value={formMin}
          onChange={(e) => setStateInput(e, 'min')}
          className="new-todo-form__timer"
          step="1"
          min="0"
          max="99"
          placeholder="Min"
          type={'number'}
          // required
        />
        <input
          value={formSec}
          onChange={(e) => setStateInput(e, 'sec')}
          className="new-todo-form__timer"
          step="1"
          min="0"
          max="99"
          placeholder="Sec"
          type={'number'}
        />
        <input type="submit" style={{ display: 'none' }} />
      </form>
    </header>
  )
}

export default NewTaskForm
