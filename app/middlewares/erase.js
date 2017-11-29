import { erase } from './../services/worker'

export default store => next => action => {
  switch (action.type) {
    case 'ERASE':
      const { erasedImgData } = store.getState().worker
      const { sensitivity } = store.getState().ui
      const payload = action.payload
      action.payload = erase(erasedImgData, payload, sensitivity).then(response =>
        ({
          erasedImgSrc: `data:image/jpeg;base64,${response.base64Img}`,
          erasedImgData: response.data
        }))
      break
  }
  next(action)
}
