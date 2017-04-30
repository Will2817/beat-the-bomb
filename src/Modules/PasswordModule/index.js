import React, { Component } from 'react'
import { Input, Col, Row } from 'antd'
import './password.css'

const bombPasswords = [
  'about', 'after', 'again', 'below', 'could',
  'every', 'first', 'found', 'great', 'house',
  'large', 'learn', 'never', 'other', 'place',
  'plant', 'point', 'right', 'small', 'sound',
  'spell', 'still', 'study', 'their', 'there',
  'these', 'thing', 'think', 'three', 'water',
  'where', 'which', 'world', 'would', 'write']

// TODO layout/components

class PasswordModule extends Component {
  updateLetters (i, event) {
    const letters = event.target.value
    // Prevent entering extra letters
    if (letters.length > 6) {
      return
    }

    const dials = this.props.state.dials.slice()
    dials[i] = letters

    this.props.onStateChange({
      dials: dials
    })
  }
  renderDial (index, value) {
    return (
      <Input key={index} className='password-input' placeholder={'Dial ' + (index + 1)}
        value={value} maxLength={6}
        onChange={(e) => this.updateLetters(index, e)} />
    )
  }
  renderPassword () {
    let passwords = bombPasswords
    this.props.state.dials.forEach((dial, index) => {
      if (dial.length === 6) {
        passwords = passwords.filter((word) => {
          return dial.includes(word.charAt(index))
        })
      }
    })
    if (passwords.length === 1) {
      return (
        <div>
          <p>Password:</p>
          <p><strong>{passwords[0]}</strong></p>
        </div>
      )
    } else {
      return (
        <p>{passwords.length} passwords remaining.</p>
      )
    }
  }
  render () {
    const colLayout = {
      xs: 24,
      sm: 12,
      md: 6,
      lg: 4
    }
    const dials = this.props.state.dials.map((letters, index) =>
      this.renderDial(index, letters)
    )

    return (
      <Row className='password-module'>
        <Col {...colLayout}>
          {dials}
        </Col>
        <Col sm={{offset: 1, span: 11}} xs={24}>
          {this.renderPassword()}
        </Col>
      </Row>
    )
  }
}

export const element = PasswordModule
export const heading = 'Password'
export const icon = 'lock'
export const state = { dials: Array(5).fill('') }
