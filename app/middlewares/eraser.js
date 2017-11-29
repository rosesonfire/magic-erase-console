import { erase } from './../services/worker'

const doSelect = (state) => async (src) => {
  await state.lastOperation
  state.chronology = [{ image: src, data: src }]
  state.current = 0
}
const doErase = (state) => async (erasePoint, sensitivity) => {
  await state.lastOperation
  const { data } = state.chronology[state.current]
  const response = await erase(data, erasePoint, sensitivity)
  const image = `data:image/jpeg;base64,${response.base64Img}`
  state.current++
  state.chronology.splice(state.current)
  state.chronology.push({
    image,
    data: response.data
  })
  return image
}
const doUndo = (state) => async () => {
  await state.lastOperation
  state.current--
  return {
    image: state.chronology[state.current].image,
    hasPast: state.current > 0
  }
}
const doRedo = (state) => async () => {
  await state.lastOperation
  state.current++
  return {
    image: state.chronology[state.current].image,
    hasFuture: state.current < state.chronology.length - 1
  }
}

export default () => {
  const state = {
    lastOperation: new Promise(resolve => resolve())
  }
  const doSelectPart = doSelect(state)
  const doErasePart = doErase(state)
  const doUndoPart = doUndo(state)
  const doRedoPart = doRedo(state)
  return store => next => action => {
    const payload = action.payload
    switch (action.type) {
      case 'SELECT_OPTION':
        state.lastOperation = doSelectPart(payload.src)
        break
      case 'ERASE':
        const { sensitivity } = store.getState().ui
        action.payload = state.lastOperation = doErasePart(payload, sensitivity)
        break
      case 'UNDO':
        action.payload = state.lastOperation = doUndoPart()
        break
      case 'REDO':
        action.payload = state.lastOperation = doRedoPart()
        break
    }
    next(action)
  }
}
