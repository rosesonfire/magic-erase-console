import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import reduxPromise from 'redux-promise-middleware'
import reduxLogger from 'redux-logger'
import { Provider } from 'react-redux'
import ui from './reducers/ui'
import synchronizer from './middlewares/synchronizer'
import App from './components/app'

const createReduxStore = () => {
  const reducers = combineReducers({ ui })
  const middlewares = applyMiddleware(synchronizer(), reduxPromise(),
    reduxLogger)
  const store = createStore(reducers, {}, middlewares)
  return store
}
const start = async () => {
  const store = createReduxStore()
  const mainContainerElement = document.getElementById('main-container')
  ReactDOM.render(<Provider store={store}><App /></Provider>,
    mainContainerElement)
}
start().catch(err => console.error(err.message))
