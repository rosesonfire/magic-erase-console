export default (state = {}, { type, payload }) => {
  switch (type) {
    case 'CLEAR':
      state = {
        ...state,
        hide: true
      }
      break
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
        erasedImgSrc: payload,
        hasPast: true,
        hasFuture: false
      }
      break
    case 'UNDO_FULFILLED':
      state = {
        ...state,
        erasedImgSrc: payload.image,
        hasPast: payload.hasPast,
        hasFuture: true
      }
      break
    case 'REDO_FULFILLED':
      state = {
        ...state,
        erasedImgSrc: payload.image,
        hasFuture: payload.hasFuture,
        hasPast: true
      }
      break
  }

  return state
}
