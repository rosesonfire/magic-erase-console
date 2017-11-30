import magicErase from 'magic-erase'
import options from './../data/options'

const doInitialize = (local) => async () => {
  await local.lastOperation
  return options
}
const doClear = (local) => async () => {
  await local.lastOperation
  local.chronology = null
  local.current = null
}
const getOption = (store, id) =>
  store.getState().ui.options.find(option => option.id === id)
const doSelection = (local) => (store) => async (id) => {
  await local.lastOperation
  const option = getOption(store, id)
  local.chronology =
    [{ image: option.src, data: option.src, sensitivity: option.sensitivity }]
  local.current = 0
  return option
}
const doSetSensitivity = (local) => async (sensitivity) => {
  await local.lastOperation
  return sensitivity
}
const doErase = (local) => (store) => async (erasePoint) => {
  await local.lastOperation
  const { sensitivity } = store.getState().ui
  const { data } = local.chronology[local.current]
  const response =
    await magicErase({ image: data, erasePoints: [erasePoint], sensitivity })
  const image = `data:image/jpeg;base64,${response.base64Img}`
  local.current++
  local.chronology.splice(local.current)
  local.chronology.push({ image, data: response.data })
  return image
}
const getCurImage = (local) => local.chronology[local.current].image
const hasPast = (local) => local.current > 0
const doUndo = (local) => async () => {
  await local.lastOperation
  if (hasPast(local)) {
    local.current--
  }
  return {
    image: getCurImage(local),
    hasPast: hasPast(local)
  }
}
const hasFuture = (local) => local.current < local.chronology.length - 1
const doRedo = (local) => async () => {
  await local.lastOperation
  if (hasFuture(local)) {
    local.current++
  }
  return {
    image: getCurImage(local),
    hasFuture: hasFuture(local)
  }
}
const doReset = (local) => async () => {
  await local.lastOperation
  local.current = 0
  local.chronology.splice(1)
  return local.chronology[0]
}
export default () => {
  const local = { lastOperation: new Promise(resolve => resolve()) }
  const doInitializePart = doInitialize(local)
  const doClearPart = doClear(local)
  const doSelectionPart1 = doSelection(local)
  const doSetSensitivityPart = doSetSensitivity(local)
  const doErasePart1 = doErase(local)
  const doUndoPart = doUndo(local)
  const doRedoPart = doRedo(local)
  const doResetPart = doReset(local)
  return store => {
    const doSelectionPart2 = doSelectionPart1(store)
    const doErasePart2 = doErasePart1(store)
    return next => action => {
      const payload = action.payload
      switch (action.type) {
        case 'INITIALIZE':
          action.payload = local.lastOperation = doInitializePart()
          break
        case 'SELECT_OPTION':
          if (payload) {
            action.payload = local.lastOperation = doSelectionPart2(payload)
          } else {
            action.payload = local.lastOperation = doClearPart()
            action.type = 'CLEAR'
          }
          break
        case 'SET_SENSITIVITY':
          action.payload = local.lastOperation = doSetSensitivityPart(payload)
          break
        case 'ERASE':
          action.payload = local.lastOperation = doErasePart2(payload)
          break
        case 'UNDO':
          action.payload = local.lastOperation = doUndoPart()
          break
        case 'REDO':
          action.payload = local.lastOperation = doRedoPart()
          break
        case 'RESET':
          action.payload = local.lastOperation = doResetPart()
          break
      }
      next(action)
    }
  }
}
