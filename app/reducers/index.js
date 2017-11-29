import { combineReducers } from 'redux'
import ui from './ui'
import worker from './worker'

export default combineReducers({
  ui,
  worker
})
