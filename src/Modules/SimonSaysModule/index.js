import React, { Component } from 'react'
import { Table, Alert } from 'antd'

class SimonSaysModule extends Component {
  vowelInSerial () {
    return /[aeiou]/i.test(this.props.bombInfo.serialNum)
  }
  render () {
    var element = (<Alert message='Missing "Serial #" field' type='error' />)
    if (this.props.bombInfo.serialNum) {
      var dataSource
      if (this.vowelInSerial()) {
        switch (this.props.bombInfo.numStrikes || 0) {
          case 0: dataSource = [{key: '1', r: 'Blue', b: 'Red', g: 'Yellow', y: 'Green'}]
            break
          case 1:dataSource = [{key: '1', r: 'Yellow', b: 'Green', g: 'Blue', y: 'Red'}]
            break
          case 2: dataSource = [{key: '1', r: 'Green', b: 'Red', g: 'Yellow', y: 'Blue'}]
            break
          default: dataSource = []
        }
      } else {
        switch (this.props.bombInfo.numStrikes || 0) {
          case 0: dataSource = [{key: '1', r: 'Blue', b: 'Yellow', g: 'Green', y: 'Red'}]
            break
          case 1: dataSource = [{key: '1', r: 'Red', b: 'Blue', g: 'Yellow', y: 'Green'}]
            break
          case 2: dataSource = [{key: '1', r: 'Yellow', b: 'Green', g: 'Blue', y: 'Red'}]
            break
          default: dataSource = []
        }
      }
      element = (
        <Table size='small' pagination={false}
          columns={[{title: 'Red', dataIndex: 'r'}, {title: 'Blue', dataIndex: 'b'}, {title: 'Green', dataIndex: 'g'}, {title: 'Yellow', dataIndex: 'y'}]}
          dataSource={dataSource}
        />)
    }
    return (
      <div className='simon-says-module'>
        <Alert message='This module will require the following fields: "Serial #" and "Strikes"' type='info' />
        {element}
      </div>
    )
  }
}

export const element = SimonSaysModule
export const heading = 'Simon Says'
export const icon = 'notification'
export const state = { }
