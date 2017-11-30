import React, { Component } from 'react'

export default class Image extends Component {
  render = () =>
    <fieldset className='float'>
      <legend>Image</legend>
      <img className='fixed-img' src={this.props.src} />
    </fieldset>
}
