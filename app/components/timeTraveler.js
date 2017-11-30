import React, { Component } from 'react'

export default class TimeTraveler extends Component {
  render = () =>
    <fieldset>
      <legend>Actions</legend>
      <button onClick={this.props.undo} disabled={!this.props.hasPast}>
        Undo
      </button>
      <br /><br />
      <button onClick={this.props.redo} disabled={!this.props.hasFuture}>
        Redo
      </button>
      <br /><br /><br /><br />
      <button onClick={this.props.reset}
        disabled={!this.props.hasPast && !this.props.hasFuture &&
          !this.props.sensitivityChanged}>
        Reset
      </button>
    </fieldset>
}
