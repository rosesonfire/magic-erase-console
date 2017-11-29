import React, { Component } from 'react'

export default class TimeTraveler extends Component {
  render () {
    return this.props.hide ? null : (
      <fieldset>
        <legend>Actions</legend>
        <button disabled={!this.props.hasPast}>Undo</button><br /><br />
        <button disabled={!this.props.hasFuture}>Redo</button>
      </fieldset>
    )
  }
}
