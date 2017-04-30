import React, { Component } from 'react'
import { Checkbox, Row, Col, Icon, Alert } from 'antd'
import './wires.css'

const cutLookup = {
  'true': {
    'true': {
      'true': {
        'true': 'D',
        'false': 'D'
      },
      'false': {
        'true': 'S',
        'false': 'S'
      }
    },
    'false': {
      'true': {
        'true': 'B',
        'false': 'C'
      },
      'false': {
        'true': 'B',
        'false': 'S'
      }
    }
  },
  'false': {
    'true': {
      'true': {
        'true': 'P',
        'false': 'D'
      },
      'false': {
        'true': 'D',
        'false': 'S'
      }
    },
    'false': {
      'true': {
        'true': 'B',
        'false': 'D'
      },
      'false': {
        'true': 'D',
        'false': 'C'
      }
    }
  }
}

class ComplicatedWiresModule extends Component {
  cutWire (wire) {
    var result = cutLookup[wire.red || false][wire.blue || false][wire.star || false][wire.led || false]
    var serialNum = this.props.bombInfo.serialNum || ''
    switch (result) {
      case 'C': return ({err: null, cut: true})
      case 'S': return ({err: (!serialNum) ? 'Missing "Serial #" field' : '', cut: (Number(serialNum[serialNum.length - 1]) % 2 === 0)})
      case 'P': return ({err: null, cut: this.props.bombInfo.parallelPort})
      case 'B': return ({err: null, cut: this.props.bombInfo.numBatteries >= 2})
      default: return ({err: null, cut: false})
    }
  }
  handleChange (index, field, checked) {
    var wires = this.props.state.wires.slice()
    var wire = {...wires[index]}
    wire[field] = checked
    wires[index] = wire
    this.props.onStateChange({...this.props.state, wires})
  }
  render () {
    var error
    var wires = this.props.state.wires.map((wire, index) => {
      var result = this.cutWire(wire)
      if (result.err) {
        error = (<Alert message={result.err} type='error' />)
      }
      var cut = result.cut ? <Icon type='check' /> : ''
      return (
        <Col key={index} span={3} className='input-column'>
          <Checkbox checked={wire.led} onChange={(e) => this.handleChange(index, 'led', e.target.checked)} />
          <Checkbox checked={wire.red} onChange={(e) => this.handleChange(index, 'red', e.target.checked)} />
          <Checkbox checked={wire.blue} onChange={(e) => this.handleChange(index, 'blue', e.target.checked)} />
          <Checkbox checked={wire.star} onChange={(e) => this.handleChange(index, 'star', e.target.checked)} />
          {cut}
        </Col>
      )
    })

    return (
      <div className='complicated-wires-module'>
        <Alert message='This module may require the following fields: "Batteries", "Serial #", "Parallel Port"' type='info' />
        <div className='buttons-container'>
          <Row>
            <Col span={6} className='input-column'>
              <h5>LED</h5>
              <h5>Red</h5>
              <h5>Blue</h5>
              <h5>Star</h5>
              <h5>Cut Wire</h5>
            </Col>
            {wires}
          </Row>
        </div>
        {error}
      </div>
    )
  }
}

export const element = ComplicatedWiresModule
export const heading = 'Complicated Wires'
export const icon = 'usb'
export const state = { wires: Array(6).fill({}) }
