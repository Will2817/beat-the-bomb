import React, { Component } from 'react'
import { Button, Alert } from 'antd'
import './wire.css'

const colors = {
  r: 'Red',
  b: 'Blue',
  y: 'Yellow',
  w: 'White',
  k: 'Black'
}

class WireModule extends Component {
  getPositionText (position) {
    if (position === this.props.state.wires.length) {
      return 'last'
    } else {
      switch (position) {
        case 1: return 'first'
        case 2: return 'second'
        case 3: return 'third'
        case 4: return 'fourth'
        case 5: return 'fifth'
        default: throw new Error('????')
      }
    }
  }
  wireToCut () {
    const {wires} = this.props.state
    const {serialNum} = this.props.bombInfo
    const count = wires.reduce((count, wire) => {
      count[wire] = (count[wire] || 0) + 1
      return count
    }, {})
    const oddLastdigit = (Number(serialNum[serialNum.length - 1]) % 2 === 1)
    switch (wires.length) {
      case 3:
        if (!count['r']) return {position: 2}
        else if (wires[2] === 'w') return {position: 3}
        else if (count['b'] > 1) return {position: wires.lastIndexOf('b') + 1}
        return {position: 3}
      case 4:
        if (!serialNum) return {error: 'Missing "Serial #" field'}
        else if (count['r'] > 1 && oddLastdigit) return {position: wires.lastIndexOf('r') + 1}
        else if (wires[wires.length - 1] === 'y' && !count['r']) return {position: 1}
        else if (count['b'] === 1) return {position: 1}
        else if (count['y'] > 1) return {position: 4}
        return {position: 2}
      case 5:
        if (!serialNum) return {error: 'Missing "Serial #" field'}
        else if (wires[wires.length - 1] === 'k' && oddLastdigit) return {position: 4}
        else if (count['r'] === 1 && count['y'] > 1) return {position: 1}
        else if (!count['k']) return {position: 2}
        return {position: 1}
      case 6:
        if (!serialNum) return {error: 'Missing "Serial #" field'}
        else if (count['y'] === 0 && oddLastdigit) return {position: 3}
        else if (count['y'] === 1 && count['w'] > 1) return {position: 'fourth'}
        else if (!count['r']) return {position: 'last'}
        return {position: 'fourth'}
      default:
        return {}
    }
  }
  onClick (key) {
    var wires = this.props.state.wires.slice()
    wires.push(key)
    this.props.onStateChange({...this.props.state, wires})
  }
  removeLastColor () {
    var wires = this.props.state.wires.slice()
    wires.pop()
    this.props.onStateChange({...this.props.state, wires})
  }
  render () {
    var wireList = this.props.state.wires.map((wire) => {
      return colors[wire]
    }).join(', ')
    var resultMessage
    var result = this.wireToCut()
    if (result.error) {
      resultMessage = (
        <Alert message={result.error} type='error' />
      )
    } else if (result.position) {
      resultMessage = (<p>Cut the {this.getPositionText(result.position)} wire</p>)
    }
    return (
      <div className='wire-module'>
        <Alert message='This module may require the "Serial #" field' type='info' />
        <div className='buttons-container'>
          <Button.Group className='color-buttons'>{Object.keys(colors).map((key) => {
            return (<Button key={key} onClick={(e) => this.onClick(key)}>{colors[key]}</Button>)
          })}
          </Button.Group>
          <Button onClick={this.removeLastColor.bind(this)} type='danger' icon='close' />
        </div>
        <p className='wire-list'>{wireList}</p>
        {resultMessage}
      </div>
    )
  }
}

export const element = WireModule
export const heading = 'Wires'
export const icon = 'bars'
export const state = { wires: [] }
