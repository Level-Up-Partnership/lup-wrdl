/**
 * 
 * Renders a single letter tile on the game board.
 * 
 * @param { string } letter - The letter to display, or empty string if unfilled.
 * @param { string } status - Tile state: 'correct', 'present', 'absent', or ''.
 * 
 */

function Tile( { letter, status } ) {

  return (

    <div className={ `tile ${ status }` }>
      { letter }
    </div>

  )

}

export default Tile
