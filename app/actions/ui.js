export const selectOption = (id) => ({
  type: 'SELECT_OPTION',
  payload: id
})

export const setSensitivity = (sensitivity) => ({
  type: 'SET_SENSITIVITY',
  payload: sensitivity
})
