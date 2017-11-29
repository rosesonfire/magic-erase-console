import { getOption } from './../services/ui'

export default store => next => action => {
  switch (action.type) {
    case 'SELECT_OPTION':
      action.payload = getOption(action.payload)
      break
  }
  next(action)
}
