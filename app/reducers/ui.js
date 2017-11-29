export default (state = {}, { type, payload }) => {
  switch (type) {
    case 'SELECT_OPTION':
      state = {
        ...state,
        imgSrc: payload.src,
        erasedImgSrc: payload.src,
        sensitivity: payload.sensitivity,
        hasPast: false,
        hasFuture: false,
        hide: false
      }
      break
    case 'SET_SENSITIVITY':
      state = {
        ...state,
        sensitivity: payload
      }
      break
    case 'ERASE_FULFILLED':
      state = {
        ...state,
        erasedImgSrc: payload
      }
      break
  }

  return state
}
