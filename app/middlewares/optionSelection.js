import { getOption } from './../services/ui'

export default store => next => action => {
  switch (action.type) {
    case 'SELECT_OPTION':
      if (action.payload) {
        action.payload = getOption(action.payload)
      } else {
        action.type = 'CLEAR'
      }
      break
  }
  next(action)
}
