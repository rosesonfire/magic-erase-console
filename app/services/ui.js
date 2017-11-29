import options from './../data/options'

export const getAllOptions = () =>
  options.map(option =>
    ({ id: option.id, src: option.src }))

export const getOption = (id) =>
  options.find(option => option.id === id)
