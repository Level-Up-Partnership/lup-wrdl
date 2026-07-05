import { describe, it, expect } from 'vitest'
import { checkGuess, isGuessTooShort } from './gameLogic'

// WRDL-39: Test that a guess shorter than wordLength is rejected
describe( 'isGuessTooShort', () => {

    // Test cases for isGuessTooShort function  
    it( 'returns true when guess is shorter than wordLength', () => {

        expect( isGuessTooShort( 'CA', 3 ) ).toBe( true )

    } )

    // Test case for isGuessTooShort function when guess length matches wordLength
    it( 'returns false when guess matches wordLength', () => {

        expect( isGuessTooShort( 'CAT', 3 ) ).toBe( false )

    } )

} )


//WRDL-40: Test checkGuess returns correct for right letter in right position
describe( 'checkGuess', () => {

    // Test cases for checkGuess function
    it( 'returns correct for right letter in right position', () => {

        const guess = 'CAT'
        const target = 'CAT'
        const expected = [

            { letter: 'C', status: 'correct' },
            { letter: 'A', status: 'correct' },
            { letter: 'T', status: 'correct' }

        ]
        expect( checkGuess( guess, target ) ).toEqual( expected )

    } )

    // Test case for checkGuess function when right letter is in wrong position
    it( 'returns present for right letter in wrong position', () => {

        const guess = 'TAC'
        const target = 'CAT'
        const expected = [

            { letter: 'T', status: 'present' },
            { letter: 'A', status: 'correct' },
            { letter: 'C', status: 'present' }

        ]

        expect( checkGuess( guess, target ) ).toEqual( expected )

    } )

    // Test case for checkGuess function when wrong letter is guessed
    it( 'returns absent for wrong letter', () => {

        const guess = 'DOG'
        const target = 'CAT'
        const expected = [

            { letter: 'D', status: 'absent' },
            { letter: 'O', status: 'absent' },
            { letter: 'G', status: 'absent' }

        ]

        expect( checkGuess( guess, target ) ).toEqual( expected )

    } )

    // Test case for checkGuess function when guess has mixed correct, present, and absent letters
    it( 'returns correct, present, and absent for mixed guess', () => {

        const guess = 'COT'
        const target = 'CAT'
        const expected = [

            { letter: 'C', status: 'correct' },
            { letter: 'O', status: 'absent' },
            { letter: 'T', status: 'correct' }

        ]

        expect( checkGuess( guess, target ) ).toEqual( expected )

    } )

} )
