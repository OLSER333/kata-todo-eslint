import React from 'react'

import NewTaskForm from './components/NewTaskForm'
import TaskList from './components/TaskList'
import Footer from './components/Footer'

import './App.css'

const App = () => {
  return (
    <section className="todoapp">
      <NewTaskForm />
      <section className="main">
        <TaskList />
        <Footer />
      </section>
    </section>
  )
}
export default App
