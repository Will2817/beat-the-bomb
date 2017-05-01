import React, { Component } from 'react'
import { AutoComplete, Icon, Table, Row, Col } from 'antd'
import './WhosOnFirst.css'

const columns = [{
  dataIndex: 'col1'
}, {
  dataIndex: 'col2'
}]

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

class WhosOnFirstModule extends Component {

  onUpdateField (field, value) {
    var state = {...this.props.state}
    state[field] = value
    this.props.onStateChange(state)
  }
  render () {
    const display = this.props.state.display
    const icon = (<Icon type='eye-o' />)
    const data = [{
      key: '1',
      col1: display === 'UR' ? icon : '',
      col2: display === 'FIRST' || display === 'OKAY' || display === 'C' ? icon : ''
    }, {
      key: '2',
      col1: display === 'YES' || display === 'NOTHING' || display === 'LED' || display === 'THEY ARE' ? icon : '',
      col2: display === 'BLANK' || display === 'READ' || display === 'RED' || display === 'YOU' ||
            display === 'YOUR' || display === 'YOU\'RE' || display === 'THEIR' ? icon : ''
    }, {
      key: '3',
      col1: !display || display === 'REED' || display === 'LEED' || display === 'THEY\'RE' ? icon : '',
      col2: display === 'DISPLAY' || display === 'SAYS' || display === 'NO' || display === 'LEAD' ||
            display === 'HOLD ON' || display === 'YOU ARE' || display === 'THERE' || display === 'SEE' ||
            display === 'CEE' ? icon : ''
    }]
    const buttons = words[this.props.state.button]
    return (
      <div className='whos-on-first-module'>
        <Row>
          <Col span={8}>
            <AutoComplete value={this.props.state.display} dataSource={Object.keys(words)}
              onChange={(value) => this.onUpdateField('display', value.toUpperCase())} />
          </Col>
          <Col span={4}>
            <Table columns={columns} dataSource={data} size='middle' showHeader={false} bordered pagination={false} />
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <AutoComplete value={this.props.state.button} dataSource={Object.keys(words)}
              onChange={(value) => this.onUpdateField('button', value.toUpperCase())} />
          </Col>
        </Row>
        <h3>Press first button that appears in list</h3>
        {buttons}
      </div>
    )
  }
}

export const element = WhosOnFirstModule
export const heading = 'Who\'s on First'
export const icon = 'calculator'
export const state = { }
