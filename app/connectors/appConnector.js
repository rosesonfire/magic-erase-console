import { initialize, selectOption, setSensitivity, undo, redo, reset }
  from './../actions/ui'
import { erase } from './../actions/worker'

export default {
  storeConnector: store => ({
    options: store.ui.options,
    imgSrc: store.ui.imgSrc,
    sensitivity: store.ui.sensitivity,
    sensitivityChanged: store.ui.sensitivityChanged,
    erasedImgSrc: store.ui.erasedImgSrc,
    hasPast: store.ui.hasPast,
    hasFuture: store.ui.hasFuture,
    hide: store.ui.hide
  }),
  actionConnector: dispatch => ({
    initialize: () => dispatch(initialize),
    selectOption: (option) => dispatch(selectOption(option)),
    setSensitivity: (sensitivity) => dispatch(setSensitivity(sensitivity)),
    erase: (erasePoint) => dispatch(erase(erasePoint)),
    undo: () => dispatch(undo),
    redo: () => dispatch(redo),
    reset: () => dispatch(reset)
  })
}
