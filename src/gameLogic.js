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

export const checkGuess = ( guess, target ) => {

  // Convert target to array so we can "claim" letters as we match them
  const targetLetters = target.split( "" )
  const result = Array.from( { length: guess.length } ).map( () => ( { letter: "", status: "absent" } ) )

  // Pass 1 - find correct letters (right letter, right position)
  guess.split( "" ).forEach( ( letter, i ) => {

    // If the letter is correct, mark it and claim it in the target
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

    // If the letter is present, mark it and claim it in the target
    if ( foundIndex !== -1 ) {

      result[i] = { letter, status: "present" }
      targetLetters[ foundIndex ] = null // Claim this letter so it can't be matched again

    } else { // If the letter is absent, mark it as such

      result[i] = { letter, status: "absent" }

    }

  } )

  return result

}
