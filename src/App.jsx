import { useState } from 'react'
import './App.css'

// Keyboard rows matching a standard QWERTY layout
const KEYBOARD_ROWS = [

  ['Q','W','E','R','T','Y','U','I','O','P', 'BACKSPACE'],
  ['A','S','D','F','G','H','J','K','L', 'ENTER'],
  ['Z','X','C','V','B','N','M'],

]

function App() {

  const [ wordLength, setWordLength ] = useState(5) // default to 5-letter game
  const MAX_GUESSES = 6

  return (

    <div className="app">

      {/* Header */}
      <header className="header">

        <h1>WRDL</h1>

      </header>

    </div> /* Ends app container */

  )

}

export default App
