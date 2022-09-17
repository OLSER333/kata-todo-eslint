import React from 'react'

import './App.css'

import Footer from './components/Footer'
import NewTaskForm from './components/NewTaskForm'
import TaskList from './components/TaskList'

export default class App extends React.Component {
  state = {
    curFilter: 'all',
    data: [
      {
        id: Date.now() - 31536000000,
        label: 'learn React',
        active: false,
        done: false,
        createTime: Date.now() - 31536000000, // год назад
      },
      {
        id: Date.now() - 3600,
        label: 'use React',
        active: false,
        done: true,
        createTime: Date.now() - 3600, // год назад
      },
      {
        id: Date.now() - 15768000000,
        label: 'Like React',
        active: false,
        done: false,
        createTime: Date.now() - 15768000000, // полгода назад
      },
    ],
  }

  changeDate = (id, dateProp) => {
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

  addItem = (newLabel) => {
    this.setState({
      data: [
        ...this.state.data,
        {
          id: Date.now(),
          label: newLabel,
          active: false,
          done: false,
          createTime: Date.now(),
        },
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
        return this.state.data.filter((el) => el.active === true)
      case 'completed':
        return this.state.data.filter((el) => el.done === true)
      default:
        return this.state.data
    }
  }

  getActiveCount = (arr) => {
    return arr.reduce((sum, cur) => (sum += cur.done === false ? 1 : 0), 0)
  }

  changeFilter = (newFilter) => {
    this.setState({ curFilter: newFilter })
  }

  render() {
    return (
      <section className="todoapp">
        <NewTaskForm onAddItem={this.addItem} />
        <section className="main">
          {Boolean(this.state.data.length) && (
            <TaskList
              onCompleted={(id) => this.changeDate(id, 'done')}
              // onActive={(id) => this.changeDate(id, 'active')}
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
