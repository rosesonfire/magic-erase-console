import React, { Component } from 'react'

export default class ImageSelector extends Component {
  onChange = (e) => this.props.selectOption(e.target.value)
  render = () =>
    <fieldset className='big fixed-height-small'>
      <legend>Image file</legend>
      <select onChange={this.onChange}>
        <option value=''>--select--</option>
        {this.props.options.map((option, index) =>
          <option value={option.id} key={option.id}>{option.name}</option>)}
      </select>
    </fieldset>
}
