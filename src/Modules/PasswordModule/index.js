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
  constructor () {
    super()
    this.state = {
      dials: Array(5).fill(''),
      passwords: bombPasswords.slice()
    }
  }
  updateLetters (i, event) {
    const dials = this.state.dials.slice()
    const letters = event.target.value
    // Prevent entering extra letters
    if (letters.length > 6) {
      return
    }
    dials[i] = letters
    // Update remaining possible passwords
    let passwords = bombPasswords.slice()
    dials.forEach((dial, index) => {
      if (dial.length === 6) {
        passwords = passwords.filter((word) => {
          return dials[dial].includes(word.charAt(dial))
        })
      }
    })

    this.setState({
      dials: dials,
      passwords: passwords
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
    const dials = this.state.dials.map((letters, index) =>
      this.renderDial(index, letters)
    )

    const passwords = this.state.passwords.map((password) =>
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
