import React, { Component } from 'react'

export default class Image extends Component {
  render () {
    return this.props.hide ? null : (
      <fieldset className='float'>
        <legend>Image</legend>
        <img className='fixed-img' src={this.props.src} />
      </fieldset>
    )
  }
}
