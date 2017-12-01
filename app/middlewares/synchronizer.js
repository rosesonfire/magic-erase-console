import magicErase from 'magic-erase'
import options from './../data/options'

const getCurImage = (local) => local.chronology[local.current].image
const hasPast = (local) => local.current > 0
const hasFuture = (local) => local.current < local.chronology.length - 1
const getOperations = (local, store) => ({
  doInitialize: async () => {
    await local.lastOperation
    return options.map(option => ({ ...option, id: option.id.toString() }))
  },
  doClear: async () => {
    await local.lastOperation
    local.current = local.chronology = null
  },
  doSelection: async (id) => {
    await local.lastOperation
    const option = store.getState().ui.options.find(option => option.id === id)
    local.chronology =
      [{ image: option.src, data: option.src, sensitivity: option.sensitivity }]
    local.current = 0
    return option
  },
  doSetSensitivity: async (sensitivity) => {
    await local.lastOperation
    return sensitivity
  },
  doErase: async (erasePoint) => {
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
  },
  doUndo: async () => {
    await local.lastOperation
    if (hasPast(local)) {
      local.current--
    }
    return { image: getCurImage(local), hasPast: hasPast(local) }
  },
  doRedo: async () => {
    await local.lastOperation
    if (hasFuture(local)) {
      local.current++
    }
    return { image: getCurImage(local), hasFuture: hasFuture(local) }
  },
  doReset: async () => {
    await local.lastOperation
    local.current = 0
    local.chronology.splice(1)
    return local.chronology[0]
  }
})
export default () => {
  const local = { lastOperation: new Promise(resolve => resolve()) }
  return store => {
    const operations = getOperations(local, store)
    return next => action => {
      const payload = action.payload
      switch (action.type) {
        case 'INITIALIZE':
          action.payload = local.lastOperation = operations.doInitialize()
          break
        case 'SELECT_OPTION':
          action.payload = local.lastOperation =
            payload ? operations.doSelection(payload) : operations.doClear()
          action.type = payload ? action.type : 'CLEAR'
          break
        case 'SET_SENSITIVITY':
          action.payload = local.lastOperation =
            operations.doSetSensitivity(payload)
          break
        case 'ERASE':
          action.payload = local.lastOperation = operations.doErase(payload)
          break
        case 'UNDO':
          action.payload = local.lastOperation = operations.doUndo()
          break
        case 'REDO':
          action.payload = local.lastOperation = operations.doRedo()
          break
        case 'RESET':
          action.payload = local.lastOperation = operations.doReset()
          break
      }
      next(action)
    }
  }
}
