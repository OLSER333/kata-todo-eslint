import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import './App.css'

import Footer from './components/Footer'
import NewTaskForm from './components/NewTaskForm'
import TaskList from './components/TaskList'

export default class App extends React.Component {
  state = {
    curFilter: 'all',
    data: [
      {
        id: uuidv4(),
        label: 'learn React',
        initialTimerTime: 120000,
        done: false,

        editing: false,
        createTime: new Date(2021, 9, 14), // год назад
      },
      {
        id: uuidv4(),
        label: 'use React',
        initialTimerTime: 745000,
        done: true,
        editing: false,
        createTime: Date.now(),
      },
      {
        id: uuidv4(),
        label: 'Like React',
        initialTimerTime: 60000,
        done: false,
        editing: false,
        createTime: new Date(2022, 3, 14), // полгода назад
      },
    ],
  }

  changeData = (id, dateProp) => {
    this.setState({
      data: this.state.data.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            [dateProp]: !el[dateProp],
          }
        }
        return el
      }),
    })
  }

  delItem = (id) => {
    this.setState({ data: this.state.data.filter((el) => el.id !== id) })
  }

  addItem = (newLabel, id, timerTime) => {
    this.setState({
      data: [
        {
          id: id,
          label: newLabel,
          initialTimerTime: timerTime,
          done: false,
          editing: false,
          createTime: Date.now(),
        },
        ...this.state.data,
      ],
    })
  }

  delAllCompleted = () => {
    this.setState({ data: this.state.data.filter((e) => !e.done) })
  }

  getFilteredData = () => {
    switch (this.state.curFilter) {
      case 'all':
        return this.state.data
      case 'active':
        return this.state.data.filter((el) => !el.done)
      case 'completed':
        return this.state.data.filter((el) => el.done)
      default:
        return this.state.data
    }
  }

  getActiveCount = (arr) => {
    return arr.filter((e) => !e.done).length
    // return arr.reduce((sum, cur) => (sum += cur.done === false ? 1 : 0), 0)
  }

  changeFilter = (newFilter) => {
    this.setState({ curFilter: newFilter })
  }

  changeTaskLabel = (id, value) => {
    this.setState({
      data: this.state.data.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            label: value,
            editing: false,
          }
        }
        return el
      }),
    })
  }

  render() {
    return (
      <section className="todoapp">
        <NewTaskForm onAddItem={this.addItem} />
        <section className="main">
          {Boolean(this.state.data.length) && (
            <TaskList
              onEdited={(id, value) => this.changeTaskLabel(id, value)}
              toggleEditing={(id) => this.changeData(id, 'editing')}
              onCompleted={(id) => this.changeData(id, 'done')}
              onDeleted={(id) => this.delItem(id)}
              dataList={this.getFilteredData()}
            />
          )}
          {Boolean(this.state.data.length) && (
            <Footer
              onFiltered={(newFilter) => this.changeFilter(newFilter)}
              curFilter={this.state.curFilter}
              onDeleteCompleted={this.delAllCompleted}
              activeCount={this.getActiveCount(this.state.data)}
            />
          )}
        </section>
      </section>
    )
  }
}
