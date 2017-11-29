import React, { Component } from 'react'

export default class ImageSelector extends Component {
  capitalize = (word) => word[0].toUpperCase() + word.slice(1)
  onChange = (e) => this.props.selectOption(e.target.value)
  render () {
    return (
      <fieldset className='big fixed-height-small'>
        <legend>Image file</legend>
        <select onChange={this.onChange}>
          <option value=''>--select--</option>
          {this.props.options.map((option, index) =>
            <option
              value={option.id}
              key={option.id}>
              {this.capitalize(option.src)}
            </option>)}
        </select>
      </fieldset>
    )
  }
}
