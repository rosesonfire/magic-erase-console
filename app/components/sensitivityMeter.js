import React, { Component } from 'react'

export default class SensitivityMeter extends Component {
  getOptionKey = (img) => `${img.src}-${img.sensitivity}`
  getOptionValue = (img) => `${img.src}-${img.sensitivity}`
  getImgName = ({ src }) => src.split('.')[0]
  capitalize = (word) => word[0].toUpperCase() + word.slice(1)
  onChange = (e) => this.props.setSensitivity(e.target.value)
  render = () => this.props.hide ? null : (
    <fieldset className='big resize fixed-height'>
      <legend>Sensitivity</legend>
      <input type='number' min='0.1' max='100' value={this.props.value}
        onChange={this.onChange} />
      <input className='wide' type='range' step='0.1' min='0.1'
        value={this.props.value} onChange={this.onChange} />
    </fieldset>
  )
}
