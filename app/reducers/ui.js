export default (state = {}, { type, payload }) => {
  switch (type) {
    case 'SELECT_OPTION':
      state = {
        ...state,
        imgSrc: payload.src,
        sensitivity: payload.sensitivity,
        hasPast: false,
        hasFuture: false,
        hideCriticals: false
      }
      break
    case 'SET_SENSITIVITY':
      state = {
        ...state,
        sensitivity: payload
      }
      break
  }

  return state
}
