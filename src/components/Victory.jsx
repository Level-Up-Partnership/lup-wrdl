/**
 * 
 * Renders the victory screen shown when the player guesses the word correctly.
 * 
 * @param {Function} onPlayAgain - Callback fired when the player wants to play again.
 * @param {Function} onMainMenu - Callback fired when the player returns to main menu.
 * 
 */

function Victory( { onPlayAgain, onMainMenu } ) {

  return (

    <div className="result-screen">

      <h2 className="result-title victory">VICTORY!</h2>

      <button className="play-again-btn" onClick={ onPlayAgain }>
        Want to play again?
      </button>

      <button className="menu-btn" onClick={ onMainMenu }>
        Main Menu
      </button>

    </div>

  )

}

export default Victory
