import { erase } from './../services/worker'

export default () => {
  const state = {}
  return store => next => action => {
    const payload = action.payload
    switch (action.type) {
      case 'SELECT_OPTION':
        state.prevErase = new Promise(resolve => resolve(payload.src))
        break
      case 'ERASE':
        const { sensitivity } = store.getState().ui
        const curErase = state.prevErase.then(erasedImgData =>
          erase(erasedImgData, payload, sensitivity))
        state.prevErase = curErase.then(({ data }) => data)
        action.payload = curErase.then(({ base64Img }) =>
          `data:image/jpeg;base64,${base64Img}`)
        break
    }
    next(action)
  }
}
