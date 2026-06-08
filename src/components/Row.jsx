import Tile from './Tile'

/**
 * 
 * Renders a single row of tiles representing one guess.
 * 
 * @param { Array } tiles - Array of { letter, status } objects, one per tile.
 * 
 */

function Row( { tiles } ) {

  return (

    <div className="row">
        
      { tiles.map( ( tile, index ) => (


        <Tile
          key={ index }
          letter={ tile.letter }
          status={ tile.status }
        />

      ) ) }

    </div>

  )

}

export default Row
