import React, { Component } from 'react'

const ledConfigs = [
  {
    direction: 'Up',
    leds: [2, 4, 5, 6, 7, 8, 9, 11]
  },
  {
    direction: 'Up',
    leds: [0, 2, 4, 7, 8, 10, 11]},
  {
    direction: 'Down',
    leds: [1, 2, 5, 6, 7, 8, 9, 11]},
  {
    direction: 'Down',
    leds: [0, 2, 4, 7, 11]},
  {
    direction: 'Left',
    leds: [4, 6, 9, 10, 11]},
  {
    direction: 'Left',
    leds: [4, 9, 10]},
  {
    direction: 'Right',
    leds: [0, 2, 3, 4, 5, 6, 7, 8, 10]},
  {
    direction: 'Right',
    leds: [0, 2, 3, 6, 7, 8, 10]}
]

class KnobModule extends Component {
  updateLeds (i, event) {
    const ledConfig = this.props.state.ledConfig.slice()
    ledConfig[i] = event.target.checked
    this.props.onStateChange({
      ledConfig: ledConfig
    })
  }
  renderLed (i) {
    return (
      <input key={i} type='checkbox' checked={this.props.state.ledConfig[i]} onChange={(e) => this.updateLeds(i, e)} />
    )
  }
  renderMatchingDirections () {
    const uniqueDirections = []
    ledConfigs.forEach((config) => {
      const nonMatchingValues = this.props.state.ledConfig.filter((val, i) => {
        return val && !config.leds.includes(i)
      })
      const matches = nonMatchingValues.length === 0

      if (matches && !uniqueDirections.includes(config.direction)) {
        uniqueDirections.push(config.direction)
      }
    })
    return uniqueDirections.map((dir) =>
      <li key={dir}>{dir}</li>
    )
  }
  render () {
    const topRow = []
    for (var i = 0; i < 6; i++) {
      topRow.push(this.renderLed(i))
    }
    const bottomRow = []
    for (i = 6; i < 12; i++) {
      bottomRow.push(this.renderLed(i))
    }
    const possibleDirections = this.renderMatchingDirections()
    return (
      <div>
        <h2>Leds</h2>
        {topRow}
        <br />
        {bottomRow}
        <h2>Possible Directions</h2>
        <ul>
          {possibleDirections}
        </ul>
      </div>
    )
  }
}

export const element = KnobModule
export const heading = 'Knob'
export const icon = 'bulb'
export const state = { ledConfig: Array(12).fill(false) }
