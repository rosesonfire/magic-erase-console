import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import reduxPromise from 'redux-promise-middleware'
import reduxLogger from 'redux-logger'
import reduxThunk from 'redux-thunk'
import { Provider } from 'react-redux'
import selectOption from './middlewares/selectOption'
import erase from './middlewares/erase'
import { getAllOptions } from './services/ui'
import App from './components/app'
import reducers from './reducers'

// ========== Initialize application ==========

const createReduxStore = () => {
  const middlewares = applyMiddleware(
    reduxThunk,
    selectOption,
    erase,
    reduxLogger,
    reduxPromise())
  const store = createStore(reducers, {
    ui: {
      options: getAllOptions(),
      hideCriticals: true
    },
    worker: {}
  }, middlewares)
  return store
}

const start = async () => {
  const store = createReduxStore()
  const mainContainerElement = document.getElementById('main-container')

  ReactDOM.render(<Provider store={store}><App /></Provider>, mainContainerElement)
}

start().catch(err => {
  console.error(err.message)
})
