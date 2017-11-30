const initialState = { hide: true, options: [] }
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'INITIALIZE_FULFILLED':
      state = { ...state, options: payload }
      break
    case 'CLEAR_FULFILLED':
      state = { ...state, hide: true }
      break
    case 'SELECT_OPTION_FULFILLED':
      state = {
        ...state,
        imgSrc: payload.src,
        erasedImgSrc: payload.src,
        sensitivity: payload.sensitivity,
        hasPast: false,
        hasFuture: false,
        hide: false,
        sensitivityChanged: false
      }
      break
    case 'SET_SENSITIVITY_FULFILLED':
      state = { ...state, sensitivity: payload, sensitivityChanged: true }
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
    case 'RESET_FULFILLED':
      state = {
        ...state,
        erasedImgSrc: payload.image,
        sensitivity: payload.sensitivity,
        hasFuture: false,
        hasPast: false,
        sensitivityChanged: false
      }
      break
  }
  return state
}
