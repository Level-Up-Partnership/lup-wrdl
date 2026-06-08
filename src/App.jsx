import { useState } from 'react'
import MainMenu from './components/MainMenu'
import GameBoard from './components/GameBoard'
import Victory from './components/Victory'
import Defeat from './components/Defeat'
import './App.css'

/**
 * 
 * This is the main App component that manages overall game state and screen transitions.
 * It renders the appropriate screen (main menu, game board, victory, defeat) based on the current state.
 * 
 * @returns - The rendered App component.
 * 
 */

function App() {

  // Game state
  const [ screen, setScreen ] = useState( "menu" )
  const [ word, setWord ] = useState( "" )
  const [ guesses, setGuesses ] = useState( [] )
  const [ currentGuess, setCurrentGuess ] = useState( "" )
  const [ gameStatus, setGameStatus ] = useState( "playing" )
  const [ wordLength, setWordLength ] = useState( null )

  // Temporary word bank for demo purposes — replace with API fetch in WRDL-18
  const DEMO_WORDS = {

    3: [ "RIP", "CAT", "GUN" ],
    4: [ "MORE", "JUMP", "PLAY" ],
    5: [ "PACKS", "RIVER", "SWIFT" ],
    6: [ "PLEASE", "BOLTED", "SPRINT" ],

  }

  // Build the full board — submitted guesses plus empty rows to fill up to 6
  const MAX_GUESSES = 6

  /**
   * 
   * Builds the board array from submitted guesses and empty filler rows.
   * Each submitted guess is an array of { letter, status } objects.
   * Empty rows are filled with blank tiles to always keep 6 rows visible.
   * 
   * @returns {Array} - Array of 6 rows, each an array of tile objects.
   * 
   */

  const buildBoard = () => {

    // Convert submitted guesses into tile objects with statuses
    const submittedRows = guesses.map( ( guess ) =>
      guess.map( ( tile ) => ( { letter: tile.letter, status: tile.status } ) )
    )

    // Build the current in-progress row from currentGuess string
    const currentRow = Array.from( { length: wordLength } ).map( ( _, i ) => ( {

      letter: currentGuess[i] || "",
      status: "",

    } ) )

    // Fill remaining rows with empty tiles
    const emptyRow = Array.from( { length: wordLength }).map( () => ( {

      letter: "",
      status: "",

    } ) )

    const emptyRowsCount = MAX_GUESSES - submittedRows.length - 1
    const emptyRows = Array.from( { length: Math.max( 0, emptyRowsCount ) } ).map( () => emptyRow )

    return [ ...submittedRows, currentRow, ...emptyRows ]

  }

  /**
   * 
   * Handles a key press from either the on-screen or physical keyboard.
   * 
   * @param {string} key - The key that was pressed.
   * 
   */

  const handleKey = ( key ) => {

    // Ignore input if game is over
    if ( gameStatus !== "playing" ) return

    // Handle backspace: remove last character from current guess
    if ( key === "BACKSPACE" || key === "Backspace" ) {

      // Remove last character from current guess
      setCurrentGuess( ( prev ) => prev.slice( 0, -1 ) )

    } else if ( key === "ENTER" ) { // Handle enter: submit guess if it meets word length requirement

      // TODO: validate and submit guess — coming in WRDL-18/19
      console.log( "Submit:", currentGuess )

    } else if ( currentGuess.length < wordLength && /^[A-Z]$/.test( key ) ) { // Handle letter keys: add to current guess if under word length limit and is a valid letter

      // Add letter to current guess if under word length limit
      setCurrentGuess( ( prev ) => prev + key )

    }

  }

  /**
   * 
   * Starts a new game — resets state and fetches a new word.
   * Word fetching will be wired up in WRDL-18.
   * 
   */

  const startGame = () => {

    const wordPool = DEMO_WORDS[ wordLength ]
    const randomWord = wordPool[ Math.floor( Math.random() * wordPool.length ) ]

    setGuesses( [] )
    setCurrentGuess( "" )
    setGameStatus( "playing" )
    setWord( randomWord ) // TODO: fetch real word from API in WRDL-18
    setScreen( "game" )

  }

  /**
   * 
   * Returns the player to the main menu and resets game state.
   * 
   */

  const goToMenu = () => {

    setScreen( "menu" )
    setGuesses( [] )
    setCurrentGuess( "" )
    setGameStatus( "playing" )
    setWord( "" )

  }

  // Render the correct screen based on current screen state
  return (

    <div className="app">

      <header className="header">
        <h1>WRDL</h1>
      </header>

      { screen === "menu" && (

        <MainMenu
          wordLength={ wordLength }
          setWordLength={ setWordLength }
          onPlay={ startGame }
        />

      ) }

      { screen === "game" && (

        <GameBoard
          guesses={ buildBoard() }
          onKey={ handleKey }
          wordLength={ wordLength }
        />

      ) }

      { screen === "victory" && (

        <Victory
          onPlayAgain={ startGame }
          onMainMenu={ goToMenu }
        />

      ) }

      { screen === "defeat" && (

        <Defeat
          word={ word }
          onPlayAgain={ startGame }
          onMainMenu={ goToMenu }
        />

      ) }

    </div>

  )

}

export default App
