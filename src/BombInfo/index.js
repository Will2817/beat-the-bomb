import React, { Component } from 'react'
import { Form, Checkbox, Input, InputNumber, Row, Col } from 'antd'
const FormItem = Form.Item

class BombInfo extends Component {
  render () {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    }
    return (
      <div>
        <Row gutter={10}>
          <Col span={8} ><FormItem {...formItemLayout} label={'# of Batteries'}>
            <InputNumber value={this.props.bombInfo.numBatteries}
              onChange={(value) => this.props.handleFieldChange('numBatteries', value)} />
          </FormItem></Col>
          <Col span={8} ><FormItem {...formItemLayout} label={'Serial #'}>
            <Input value={this.props.bombInfo.serialNum}
              onChange={(value) => this.props.handleFieldChange('serialNum', value)} />
          </FormItem></Col>
          <Col span={8} ><FormItem {...formItemLayout} label={'CAR Label'}>
            <Input value={this.props.bombInfo.carLabel}
              onChange={(value) => this.props.handleFieldChange('carLabel', value)} />
          </FormItem></Col>
          <Col span={8} ><FormItem {...formItemLayout} label={'# of Strikes'}>
            <InputNumber value={this.props.bombInfo.numStrikes}
              onChange={(value) => this.props.handleFieldChange('numStrikes', value)} />
          </FormItem></Col>
          <Col span={8} ><FormItem {...formItemLayout} label={'FRK Label'}>
            <Input value={this.props.bombInfo.frkLabel}
              onChange={(value) => this.props.handleFieldChange('frkLabel', value)} />
          </FormItem></Col>
          <Col span={8} ><FormItem {...formItemLayout} label={'Parallel Port'}>
            <Checkbox value={this.props.bombInfo.parallelPort}
              onChange={(value) => this.props.handleFieldChange('parallelPort', value)} />
          </FormItem></Col>
        </Row>
      </div>
    )
  }
}

export default BombInfo
