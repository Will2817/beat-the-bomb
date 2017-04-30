import React, { Component } from 'react'
import { Alert, Button } from 'antd'

const colors = {
  r: 'Red',
  b: 'Blue',
  g: 'Green',
  y: 'Yellow'
}

class SimonSaysModule extends Component {
  getLookup () {
    if (this.vowelInSerial()) {
      switch (this.props.bombInfo.numStrikes || 0) {
        case 0: return {r: 'Blue', b: 'Red', g: 'Yellow', y: 'Green'}
        case 1: return {r: 'Yellow', b: 'Green', g: 'Blue', y: 'Red'}
        case 2: return {r: 'Green', b: 'Red', g: 'Yellow', y: 'Blue'}
        default: return {}
      }
    } else {
      switch (this.props.bombInfo.numStrikes || 0) {
        case 0: return {r: 'Blue', b: 'Yellow', g: 'Green', y: 'Red'}
        case 1: return {r: 'Red', b: 'Blue', g: 'Yellow', y: 'Green'}
        case 2: return {r: 'Yellow', b: 'Green', g: 'Blue', y: 'Red'}
        default: return {}
      }
    }
  }
  vowelInSerial () {
    return /[aeiou]/i.test(this.props.bombInfo.serialNum)
  }
  onClick (key) {
    var buttons = this.props.state.buttons.slice()
    buttons.push(key)
    this.props.onStateChange({...this.props.state, buttons})
  }
  removeLastColor () {
    var buttons = this.props.state.buttons.slice()
    buttons.pop()
    this.props.onStateChange({...this.props.state, buttons})
  }
  render () {
    var sequence = this.props.state.buttons.map((color) => {
      return colors[color]
    }).join(', ')
    var response
    if (this.props.bombInfo.serialNum) {
      response = this.props.state.buttons.map((color) => {
        return this.getLookup()[color]
      }).join(', ')
    } else {
      response = (<Alert message='Missing "Serial #" field' type='error' />)
    }
    return (
      <div className='simon-says-module'>
        <Alert message='This module will require the following fields: "Serial #" and "Strikes"' type='info' />
        <div className='buttons-container'>
          <Button.Group className='color-buttons'>{Object.keys(colors).map((key) => {
            return (<Button key={key} onClick={(e) => this.onClick(key)}>{colors[key]}</Button>)
          })}
          </Button.Group>
          <Button onClick={this.removeLastColor.bind(this)} type='danger' icon='close' />
        </div>
        <h3>Sequence</h3>
        {sequence}
        <h3>Response</h3>
        {response}
      </div>
    )
  }
}

export const element = SimonSaysModule
export const heading = 'Simon Says'
export const icon = 'notification'
export const state = { buttons: [] }
