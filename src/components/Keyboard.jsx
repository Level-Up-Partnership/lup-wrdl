// Keyboard rows matching a standard QWERTY layout
const KEYBOARD_ROWS = [

  [ 'Q','W','E','R','T','Y','U','I','O','P', 'BACKSPACE' ],
  [ 'A','S','D','F','G','H','J','K','L', 'ENTER' ],
  [ 'Z','X','C','V','B','N','M' ],

]

/**
 *
 * Renders the on-screen QWERTY keyboard.
 *
 * @param { Function } onKey - Callback fired when a key is clicked, receives the key string.
 * @param { Array } guesses - Array of submitted guesses, used to gray out absent letters.
 *
 */

function Keyboard( { onKey, guesses } ) {

  // Build a set of letters marked absent across all submitted guesses
  const absentLetters = new Set(

    guesses
      .flat()
      .filter( ( tile ) => tile.status === 'absent' )
      .map( ( tile ) => tile.letter )

  )

  return (

    <div className="keyboard">

      { KEYBOARD_ROWS.map( ( row, rowIndex ) => (

        <div key={ rowIndex } className="keyboard-row">

          { row.map( ( key ) => (

            <button
              key={ key }
              className={ `key${ absentLetters.has( key ) ? ' absent' : '' }` }
              onClick={ () => onKey( key ) }
            >
              { key }
            </button>

          ) ) }

        </div> /* Ends keyboard row */

      ) ) }

    </div> /* Ends keyboard */

  )

}

export default Keyboard
