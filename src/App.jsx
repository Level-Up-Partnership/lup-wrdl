import { useState, useEffect, useCallback } from 'react'
import MainMenu from './components/MainMenu'
import GameBoard from './components/GameBoard'
import Victory from './components/Victory'
import Defeat from './components/Defeat'
import './App.css'
import { checkGuess, isGuessTooShort } from './gameLogic'


/* Temporary word bank for demo purposes - replace with API fetch
const DEMO_WORDS = {

  3: [ "RIP", "CAT", "GUN" ],
  4: [ "MORE", "JUMP", "PLAY" ],
  5: [ "PACKS", "RIVER", "SWIFT" ],
  6: [ "PLEASE", "BOLTED", "SPRINT" ],
  
} */


// localStorage keys
const STORAGE_KEY_SESSION = "wrdl_session"
const STORAGE_KEY_USED_WORDS = "wrdl_used_words"

// Maximum number of words to keep in the used words list to avoid repetition
const MAX_USED_WORDS = 50


/**
 * 
 * Saves the current game session to localStorage.
 * 
 * @param { string } word - The current target word.
 * @param { Array } guesses - The submitted guesses so far.
 * @param { number } wordLength - The current word length.
 * @param { string } gameStatus - The current game status ("playing", "won", "lost").
 * 
 */

const saveSession = ( word, guesses, wordLength, gameStatus ) => {

  const session = { word, guesses, wordLength, gameStatus }
  localStorage.setItem( STORAGE_KEY_SESSION, JSON.stringify( session ) )

}

/**
 * 
 * Loads a saved game session from localStorage, if it exists.
 * 
 * @returns { object|null } - The saved session object, or null if none exists.
 * 
 */

const loadSession = () => {

  // Load the saved game session from localStorage, if it exists
  try {

    const saved = localStorage.getItem( STORAGE_KEY_SESSION )
    return saved ? JSON.parse( saved ) : null

  } catch { // If parsing fails, return null to indicate no valid session

    return null

  }

}

/**
 * 
 * Clears the saved game session from localStorage.
 * 
 */

const clearSession = () => {

  localStorage.removeItem( STORAGE_KEY_SESSION )

}

/**
 * 
 * Loads the list of previously used words from localStorage, if it exists.
 * 
 * @returns { Array } - An array of previously used words, or an empty array if none exist.
 * 
 */

const loadUsedWords = () => {

  // Load the list of used words from localStorage, if it exists
  try {

    const saved = localStorage.getItem( STORAGE_KEY_USED_WORDS )
    return saved ? JSON.parse( saved ) : []

  } catch { // If parsing fails, return an empty array to indicate no used words

    return []

  }

}

/**
 * 
 * Adds a word to the list of previously used words in localStorage.
 * Trims the list to MAX_USED_WORDS to avoid excessive growth.
 * 
 * @param { string } word - The word to add.
 * 
 */

const addUsedWord = ( word ) => {

  const usedWords = loadUsedWords()

  // Add the new word to the list and keep only the last MAX_USED_WORDS words
  const updated = [ ...usedWords, word ].slice( -MAX_USED_WORDS ) // Keep only the last MAX_USED_WORDS words
  localStorage.setItem( STORAGE_KEY_USED_WORDS, JSON.stringify( updated ) )

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
  const [ errorMessage, setErrorMessage ] = useState( "" )

  // Build the full board - submitted guesses plus empty rows to fill up to 6
  const MAX_GUESSES = 6


  // On mount - check for a saved session and restore it if it exists
  useEffect( () => {

    const session = loadSession()

    // Restore session if it was mid-game
    if ( session && session.gameStatus === "playing" ) {

      setWord( session.word )
      setGuesses( session.guesses )
      setWordLength( session.wordLength )
      setGameStatus( session.gameStatus )
      setScreen( "game" )

    } else if ( session ) { // If the session is completed (won/lost), clear it to avoid resuming a finished game

      clearSession() // Clear any invalid or completed session

    }

  }, [] ) // Empty array - runs only once on mount


  /**
   * 
   * Checks whether a word exists using the Free Dictionary API.
   * 
   * @param { string } word - The word to validate.
   * @returns { Promise<boolean> } - True if the word exists, false otherwise.
   * 
   */

  const isValidWord = async ( word ) => {

    // Checks if the word exists in the Dictionary API
    try {

      const response = await fetch( `https://api.dictionaryapi.dev/api/v2/entries/en/${ word.toLowerCase() }` )

      // If the response is OK (status 200), the word exists in the dictionary
      if ( response.ok )
        
        return { valid: true }

      // 404 - word not found in dictionary
      return { valid: false, reason: "notFound" }

    } catch ( error ) { // Network error or API down

      console.error( "Dictionary API error:", error )
      return { valid: false, reason: "networkError" }

    }

  }

  /**
   * 
   * Handles a key press from either the on-screen or physical keyboard.
   * 
   * @param { string } key - The key that was pressed.
   * 
   */

  const handleKey = useCallback( async ( key ) => {

    // Ignore input if game is over
    if ( gameStatus !== "playing" ) return

    // Handles Backspace: remove last character from current guess
    if ( key === "BACKSPACE" ) {

        setCurrentGuess( ( prev ) => prev.slice( 0, -1 ) )

    } else if ( key === "ENTER" ) { // Handles Enter: submit the guess if it's long enough

        // Ignore if the guess is too short
        if ( isGuessTooShort( currentGuess, wordLength ) ) return

        // Validate the guess against the dictionary API
        const result = await isValidWord( currentGuess )

        // Reject if the word is not valid
        if ( !result.valid ) {

            // Set error message based on the reason for invalidity
            if ( result.reason === "networkError" ) {

                setErrorMessage( "Connection error - please try again" )

            } else {

                setErrorMessage( "Not a valid word" )

            }

            return

        }

        // Clear error message on valid guess
        setErrorMessage( "" )

        // Check the guess against the target word
        const checkedGuess = checkGuess( currentGuess, word )
        const newGuesses = [ ...guesses, checkedGuess ]

        // Add checked guess to submitted guesses
        setGuesses( newGuesses )

        // Clear current guess
        setCurrentGuess( "" )

        // Check win condition
        if ( currentGuess === word ) {

            setGameStatus( "won" )
            saveSession( word, newGuesses, wordLength, "won" )
            setTimeout( () => setScreen( "victory" ), 1000 ) // brief delay so player sees the result

        // Check loss condition
        } else if ( newGuesses.length >= MAX_GUESSES ) {

            setGameStatus( "lost" )
            saveSession( word, newGuesses, wordLength, "lost" )
            setTimeout( () => setScreen( "defeat" ), 1000 ) // brief delay so player sees the result

        } else { // Game still in progress - save updated state

            saveSession( word, newGuesses, wordLength, "playing" )

        }

    } else if ( currentGuess.length < wordLength && /^[A-Z]$/.test( key ) ) { // Handles letter keys

        setCurrentGuess( ( prev ) => prev + key )

    }

}, [ gameStatus, currentGuess, wordLength, guesses, word ] ) // Re-create only when these change

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

    // Stop showing current row once all guesses are used
    if ( submittedRows.length >= MAX_GUESSES ) {

      return submittedRows

    }

    const emptyRowsCount = MAX_GUESSES - submittedRows.length - 1
    const emptyRows = Array.from( { length: Math.max( 0, emptyRowsCount ) } ).map( () => emptyRow )

    return [ ...submittedRows, currentRow, ...emptyRows ]

  }

  /**
   * 
   * Starts a new game - resets state and fetches a new random word from the API.
   * 
   * @param { number } wordLength - The length of the word to fetch.
   * 
   */

  const startGame = async () => {

    // Tries to fetch a random word from the API based on the selected word length
    try {

        const usedWords = loadUsedWords()
        let randomWord = ""
        let attempts = 0
        const MAX_ATTEMPTS = 5 // Cap retries to avoid infinite loops

        // Keep fetching until we get an unused word or hit the retry cap
        do {

            const response = await fetch( `https://random-word-api.herokuapp.com/word?length=${ wordLength }` )
            const data = await response.json()
            randomWord = data[0].toUpperCase()
            attempts++

        } while ( usedWords.includes( randomWord ) && attempts < MAX_ATTEMPTS )

        // Add the new word to the used words list
        addUsedWord( randomWord )

        setGuesses( [] )
        setCurrentGuess( "" )
        setGameStatus( "playing" )
        setErrorMessage( "" )
        setWord( randomWord )
        setScreen( "game" )

        // Save the fresh session immediately on game start
        saveSession( randomWord, [], wordLength, "playing" )

    } catch ( error ) { // Handle fetch error gracefully

        console.error( "Failed to fetch word:", error )

    }

}

  /**
   * 
   * Returns the player to the main menu and resets game state.
   * 
   */

  const goToMenu = () => {

    clearSession() // Clear any saved session when returning to menu
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
          errorMessage={ errorMessage } // Displays an error message if the last guess was invalid
        />

      ) }

      { screen === "victory" && (

        <Victory
          board={ buildBoard() } // Pass the final board state to the Victory component
          onPlayAgain={ goToMenu } // Takes the player back to the menu to select a new word length and start a new game
          onMainMenu={ goToMenu }
        />

      )}

      { screen === "defeat" && (

        <Defeat
          word={ word }
          board={ buildBoard() } // Pass the final board state to the Defeat component
          onPlayAgain={ goToMenu } // Takes the player back to the menu to select a new word length and start a new game
          onMainMenu={ goToMenu }
        />

      ) }

    </div>

  )

}

export default App
