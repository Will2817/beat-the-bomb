import React, { Component } from 'react'
import { Table, Row, Col, Radio, Alert } from 'antd'
import './button.css'
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

class ButtonModule extends Component {
  hold () {
    const {color, word} = this.props.state
    const {numBatteries, frkLabel, carLabel} = this.props.bombInfo
    if (color === 'b' && word === 'a') {
      return true
    } else if (word === 'd' && numBatteries > 1) {
      return false
    } else if (color === 'w' && carLabel) {
      return true
    } else if (numBatteries > 2 && frkLabel) {
      return false
    } else if (color === 'y') {
      return true
    } else if (color === 'r' && word === 'h') {
      return false
    }
    return true
  }
  onChange (e, field) {
    var state = {...this.props.state}
    state[field] = e.target.value
    this.props.onStateChange(state)
  }
  render () {
    var howToPress
    if (this.hold()) {
      howToPress = (<div>
        <p className='hold-instructions'>Press and Hold the button. Note the color of the strip on the right.
                                         Release when the countdown timer has the corresponding number in an position.</p>
        <Table size='small' pagination={false}
          columns={[{title: 'Blue', dataIndex: 'b'}, {title: 'Yellow', dataIndex: 'y'}, {title: 'Other', dataIndex: 'o'}]}
          dataSource={[{key: '1', b: '4', y: '5', o: '1'}]}
        />
      </div>)
    } else {
      howToPress = <p>Click the button</p>
    }
    return (
      <div className='button-module'>
        <Alert message='This module may require the following fields: "Batteries", "Lit CAR", "Lit FRK"' type='info' />
        <Row>
          <Col xs={24} sm={12} style={{ paddingRight: '10px' }}>
            <RadioGroup onChange={(e) => this.onChange(e, 'color')} value={this.props.state.color}>
              <RadioButton value='b'>Blue</RadioButton>
              <RadioButton value='r'>Red</RadioButton>
              <RadioButton value='y'>Yellow</RadioButton>
              <RadioButton value='w'>White</RadioButton>
              <RadioButton value='o'><i>Other</i></RadioButton>
            </RadioGroup>
          </Col>
          <Col xs={24} sm={12}>
            <RadioGroup onChange={(e) => this.onChange(e, 'word')} value={this.props.state.word}>
              <RadioButton value='a'>Abort</RadioButton>
              <RadioButton value='d'>Detonate</RadioButton>
              <RadioButton value='h'>Hold</RadioButton>
              <RadioButton value='o'><i>Other</i></RadioButton>
            </RadioGroup>
          </Col>
        </Row>
        {howToPress}
      </div>
    )
  }
}

export const element = ButtonModule
export const heading = 'The Button'
export const icon = 'play-circle-o'
export const state = { }
