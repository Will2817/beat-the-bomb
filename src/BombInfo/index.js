import React, { Component } from 'react'
import './BombInfo.css'
import { Form, Checkbox, Input, InputNumber, Row, Col } from 'antd'
const FormItem = Form.Item

class BombInfo extends Component {
  render () {
    const formItemLayout = {
      labelCol: { span: 14 },
      wrapperCol: { span: 14 }
    }
    return (
      <div>
        <Row>
          <Col span={4} ><FormItem {...formItemLayout} label={'# of Batteries'}>
            <InputNumber value={this.props.bombInfo.numBatteries}
              onChange={(value) => this.props.handleFieldChange('numBatteries', value)} />
          </FormItem></Col>
          <Col span={4} ><FormItem {...formItemLayout} label={'Serial #'}>
            <Input value={this.props.bombInfo.serialNum}
              onChange={(value) => this.props.handleFieldChange('serialNum', value)} />
          </FormItem></Col>
          <Col span={4} ><FormItem {...formItemLayout} label={'# of Strikes'}>
            <InputNumber value={this.props.bombInfo.numStrikes}
              onChange={(value) => this.props.handleFieldChange('numStrikes', value)} />
          </FormItem></Col>
        </Row>
        <Row>
          <Col span={4} ><Checkbox value={this.props.bombInfo.carLabel}
            onChange={(value) => this.props.handleFieldChange('carLabel', value)} >Lit CAR Label</Checkbox>
          </Col>
          <Col span={4} ><Checkbox value={this.props.bombInfo.frkLabel}
            onChange={(value) => this.props.handleFieldChange('frkLabel', value)}>Lit FRK Label</Checkbox>
          </Col>
          <Col span={4} ><Checkbox value={this.props.bombInfo.parallelPort}
            onChange={(value) => this.props.handleFieldChange('parallelPort', value)} >Parrallel Port</Checkbox>
          </Col>
        </Row>
      </div>
    )
  }
}

export default BombInfo
