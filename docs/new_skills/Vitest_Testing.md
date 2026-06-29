# Intro to Automated Testing with Vitest

## What is automated testing?

Automated testing is code that tests your code. Instead of manually opening the browser and clicking around every time you make a change, you write test cases once and run them instantly whenever you want. If something breaks, the test catches it before you do.

---

## The three building blocks

### `describe` - the container

Groups related tests together under a label. Think of it like a folder or a test class in JUnit. It does not run any logic itself - it just organizes your `it` blocks under a shared name.

```js
describe( 'isGuessTooShort', () => {
  // all tests for this function live here
} )
```

---

### `it` - the individual test

Each `it` block is one specific test case. It takes two things: a plain English description of what it checks, and a function that runs the actual check. The description should read like a sentence - because when a test fails, Vitest prints it so you know exactly what broke.

```js
it( 'returns true when guess is shorter than wordLength', () => {
  // assertion goes here
} )
```

---

### `expect` + matcher - the assertion

`expect` wraps the value you want to check. You chain a **matcher** onto it to declare what you expect that value to be. The most common matcher is `.toBe()`, which checks for strict equality.

```js
expect( isGuessTooShort( 'CA', 3 ) ).toBe( true )
```

Read it out loud: *"I expect `isGuessTooShort('CA', 3)` to be `true`."* If it is, the test passes. If it is not, the test fails and Vitest tells you what it got instead.

---

## Common matchers

| Matcher | What it checks |
|---|---|
| `.toBe( value )` | Strict equality - same value and type |
| `.toEqual( value )` | Deep equality - same structure (useful for objects and arrays) |
| `.toBeTruthy()` | Value is truthy |
| `.toBeFalsy()` | Value is falsy |
| `.toContain( item )` | Array or string contains the item |
| `.toHaveLength( n )` | Array or string has length `n` |

---

## A real example - WRDL

This is from the WRDL Wordle clone project. The `checkGuess` function takes a player's guess and the hidden word, and returns an array of tile statuses: `correct`, `present`, or `absent`.

```js
import { describe, it, expect } from 'vitest'
import { checkGuess } from './gameLogic'

describe( 'checkGuess', () => {

  it( 'returns correct for a letter in the right position', () => {

    const result = checkGuess( 'CAT', 'CAR' )

    expect( result[0].status ).toBe( 'correct' ) // C is in position 0 of both
    expect( result[1].status ).toBe( 'correct' ) // A is in position 1 of both

  } )

  it( 'returns present for a letter in the word but wrong position', () => {

    const result = checkGuess( 'ACT', 'CAT' )

    expect( result[0].status ).toBe( 'present' ) // A exists in CAT, but not at position 0

  } )

  it( 'returns absent for a letter not in the word at all', () => {

    const result = checkGuess( 'DOG', 'CAT' )

    expect( result[0].status ).toBe( 'absent' ) // D is not in CAT
    expect( result[1].status ).toBe( 'absent' ) // O is not in CAT
    expect( result[2].status ).toBe( 'absent' ) // G is not in CAT

  } )

} )
```

---

## What a failing test looks like

When a test fails, Vitest prints exactly what it expected and what it actually got. You do not have to guess - it tells you.

Here is an example of a deliberately broken test:

```js
it( 'returns false when guess matches wordLength', () => {

  expect( isGuessTooShort( 'CAT', 3 ) ).toBe( true ) // wrong - should be false

} )
```

Vitest output:

```
FAIL src/gameLogic.test.js
  isGuessTooShort
    × returns false when guess matches wordLength

AssertionError: expected false to be true
  - Expected: true
  + Received: false
```

It tells you the test name, what you expected, and what the function actually returned. This is why the `it` description matters - it becomes the failure message.

---

## Why we extract logic to a separate file

Functions buried inside a React component cannot be imported by a test file. They are private to the component. To test a function, it needs to live in its own file and be exported.

This is also just good practice regardless of testing. A function like `checkGuess` is pure logic - it takes inputs and returns outputs, with no knowledge of the UI. It does not belong inside a component. Keeping logic separate from rendering makes both easier to read, easier to maintain, and easier to test.

In WRDL, `checkGuess` and `isGuessTooShort` were both extracted from `App.jsx` into `gameLogic.js` for exactly this reason.

---

## `.toBe` vs `.toEqual` - why it matters

`.toBe` checks strict equality - same value, same type, same reference. It works perfectly for primitives like strings, numbers, and booleans.

```js
expect( isGuessTooShort( 'CA', 3 ) ).toBe( true ) // fine - comparing a boolean
```

But it breaks for objects and arrays, even if the contents look identical:

```js
expect( { status: 'correct' } ).toBe( { status: 'correct' } ) // FAILS
```

Two objects with the same contents are not the same object in memory. `.toBe` sees them as different.

Use `.toEqual` when comparing objects or arrays - it checks the structure and values, not the reference:

```js
expect( { status: 'correct' } ).toEqual( { status: 'correct' } ) // PASSES
```

In WRDL, `checkGuess` returns an array of objects like `{ letter: 'C', status: 'correct' }`. If you want to check the full object, use `.toEqual`. If you just want to check one property, use `.toBe`:

```js
// Checking the full object
expect( result[0] ).toEqual( { letter: 'C', status: 'correct' } )

// Checking just the status property
expect( result[0].status ).toBe( 'correct' )
```

---

## The rule of thumb

Test each distinct **behaviour**, not every possible input. If a function handles two cases - too short and long enough - two tests covers it. You do not need a separate test for every possible word length or letter combination unless the function behaves differently for each one.

---

## How to run tests

```bash
npm test
```

Vitest runs in watch mode by default - it re-runs automatically every time you save a file. Press `q` to quit.

---

## Why this matters for WRDL

Automated testing is one of the two required new skills in the Scope Lock Document. During the client review, you need to explain what the tests do and why they are structured the way they are - not just show that they pass. This document is your reference for that conversation.
