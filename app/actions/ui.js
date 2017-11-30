export const initialize = { type: 'INITIALIZE' }
export const selectOption = (id) => ({ type: 'SELECT_OPTION', payload: id })
export const setSensitivity = (sensitivity) =>
  ({ type: 'SET_SENSITIVITY', payload: sensitivity })
export const undo = { type: 'UNDO' }
export const redo = { type: 'REDO' }
export const reset = { type: 'RESET' }
