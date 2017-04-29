import React, { Component } from 'react'

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
      <div key={index}>
        <label>Dial {index}</label>
        <input type='text' value={value}
          onChange={(e) => this.updateLetters(index, e)} />
      </div>
    )
  }
  render () {
    const dials = this.props.state.dials.map((letters, index) =>
      this.renderDial(index, letters)
    )

    let passwords = bombPasswords
    this.props.state.dials.forEach((dial, index) => {
      if (dial.length === 6) {
        passwords = passwords.filter((word) => {
          return dial.includes(word.charAt(dial))
        })
      }
    })
    passwords = passwords.map((password) =>
      <li key={password}>{password}</li>
    )

    return (
      <div>
        <h2>Dials</h2>
        {dials}
        <h2>{passwords.length > 1 ? 'Remaining Passwords' : 'Password'}</h2>
        <ul> {passwords} </ul>
      </div>
    )
  }
}

export const element = PasswordModule
export const heading = 'Password'
export const icon = 'lock'
export const state = { dials: Array(5).fill('') }
