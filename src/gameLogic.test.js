import { describe, it, expect } from 'vitest'
import { isGuessTooShort } from './gameLogic'

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
