import React, { Component } from 'react'
import './BombInfo.css'
import { Checkbox, Input, InputNumber, Row, Col } from 'antd'

class BombInfo extends Component {
  render () {
    const colLayout = {
      xs: 8,
      sm: 4
    }
    return (
      <div>
        <Row className='header-row'>
          <Col className='header-col' {...colLayout}>
            <Row><label>Batteries</label></Row>
            <Row><InputNumber value={this.props.bombInfo.numBatteries}
              onChange={(value) => this.props.handleFieldChange('numBatteries', value)} /></Row>
          </Col>
          <Col className='header-col' {...colLayout}>
            <Row><label>Serial #</label></Row>
            <Row><Input value={this.props.bombInfo.serialNum}
              onChange={(value) => this.props.handleFieldChange('serialNum', value.target.value)} /></Row>
          </Col>
          <Col className='header-col' {...colLayout}>
            <Row><label>Strikes</label></Row>
            <Row><InputNumber value={this.props.bombInfo.numStrikes}
              onChange={(value) => this.props.handleFieldChange('numStrikes', value)} /></Row>
          </Col>
        </Row>
        <Row className='header-row'>
          <Col className='header-col' {...colLayout}><Checkbox checked={this.props.bombInfo.carLabel}
            onChange={(value) => this.props.handleFieldChange('carLabel', value.target.checked)}>Lit CAR</Checkbox>
          </Col>
          <Col className='header-col' {...colLayout}><Checkbox checked={this.props.bombInfo.frkLabel}
            onChange={(value) => this.props.handleFieldChange('frkLabel', value.target.checked)}>Lit FRK</Checkbox>
          </Col>
          <Col className='header-col' {...colLayout}><Checkbox checked={this.props.bombInfo.parallelPort}
            onChange={(value) => this.props.handleFieldChange('parallelPort', value.target.checked)} >Parallel Port</Checkbox>
          </Col>
        </Row>
      </div>
    )
  }
}

export default BombInfo
