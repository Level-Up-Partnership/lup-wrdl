// Keyboard rows matching a standard QWERTY layout
const KEYBOARD_ROWS = [

  [ 'Q','W','E','R','T','Y','U','I','O','P', 'BACKSPACE' ],
  [ 'A','S','D','F','G','H','J','K','L', 'ENTER' ],
  [ 'Z','X','C','V','B','N','M' ],

]

// Status priority mapping for determining the highest status of a letter across guesses
const STATUS_PRIORITY = {

    'correct': 2,
    'present': 1,
    'absent': 0

  }


/**
 *
 * Renders the on-screen QWERTY keyboard.
 *
 * @param { Function } onKey - Callback fired when a key is clicked, receives the key string.
 * @param { Array } guesses - Array of submitted guesses, used to colour keyboard keys by best letter status.
 *
 */

function Keyboard( { onKey, guesses } ) {

  const letterStatus = {}

  // Determine the status of each letter based on the submitted guesses
  guesses.flat().forEach( ( tile ) => {

    const current = letterStatus[ tile.letter ]

    // Update the letter status only if the new status has a higher priority
    if ( !current || STATUS_PRIORITY[ tile.status ] > STATUS_PRIORITY[ current ] ) {

      letterStatus[ tile.letter ] = tile.status

    }

  } )

  return (

    <div className="keyboard">

      { KEYBOARD_ROWS.map( ( row, rowIndex ) => (

        <div key={ rowIndex } className="keyboard-row">

          { row.map( ( key ) => (

            <button
              key={ key }
              className={ `key ${ letterStatus[ key ] || '' }` }
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
