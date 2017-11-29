import React, { Component } from 'react'
import { connect } from 'react-redux'
import ImageSelector from './imageSelector'
import SensitivityMeter from './sensitivityMeter'
import Image from './image'
import ErasedImage from './erasedImage'
import TimeTraveler from './timeTraveler'
import { selectOption, setSensitivity, undo, redo } from './../actions/ui'
import { erase } from './../actions/worker'

@connect(store => ({
  options: store.ui.options,
  imgSrc: store.ui.imgSrc,
  sensitivity: store.ui.sensitivity,
  erasedImgSrc: store.ui.erasedImgSrc,
  hasPast: store.ui.hasPast,
  hasFuture: store.ui.hasFuture,
  hide: store.ui.hide
}), dispatch => ({
  selectOption: (option) => dispatch(selectOption(option)),
  setSensitivity: (sensitivity) => dispatch(setSensitivity(sensitivity)),
  erase: (erasePoint) => dispatch(erase(erasePoint)),
  undo: () => dispatch(undo),
  redo: () => dispatch(redo)
}))
export default class App extends Component {
  render = () =>
    <div>
      <ImageSelector options={this.props.options}
        selectOption={this.props.selectOption} />
      <SensitivityMeter value={this.props.sensitivity} hide={this.props.hide}
        setSensitivity={this.props.setSensitivity} />
      <Image src={this.props.imgSrc} hide={this.props.hide} />
      <ErasedImage src={this.props.erasedImgSrc} hide={this.props.hide}
        erase={this.props.erase} />
      <TimeTraveler hasPast={this.props.hasPast}
        hasFuture={this.props.hasFuture} undo={this.props.undo}
        redo={this.props.redo} hide={this.props.hide} />
    </div>
}
