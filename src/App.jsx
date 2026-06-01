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

      {/* Difficulty selector */}
      <div className="difficulty">

        { [ 3, 4, 5, 6 ].map( ( len ) => (
          
          <button
            key={len}
            className={ `diff-btn ${ wordLength === len ? 'active' : '' }` }
            onClick={ () => setWordLength( len ) }
          >
            { len }
          </button>

        ) ) }

      </div> { /* Ends difficulty selector */ }

      {/* Game board */}
      <div className="board">

        {/* Render empty tiles based on selected word length and max guesses */}
        { Array.from( { length: MAX_GUESSES } ).map( ( _, rowIndex ) => (

          <div key={ rowIndex } className="row">

            {/* Render empty tiles for the current row */}
            { Array.from( { length: wordLength } ).map( ( _, colIndex ) => (

              <div key={ colIndex } className="tile"></div>

            ) ) }

          </div>

        ) ) }

      </div> { /* Ends game board */ }

      {/* On-screen keyboard */}
      <div className="keyboard">

        {/* Render keyboard rows and keys */}
        { KEYBOARD_ROWS.map( ( row, rowIndex ) => (

          <div key={ rowIndex } className="keyboard-row">

            {/* Render keys for the current row */}
            { row.map( ( key ) => (

              <button key={ key } className="key">{ key }</button>

            ) ) }

          </div>

        ) ) }

      </div> { /* Ends app container */ }

    </div> /* Ends app container */

  )

}

export default App
