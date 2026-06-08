import Row from './Row'

/**
 * 
 * Renders the full game board — all 6 guess rows.
 * 
 * @param { Array } guesses - Array of 6 rows, each an array of { letter, status } objects.
 * 
 */

function Board( { guesses } ) {

  return (

    <div className="board">

      { guesses.map( ( tiles, rowIndex ) => (

        <Row
          key={ rowIndex }
          tiles={ tiles }
        />

      ) ) }

    </div>

  )

}

export default Board
