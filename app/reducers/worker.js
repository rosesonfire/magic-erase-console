export default (state = {}, { type, payload }) => {
  switch (type) {
    case 'SELECT_OPTION':
      state = {
        ...state,
        erasedImgSrc: payload.src,
        erasedImgData: payload.src
      }
      break
    case 'ERASE_FULFILLED':
      state = {
        ...state,
        erasedImgSrc: payload.erasedImgSrc,
        erasedImgData: payload.erasedImgData
      }
      break
  }

  return state
}
