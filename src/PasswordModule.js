import React, { Component } from 'react'

const bombPasswords = [
  'about', 'after', 'again', 'below', 'could',
  'every', 'first', 'found', 'great', 'house',
  'large', 'learn', 'never', 'other', 'place',
  'plant', 'point', 'right', 'small', 'sound',
  'spell', 'still', 'study', 'their', 'there',
  'these', 'thing', 'think', 'three', 'water',
  'where', 'which', 'world', 'would', 'write']

// TODO handle changes to dial after passwords have been filtered
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
    dials[i] = letters
    let passwords = this.state.passwords.slice()
    if (letters.length === 6) {
      passwords = passwords.filter(function (word) {
        return letters.includes(word.charAt(i))
      })
    }

    this.setState({
      dials: dials,
      passwords: passwords
    })
  }
  renderDial (index, value) {
    return (
      <div key={index}>
        <label>Dial {index}</label>
        <input type='text' value={value} onChange={(e) => this.updateLetters(index, e)} />
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
        <h2>Remaining Passwords</h2>
        <ul> {passwords} </ul>
      </div>
    )
  }
}

export default PasswordModule
