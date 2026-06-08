/**
 * 
 * Renders the main menu screen with difficulty selector and play button.
 * 
 * @param {number|null} wordLength - The currently selected word length, or null if unselected.
 * @param {Function} setWordLength - Updates the selected word length.
 * @param {Function} onPlay - Callback fired when the player hits Play.
 * 
 */

function MainMenu( { wordLength, setWordLength, onPlay } ) {

  return (

    /* Main menu container */
    <div className="main-menu">

      <div className="difficulty">

        <label htmlFor="word-length">Select game type</label>

        <select
          id="word-length"
          value={ wordLength ?? "" }
          onChange={ ( e ) => setWordLength( e.target.value ? Number( e.target.value ) : null ) }
        >

          { /* Placeholder option — no value, unselectable after choosing */ }
          <option value="" disabled>--------</option>
          <option value={3}>3-letter</option>
          <option value={4}>4-letter</option>
          <option value={5}>5-letter</option>
          <option value={6}>6-letter</option>

        </select>

      </div> { /* Play button is disabled until a word length is selected */ }

      { /* Play button is disabled until a word length is selected */ }
      <button
        className="play-btn"
        onClick={ onPlay }
        disabled={ wordLength === null }
      >PLAY
      </button>

    </div> /* End main menu container */

  )

}

export default MainMenu
