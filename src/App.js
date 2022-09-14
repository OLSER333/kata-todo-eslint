import React from 'react'

import './App.css'

import Footer from './components/Footer'
import NewTaskForm from './components/NewTaskForm'
import TaskList from './components/TaskList'

export default class App extends React.Component {
  getData = (...arrLabels) =>
    arrLabels.reduce((newArr, cur, idx) => {
      newArr.push({
        id: idx,
        label: cur,
        active: false,
        done: false,
        createTime: Date.now(),
      })
      return newArr
    }, [])

  state = {
    data: this.getData('learn React', 'fly into space', 'drink milk'),
    curFilter: 'all',
  }

  changeDate = (id, dateProp) => {
    const newData = JSON.parse(JSON.stringify(this.state.data))
    newData.forEach((el) => {
      if (el.id === id) {
        el[dateProp] = !el[dateProp]
      }
    })

    this.setState({ data: newData })
  }

  delItem = (id) => {
    let newData = JSON.parse(JSON.stringify(this.state.data))
    newData = newData.filter((el) => el.id !== id)
    this.setState({ data: newData })
  }

  addItem = (newLabel) => {
    const newData = JSON.parse(JSON.stringify(this.state.data))
    newData.push({
      id: Date.now(),
      label: newLabel,
      active: false,
      done: false,
      createTime: Date.now(),
    })
    this.setState({ data: newData })
  }

  delAllCompleted = () => {
    const newData = JSON.parse(JSON.stringify(this.state.data))
    this.setState({ data: newData.filter((e) => !e.done) })
  }

  getFilteredData = () => {
    switch (this.state.curFilter) {
      case 'all':
        return this.state.data
      case 'active':
        return this.state.data.filter((el) => el.done === false)
      case 'completed':
        return this.state.data.filter((el) => el.done === true)
      default:
        return this.state.data
    }
  }

  getActiveCount = (arr) => {
    let sum = 0
    arr.forEach((cur) => [(sum += cur.done === false ? 1 : 0)])
    return sum
    // return arr.reduce((sum, cur) => (sum += cur.done === false ? 1 : 0), 0);
  }

  changeFilter = (newFilter) => {
    this.setState({ curFilter: newFilter })
  }

  render() {
    const taskList = (
      <TaskList
        onCompleted={(id) => this.changeDate(id, 'done')}
        onActive={(id) => this.changeDate(id, 'active')}
        onDeleted={(id) => this.delItem(id)}
        dataList={this.getFilteredData()}
      />
    )

    return (
      <section className="todoapp">
        <NewTaskForm onAddItem={this.addItem} />
        <section className="main">
          {this.state.data.length > 0 ? taskList : null}
          {this.state.data.length > 0 ? (
            <Footer
              onFiltered={(newFilter) => this.changeFilter(newFilter)}
              curFilter={this.state.curFilter}
              onDeleteCompleted={this.delAllCompleted}
              activeCount={this.getActiveCount(this.state.data)}
            />
          ) : null}
        </section>
      </section>
    )
  }
}
