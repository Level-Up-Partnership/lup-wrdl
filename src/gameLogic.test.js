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

    // WRDL-47: Test isGuessTooShort returns false when guess is longer than wordLength
    it( 'returns false when guess is longer than wordLength', () => {

        const guess = 'CATS'
        const wordLength = 3

        expect( isGuessTooShort( guess, wordLength ) ).toBe( false )

    } )

    // WRDL-51: Test isGuessTooShort returns false when guess equals a 4-letter wordLength
    it( 'returns false when guess equals a 4-letter wordLength', () => {

        const guess = 'CATS'
        const wordLength = 4

        expect( isGuessTooShort( guess, wordLength ) ).toBe( false )

    } )

    // WRDL-52: Test isGuessTooShort returns true when guess is one letter short of a 4-letter wordLength
    it( 'returns true when guess is one letter short of a 4-letter wordLength', () => {

        const guess = 'CAT'
        const wordLength = 4

        expect( isGuessTooShort( guess, wordLength ) ).toBe( true )

    } )

    // WRDL-53: Test isGuessTooShort returns true when guess is one letter short of a 6-letter wordLength
    it( 'returns true when guess is one letter short of a 6-letter wordLength', () => {

        const guess = 'PLANT'
        const wordLength = 6

        expect( isGuessTooShort( guess, wordLength ) ).toBe( true )

    } )

    // WRDL-79: Test isGuessTooShort returns false when guess equals a 5-letter wordLength
    it( 'returns false when guess equals a 5-letter wordLength', () => {

        const guess = 'CRANE'
        const wordLength = 5

        expect( isGuessTooShort( guess, wordLength ) ).toBe( false )

    } )

    // WRDL-80: Test isGuessTooShort returns false when guess equals a 6-letter wordLength
    it( 'returns false when guess equals a 6-letter wordLength', () => {

        const guess = 'PLANET'
        const wordLength = 6

        expect( isGuessTooShort( guess, wordLength ) ).toBe( false )

    } )

} )


// Tests for checkGuess function
describe( 'checkGuess', () => {

    // WRDL-40: Test checkGuess returns correct for right letter in right position
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

    // WRDL-41: Test checkGuess returns present for right letter in wrong position
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

    // WRDL-42: Test checkGuess returns absent for letter not in word
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

    // WRDL-43: Test checkGuess returns correct, present, and absent for guess with repeated letters
    it( 'returns correct, present, and absent for guess with repeated letters', () => {

        const guess = 'BASS'
        const target = 'SOIL'
        const expected = [

            { letter: 'B', status: 'absent' },
            { letter: 'A', status: 'absent' },
            { letter: 'S', status: 'present' },
            { letter: 'S', status: 'absent' }

        ]

        expect( checkGuess( guess, target ) ).toEqual( expected )

    } )

    // WRDL-44: Test win condition - correct guess triggers victory
    it( 'returns all correct for a winning guess', () => {

        const guess = 'BLADE'
        const target = 'BLADE'
        const expected = [

            { letter: 'B', status: 'correct' },
            { letter: 'L', status: 'correct' },
            { letter: 'A', status: 'correct' },
            { letter: 'D', status: 'correct' },
            { letter: 'E', status: 'correct' }

        ]

        expect( checkGuess( guess, target ) ).toEqual( expected )

    } )

    // WRDL-45: Test loss condition - 6 wrong guesses triggers defeat
    // True loss condition (6 wrong guesses) lives in App.jsx
    it( 'returns all absent for a losing guess', () => {

        const guess = 'MYRRH'
        const target = 'BLADE'
        const expected = [

            { letter: 'M', status: 'absent' },
            { letter: 'Y', status: 'absent' },
            { letter: 'R', status: 'absent' },
            { letter: 'R', status: 'absent' },
            { letter: 'H', status: 'absent' }

        ]

        expect( checkGuess( guess, target ) ).toEqual( expected )

    } )

    // WRDL-48: Test checkGuess returns absent for duplicate letter when target only has one instance
    it( 'returns absent for second occurrence of a letter when target only has one instance', () => {

        const guess = 'MEETS'
        const target = 'MEDAL'
        const expected = [

            { letter: 'M', status: 'correct' },
            { letter: 'E', status: 'correct' },
            { letter: 'E', status: 'absent' },
            { letter: 'T', status: 'absent' },
            { letter: 'S', status: 'absent' }

        ]

        expect( checkGuess( guess, target ) ).toEqual( expected )

    } )

    // WRDL-49: Test checkGuess when target has duplicate letters and guess has one instance
    it( 'returns correct for single occurrence of a letter when target has duplicates', () => {

        const guess = 'SASSY'
        const target = 'BLAST'
        const expected = [

            { letter: 'S', status: 'absent' },
            { letter: 'A', status: 'present' },
            { letter: 'S', status: 'absent' },
            { letter: 'S', status: 'correct' },
            { letter: 'Y', status: 'absent' }

        ]

        expect( checkGuess( guess, target ) ).toEqual( expected )

    } )

    // WRDL-50: Test checkGuess returns correct results for 3-letter and 6-letter words
    it( 'returns correct results for 3-letter words', () => {

        const guess = 'TAD'
        const target = 'RAT'
        const expected = [

            { letter: 'T', status: 'present' },
            { letter: 'A', status: 'correct' },
            { letter: 'D', status: 'absent' }

        ]

        expect( checkGuess( guess, target ) ).toEqual( expected )

    } )

    it( 'returns correct results for 6-letter words', () => {

        const guess = 'PLANET'
        const target = 'LANCER'
        const expected = [

            { letter: 'P', status: 'absent' },
            { letter: 'L', status: 'present' },
            { letter: 'A', status: 'present' },
            { letter: 'N', status: 'present' },
            { letter: 'E', status: 'correct' },
            { letter: 'T', status: 'absent' }

        ]

        expect( checkGuess( guess, target ) ).toEqual( expected )

    } )

    // WRDL-54: Test checkGuess returns all present when all letters exist in target but none in correct position - 3-letter
    it( 'returns all present when all letters exist in target but none in correct position - 3-letter', () => {

        const guess = 'ATE'
        const target = 'EAT'
        const expected = [

            { letter: 'A', status: 'present' },
            { letter: 'T', status: 'present' },
            { letter: 'E', status: 'present' }

        ]

        expect( checkGuess( guess, target ) ).toEqual( expected )

    } )

    // WRDL-55: Test checkGuess returns all present when all letters exist in target but none in correct position - 6-letter
    it( 'returns mixed correct and present for 6-letter words', () => {

        const guess = 'LUSTER'
        const target = 'RUSTLE'
        const expected = [

            { letter: 'L', status: 'present' },
            { letter: 'U', status: 'correct' },
            { letter: 'S', status: 'correct' },
            { letter: 'T', status: 'correct' },
            { letter: 'E', status: 'present' },
            { letter: 'R', status: 'present' }

        ]

        expect( checkGuess( guess, target ) ).toEqual( expected )

    } )

    // WRDL-56: Test checkGuess returns mixed correct and present with no absent letters
    it( 'returns mixed correct and present with no absent letters', () => {

        const guess = 'STEAM'
        const target = 'TEAMS'
        const expected = [

            { letter: 'S', status: 'present' },
            { letter: 'T', status: 'present' },
            { letter: 'E', status: 'present' },
            { letter: 'A', status: 'present' },
            { letter: 'M', status: 'present' }

        ]

        expect( checkGuess( guess, target ) ).toEqual( expected )

    } )

    // WRDL-57: Test checkGuess returns correct only for the first letter when rest are absent
    it( 'returns correct only for the first letter when rest are absent', () => {

        const guess = 'CRANE'
        const target = 'CLUBS'
        const expected = [

            { letter: 'C', status: 'correct' },
            { letter: 'R', status: 'absent' },
            { letter: 'A', status: 'absent' },
            { letter: 'N', status: 'absent' },
            { letter: 'E', status: 'absent' }

        ]

        expect( checkGuess( guess, target ) ).toEqual( expected )

    } )

    // WRDL-58: Test checkGuess returns correct only for the last letter when rest are absent
    it( 'returns correct only for the last two letters when rest are absent', () => {

        const guess = 'CRANE'
        const target = 'STONE'
        const expected = [

            { letter: 'C', status: 'absent' },
            { letter: 'R', status: 'absent' },
            { letter: 'A', status: 'absent' },
            { letter: 'N', status: 'correct' },
            { letter: 'E', status: 'correct' }

        ]

        expect( checkGuess( guess, target ) ).toEqual( expected )

    } )

    // WRDL-59: Test checkGuess returns correct only for a middle letter when surrounding letters are absent
    it( 'returns correct only for a middle letter when surrounding letters are absent', () => {

        const guess = 'BLIMP'
        const target = 'FLICK'
        const expected = [

            { letter: 'B', status: 'absent' },
            { letter: 'L', status: 'correct' },
            { letter: 'I', status: 'correct' },
            { letter: 'M', status: 'absent' },
            { letter: 'P', status: 'absent' }

        ]

        expect( checkGuess( guess, target ) ).toEqual( expected )

    } )

    // WRDL-60: Test checkGuess returns correct for a single letter surrounded by absent letters
    it( 'returns correct for a single letter surrounded by absent letters', () => {

        const guess = 'GRUFF'
        const target = 'CRANE'
        const expected = [

            { letter: 'G', status: 'absent' },
            { letter: 'R', status: 'correct' },
            { letter: 'U', status: 'absent' },
            { letter: 'F', status: 'absent' },
            { letter: 'F', status: 'absent' }

        ]

        expect( checkGuess( guess, target ) ).toEqual( expected )

    } )

    // WRDL-61: Test checkGuess returns correct for a letter appearing at both the start and end of the word
    it( 'returns correct for a letter appearing at both the start and end of the word', () => {

        const guess = 'EXTRA'
        const target = 'EXTRA'
        const expected = [

            { letter: 'E', status: 'correct' },
            { letter: 'X', status: 'correct' },
            { letter: 'T', status: 'correct' },
            { letter: 'R', status: 'correct' },
            { letter: 'A', status: 'correct' }

        ]

        expect( checkGuess( guess, target ) ).toEqual( expected )

    } )

    // WRDL-62: Test checkGuess returns all present for letters in completely reversed order
    it( 'returns all present for letters in completely reversed order', () => {

        const guess = 'TAC'
        const target = 'CAT'
        const expected = [

            { letter: 'T', status: 'present' },
            { letter: 'A', status: 'correct' },
            { letter: 'C', status: 'present' }

        ]

        expect( checkGuess( guess, target ) ).toEqual( expected )

    } )

} )
