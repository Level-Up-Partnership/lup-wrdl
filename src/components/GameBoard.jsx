import Board from './Board'
import Keyboard from './Keyboard'

/**
 * 
 * Renders the full game screen — subtitle, board, and keyboard.
 * 
 * @param { Array } guesses - Array of 6 rows, each an array of { letter, status } objects.
 * @param { Function } onKey - Callback fired when a key is pressed.
 * @param { number } wordLength - The current word length, used for the subtitle.
 * 
 */

function GameBoard( { guesses, onKey, wordLength } ) {

  return (

    /* Main game container */
    <div className="gameboard">

      <p className="subtitle">{ wordLength }-LETTER WRDL</p>
      <Board guesses={ guesses } />
      <Keyboard onKey={ onKey } />

    </div>

  )

}

export default GameBoard
