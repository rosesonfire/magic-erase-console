import React, { Component } from 'react'
import { connect } from 'react-redux'
import ImageSelector from './imageSelector'
import SensitivityMeter from './sensitivityMeter'
import Image from './image'
import ErasedImage from './erasedImage'
import TimeTraveler from './timeTraveler'
import appConnector from './../connectors/appConnector'

@connect(appConnector.storeConnector, appConnector.actionConnector)
export default class App extends Component {
  componentDidMount = () => this.props.initialize()
  render = () =>
    <div>
      <ImageSelector options={this.props.options}
        selectOption={this.props.selectOption} />
      {this.props.hide ? null : (
        <div>
          <SensitivityMeter value={this.props.sensitivity}
            setSensitivity={this.props.setSensitivity} />
          <Image src={this.props.imgSrc} />
          <ErasedImage src={this.props.erasedImgSrc} erase={this.props.erase} />
          <TimeTraveler hasPast={this.props.hasPast}
            hasFuture={this.props.hasFuture} undo={this.props.undo}
            redo={this.props.redo} reset={this.props.reset}
            sensitivityChanged={this.props.sensitivityChanged} />
        </div>)}
    </div>
}
