import React, { useReducer } from 'react'

import NewTaskForm from './components/NewTaskForm'
import TaskList from './components/TaskList'
import Footer from './components/Footer'
import { initialState, reducer } from './reducerData/reducerData'
import './App.css'
export const todoContext = React.createContext()

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <todoContext.Provider value={{ state, dispatch }}>
      <section className="todoapp">
        <NewTaskForm />
        <section className="main">
          <TaskList />
          <Footer />
        </section>
      </section>
    </todoContext.Provider>
  )
}
export default App
