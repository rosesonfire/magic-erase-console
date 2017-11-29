import React, { Component } from 'react'
import { connect } from 'react-redux'
import ImageSelector from './imageSelector'
import SensitivityMeter from './sensitivityMeter'
import Image from './image'
import ErasedImage from './erasedImage'
import TimeTraveler from './timeTraveler'
import { selectOption, setSensitivity } from './../actions/ui'
import { erase } from './../actions/worker'

@connect(store => ({
  options: store.ui.options,
  imgSrc: store.ui.imgSrc,
  sensitivity: store.ui.sensitivity,
  erasedImgSrc: store.worker.erasedImgSrc,
  hasPast: store.ui.hasPast,
  hasFuture: store.ui.hasFuture,
  hideCriticals: store.ui.hideCriticals
}), dispatch => ({
  selectOption: (option) => dispatch(selectOption(option)),
  setSensitivity: (sensitivity) => dispatch(setSensitivity(sensitivity)),
  erase: (erasePoint) => dispatch(erase(erasePoint))
}))
export default class App extends Component {
  render () {
    return (
      <div>
        <ImageSelector options={this.props.options} selectOption={this.props.selectOption} />
        <SensitivityMeter value={this.props.sensitivity} hide={this.props.hideCriticals} setSensitivity={this.props.setSensitivity} />
        <Image src={this.props.imgSrc} hide={this.props.hideCriticals} />
        <ErasedImage src={this.props.erasedImgSrc} hide={this.props.hideCriticals} erase={this.props.erase} />
        <TimeTraveler hasPast={this.props.hasPast} hasFuture={this.props.hasFuture} hide={this.props.hideCriticals} />
      </div>)
  }
}
