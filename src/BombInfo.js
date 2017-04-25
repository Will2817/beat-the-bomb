import React, { Component } from 'react'
import Text from 'material-ui/Text'

class BombInfo extends Component {
  render () {
    return (
      <div>
        <Text type='headline' colorInherit>Bomb Info</Text>
        <label># of batteries</label>
        <input type='text' value='Hello World' />
      </div>
    )
  }
}

export default BombInfo
