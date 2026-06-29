import Board from './Board'

/**
 *
 * Renders the defeat screen shown when the player runs out of guesses.
 *
 * @param { string } word - The correct word the player failed to guess.
 * @param { Array } board - The completed board state to display.
 * @param { Function } onPlayAgain - Callback fired when the player wants to play again.
 * @param { Function } onMainMenu - Callback fired when the player returns to main menu.
 *
 */

function Defeat( { word, board, onPlayAgain, onMainMenu } ) {

  return (

    <div className="result-screen">

      <h2 className="result-title defeat">DEFEAT!</h2>

      <p className="correct-word">The word was <strong>{ word }</strong></p>

      <button className="play-again-btn" onClick={ onPlayAgain }>
        Try again?
      </button>

      <button className="menu-btn" onClick={ onMainMenu }>
        Main Menu
      </button>

      <Board guesses={ board } />

    </div>

  )

}

export default Defeat
