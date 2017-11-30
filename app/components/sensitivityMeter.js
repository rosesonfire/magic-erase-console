import React, { Component } from 'react'

export default class SensitivityMeter extends Component {
  onChange = (e) => this.props.setSensitivity(e.target.value)
  render = () =>
    <fieldset className='big resize fixed-height'>
      <legend>Sensitivity (ADJUST TO GET BEST RESULT)</legend>
      <input type='number' min='0.1' max='100' value={this.props.value}
        onChange={this.onChange} />
      <input className='wide' type='range' step='0.1' min='0.1'
        value={this.props.value} onChange={this.onChange} />
    </fieldset>
}
