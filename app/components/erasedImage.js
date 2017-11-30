import React, { Component } from 'react'

export default class ErasedImage extends Component {
  onClick = (e) =>
    this.props.erase([
      e.nativeEvent.offsetX / e.target.width * 100,
      e.nativeEvent.offsetY / e.target.height * 100])
  render = () =>
    <fieldset className='float'>
      <legend>Erased Image (CLICK ON BLURRY AREAS)</legend>
      <img className='fixed-img' src={this.props.src} onClick={this.onClick} />
    </fieldset>
}
