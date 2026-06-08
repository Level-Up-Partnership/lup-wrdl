import { useState, useEffect, useCallback } from 'react'
import MainMenu from './components/MainMenu'
import GameBoard from './components/GameBoard'
import Victory from './components/Victory'
import Defeat from './components/Defeat'
import './App.css'

// Temporary word bank for demo purposes - replace with API fetch
const DEMO_WORDS = {

  3: [ "RIP", "CAT", "GUN" ],
  4: [ "MORE", "JUMP", "PLAY" ],
  5: [ "PACKS", "RIVER", "SWIFT" ],
  6: [ "PLEASE", "BOLTED", "SPRINT" ],

}


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

  // Build the full board - submitted guesses plus empty rows to fill up to 6
  const MAX_GUESSES = 6


  /**
   * 
   * Checks a guess against the target word and returns tile statuses.
   * Uses two passes to correctly handle duplicate letters.
   * 
   * @param { string } guess - The player's guessed word (uppercase).
   * @param { string } target - The target word to guess (uppercase).
   * @returns { Array } - Array of { letter, status } objects.
   * 
   */

  const checkGuess = ( guess, target ) => {

    // Convert target to array so we can "claim" letters as we match them
    const targetLetters = target.split( "" )
    const result = Array.from( { length: guess.length } ).map( () => ( { letter: "", status: "absent" } ) )

    // Pass 1 - find correct letters (right letter, right position)
    guess.split( "" ).forEach( ( letter, i ) => {

      // Mark as correct if letter matches target in the same position
      if ( letter === targetLetters[i] ) {

        result[i] = { letter, status: "correct" }
        targetLetters[i] = null // Claim this letter so it can't be matched again

      }

    } )

    // Pass 2 - find present letters (right letter, wrong position)
    guess.split( "" ).forEach( ( letter, i ) => {

      // Skip letters already marked correct in pass 1
      if ( result[i].status === "correct" ) return

      const foundIndex = targetLetters.indexOf( letter )

      // Mark as present if letter exists elsewhere in target
      if ( foundIndex !== -1 ) {

        result[i] = { letter, status: "present" }
        targetLetters[ foundIndex ] = null // Claim this letter so it can't be matched again

      } else { // Mark as absent if letter is not found in target at all

        result[i] = { letter, status: "absent" }

      }

    } )

    return result

  }

  /**
   * 
   * Handles a key press from either the on-screen or physical keyboard.
   * 
   * @param { string } key - The key that was pressed.
   * 
   */

  const handleKey = useCallback( ( key ) => {

    // Ignore input if game is over
    if ( gameStatus !== "playing" ) return

    // Handles Backspace: remove last character from current guess
    if ( key === "BACKSPACE" ) {

      setCurrentGuess( ( prev ) => prev.slice( 0, -1 ) )

    } else if ( key === "ENTER" ) { // Handles Enter: submit the guess if it's long enough

      // Reject if guess is too short
      if ( currentGuess.length < wordLength ) return

      // Check the guess against the target word
      const checkedGuess = checkGuess( currentGuess, word )

      // Add checked guess to submitted guesses
      setGuesses( ( prev ) => [ ...prev, checkedGuess ] )

      // Clear current guess
      setCurrentGuess( "" )

      // Check win condition
      if ( currentGuess === word ) {

        setGameStatus( "won" )
        setScreen( "victory" )

      // Check loss condition - guesses.length + 1 because state hasn't updated yet
      } else if ( guesses.length + 1 >= MAX_GUESSES ) {

        setGameStatus( "lost" )
        setScreen( "defeat" )

      }

    } else if ( currentGuess.length < wordLength && /^[A-Z]$/.test( key ) ) { // Handles letter keys: add to current guess if there's room and it's a valid letter

      setCurrentGuess( ( prev ) => prev + key )

    }

  }, [ gameStatus, currentGuess, wordLength ] ) // Re-create only when these change

  // Add event listener for physical keyboard input
  useEffect( () => {

    const handlePhysicalKey = ( e ) => handleKey( e.key.toUpperCase() )
    document.addEventListener( "keydown", handlePhysicalKey )

    return () => document.removeEventListener( "keydown", handlePhysicalKey )

  }, [ handleKey ] )

  /**
   * 
   * Builds the board array from submitted guesses and empty filler rows.
   * Each submitted guess is an array of { letter, status } objects.
   * Empty rows are filled with blank tiles to always keep 6 rows visible.
   * 
   * @returns { Array } - Array of 6 rows, each an array of tile objects.
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
