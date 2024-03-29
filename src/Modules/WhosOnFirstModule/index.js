import React, { Component } from 'react'
import { AutoComplete, Icon, Row, Col } from 'antd'
import './WhosOnFirst.css'

const displayList = [
  'YES', 'FIRST', 'DISPLAY', 'OKAY', 'SAYS', 'NOTHING', 'BLANK', 'NO', 'LED', 'LEAD', 'READ', 'RED', 'REED', 'LEED',
  'HOLD ON', 'YOU', 'YOU ARE', 'YOUR', 'YOU\'RE', 'UR', 'THERE', 'THEY\'RE', 'THEIR', 'THEY ARE', 'SEE', 'C', 'CEE'
]
displayList.sort()

const words = {
  'READY': 'YES, OKAY, WHAT, MIDDLE, LEFT, PRESS, RIGHT, BLANK, READY, NO, FIRST, UHHH, NOTHING, WAIT',
  'FIRST': 'LEFT, OKAY, YES, MIDDLE, NO, RIGHT, NOTHING, UHHH, WAIT, READY, BLANK, WHAT, PRESS, FIRST',
  'NO': 'BLANK, UHHH, WAIT, FIRST, WHAT, READY, RIGHT, YES, NOTHING, LEFT, PRESS, OKAY, NO, MIDDLE',
  'BLANK': 'WAIT, RIGHT, OKAY, MIDDLE, BLANK, PRESS, READY, NOTHING, NO, WHAT, LEFT, UHHH, YES, FIRST',
  'NOTHING': 'UHHH, RIGHT, OKAY, MIDDLE, YES, BLANK, NO, PRESS, LEFT, WHAT, WAIT, FIRST, NOTHING, READY',
  'YES': 'OKAY, RIGHT, UHHH, MIDDLE, FIRST, WHAT, PRESS, READY, NOTHING, YES, LEFT, BLANK, NO, WAIT',
  'WHAT': 'UHHH, WHAT, LEFT, NOTHING, READY, BLANK, MIDDLE, NO, OKAY, FIRST, WAIT, YES, PRESS, RIGHT',
  'UHHH': 'READY, NOTHING, LEFT, WHAT, OKAY, YES, RIGHT, NO, PRESS, BLANK, UHHH, MIDDLE, WAIT, FIRST',
  'LEFT': 'RIGHT, LEFT, FIRST, NO, MIDDLE, YES, BLANK, WHAT, UHHH, WAIT, PRESS, READY, OKAY, NOTHING',
  'RIGHT': 'YES, NOTHING, READY, PRESS, NO, WAIT, WHAT, RIGHT, MIDDLE, LEFT, UHHH, BLANK, OKAY, FIRST',
  'MIDDLE': 'BLANK, READY, OKAY, WHAT, NOTHING, PRESS, NO, WAIT, LEFT, MIDDLE, RIGHT, FIRST, UHHH, YES',
  'OKAY': 'MIDDLE, NO, FIRST, YES, UHHH, NOTHING, WAIT, OKAY, LEFT, READY, BLANK, PRESS, WHAT, RIGHT',
  'WAIT': 'UHHH, NO, BLANK, OKAY, YES, LEFT, FIRST, PRESS, WHAT, WAIT, NOTHING, READY, RIGHT, MIDDLE',
  'PRESS': 'RIGHT, MIDDLE, YES, READY, PRESS, OKAY, NOTHING, UHHH, BLANK, LEFT, FIRST, WHAT, NO, WAIT',
  'YOU': 'SURE, YOU ARE, YOUR, YOU\'RE, NEXT, UH HUH, UR, HOLD, WHAT?, YOU, UH UH, LIKE, DONE, U',
  'YOU ARE': 'YOUR, NEXT, LIKE, UH HUH, WHAT?, DONE, UH UH, HOLD, YOU, U, YOU\'RE, SURE, UR, YOU ARE',
  'YOUR': 'UH UH, YOU ARE, UH HUH, YOUR, NEXT, UR, SURE, U, YOU\'RE, YOU, WHAT?, HOLD, LIKE, DONE',
  'YOU\'RE': 'YOU, YOU\'RE, UR, NEXT, UH UH, YOU ARE, U, YOUR, WHAT?, UH HUH, SURE, DONE, LIKE, HOLD',
  'UR': 'DONE, U, UR, UH HUH, WHAT?, SURE, YOUR, HOLD, YOU\'RE, LIKE, NEXT, UH UH, YOU ARE, YOU',
  'U': 'UH HUH, SURE, NEXT, WHAT?, YOU\'RE, UR, UH UH, DONE, U, YOU, LIKE, HOLD, YOU ARE, YOUR',
  'UH HUH': 'UH HUH, YOUR, YOU ARE, YOU, DONE, HOLD, UH UH, NEXT, SURE, LIKE, YOU\'RE, UR, U, WHAT?',
  'UH UH': 'UR, U, YOU ARE, YOU\'RE, NEXT, UH UH, DONE, YOU, UH HUH, LIKE, YOUR, SURE, HOLD, WHAT?',
  'WHAT?': 'YOU, HOLD, YOU\'RE, YOUR, U, DONE, UH UH, LIKE, YOU ARE, UH HUH, UR, NEXT, WHAT?, SURE',
  'DONE': 'SURE, UH HUH, NEXT, WHAT?, YOUR, UR, YOU\'RE, HOLD, LIKE, YOU, U, YOU ARE, UH UH, DONE',
  'NEXT': 'WHAT?, UH HUH, UH UH, YOUR, HOLD, SURE, NEXT, LIKE, DONE, YOU ARE, UR, YOU\'RE, U, YOU',
  'HOLD': 'YOU ARE, U, DONE, UH UH, YOU, UR, SURE, WHAT?, YOU\'RE, NEXT, HOLD, UH HUH, YOUR, LIKE',
  'SURE': 'YOU ARE, DONE, LIKE, YOU\'RE, YOU, HOLD, UH HUH, UR, SURE, U, WHAT?, NEXT, YOUR, UH UH',
  'LIKE': 'YOU\'RE, NEXT, U, UR, HOLD, DONE, UH UH, WHAT?, UH HUH, YOU, LIKE, SURE, YOU ARE, YOUR'
}
const wordList = Object.keys(words)
wordList.sort()

class WhosOnFirstModule extends Component {

  getPosition() {
    switch (this.props.state.display) {
      case 'UR':
        return { row : 1, col : 1 }
      case 'FIRST':
      case 'OKAY':
      case 'C':
        return { row : 1, col : 2 }
      case 'YES':
      case 'NOTHING':
      case 'LED':
      case 'THEY ARE':
        return { row : 2, col : 1 }
      case 'BLANK':
      case 'READ':
      case 'RED':
      case 'YOU':
      case 'YOUR':
      case 'YOU\'RE':
      case 'THEIR':
        return { row : 2, col : 2 }
      case '':
      case 'REED':
      case 'LEED':
      case 'THEY\'RE':
        return { row : 3, col : 1 }
      case 'DISPLAY':
      case 'SAYS':
      case 'NO':
      case 'LEAD':
      case 'HOLD ON':
      case 'YOU ARE':
      case 'THERE':
      case 'SEE':
      case 'CEE':
        return { row : 3, col : 2 }
      default:
        return {}
    }
  }
  onUpdateField (field, value) {
    var state = {...this.props.state}
    state[field] = value
    this.props.onStateChange(state)
  }
  render () {
    const position = this.getPosition()
    const icon = (<Icon type='eye-o' />)
    const buttons = words[this.props.state.button]
    return (
      <div className='whos-on-first-module'>
        <Row>
          <Col span={12} className='step-column'>
            <AutoComplete className='display-input' placeholder='Display' value={this.props.state.display}
              dataSource={displayList} onChange={(value) => this.onUpdateField('display', value.toUpperCase())} />

            <Row className='table-row'>
              <Col span={12} className='table-column'>
                {position.row === 1 && position.col === 1 ? icon : ''}
              </Col>
              <Col span={12} className='table-column'>
                {position.row === 1 && position.col === 2 ? icon : ''}
              </Col>
            </Row>

            <Row className='table-row'>
              <Col span={12} className='table-column'>
                {position.row === 2 && position.col === 1 ? icon : ''}
              </Col>
              <Col span={12} className='table-column'>
                {position.row === 2 && position.col === 2 ? icon : ''}
              </Col>
            </Row>

            <Row className='table-row'>
              <Col span={12} className='table-column'>
                {position.row === 3 && position.col === 1 ? icon : ''}
              </Col>
              <Col span={12} className='table-column'>
                {position.row === 3 && position.col === 2 ? icon : ''}
              </Col>
            </Row>
          </Col>

          <Col span={12} className='step-column'>
            <AutoComplete className='label-input' placeholder='Label' value={this.props.state.button} dataSource={wordList}
              onChange={(value) => this.onUpdateField('button', value.toUpperCase())} />

            <h3>Click the first label that appears in the list:</h3>
            {buttons}
          </Col>
        </Row>
      </div>
    )
  }
}

export const element = WhosOnFirstModule
export const heading = 'Who\'s on First'
export const icon = 'calculator'
export const state = { }
