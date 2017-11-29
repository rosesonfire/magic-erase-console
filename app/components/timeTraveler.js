import React, { Component } from 'react'

export default class TimeTraveler extends Component {
  undo = () => this.props.undo()
  redo = () => this.props.redo()
  render () {
    return this.props.hide ? null : (
      <fieldset>
        <legend>Actions</legend>
        <button onClick={this.undo} disabled={!this.props.hasPast}>Undo</button><br /><br />
        <button onClick={this.redo} disabled={!this.props.hasFuture}>Redo</button>
      </fieldset>
    )
  }
}
