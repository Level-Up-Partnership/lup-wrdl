# WRDL - Testing Document

## Overview

This document outlines the test plan for WRDL, a React-based Wordle clone.
Tests are written in **Vitest** and cover the core game logic in `src/gameLogic.js`.
This is New Skill 2 as defined in the Scope Lock Document.

> **Note:** An earlier version of this document referenced Cypress for end-to-end testing.
> That approach was superseded before any tests were written. Vitest was chosen instead
> because the Scope Lock Document requires automated testing of game logic, not UI interaction.

---

## Test Suite Structure

```
src/
  gameLogic.js          - Pure logic functions under test
  gameLogic.test.js     - All Vitest test cases
```

---

## How to Run Tests

```bash
npm test
```

Vitest runs in watch mode by default - it re-runs automatically on every file save.
Press `q` to quit.

---

## Test Cases

### WRDL-39 - `isGuessTooShort`

Tests that a guess shorter than the required word length is rejected before submission.

| # | Test Case | Expected Result |
|---|---|---|
| 39.1 | Guess is shorter than wordLength | Returns `true` |
| 39.2 | Guess matches wordLength | Returns `false` |

---

### WRDL-40 - `checkGuess` correct status

Tests that a letter in the correct position is marked as `correct`.

| # | Test Case | Expected Result |
|---|---|---|
| 40.1 | Letter matches target at same index | `status` is `'correct'` |

---

### WRDL-41 - `checkGuess` present status

Tests that a letter that exists in the word but is in the wrong position is marked as `present`.

| # | Test Case | Expected Result |
|---|---|---|
| 41.1 | Letter exists in target but at different index | `status` is `'present'` |

---

### WRDL-42 - `checkGuess` absent status

Tests that a letter that does not appear in the target word at all is marked as `absent`.

| # | Test Case | Expected Result |
|---|---|---|
| 42.1 | Letter does not exist anywhere in target | `status` is `'absent'` |

---

### WRDL-43 - `checkGuess` duplicate letters

Tests that duplicate letters are handled correctly using the two-pass algorithm.
A duplicate letter should not be double-counted - each instance in the target can only be claimed once.

| # | Test Case | Expected Result |
|---|---|---|
| 43.1 | Guess has duplicate letter, target has one instance | Only one tile is marked `correct` or `present`; the other is `absent` |

---

### WRDL-44 - Win condition

Tests that a correct guess produces all `correct` statuses across every tile.

| # | Test Case | Expected Result |
|---|---|---|
| 44.1 | Guess exactly matches target | All tiles return `status: 'correct'` |

---

### WRDL-45 - Loss condition

Tests that 6 wrong guesses produces no `correct` tiles for a fully incorrect guess.

| # | Test Case | Expected Result |
|---|---|---|
| 45.1 | Guess shares no letters with target | All tiles return `status: 'absent'` |

---

## Functions Under Test

| Function | File | What it does |
|---|---|---|
| `isGuessTooShort` | `gameLogic.js` | Returns `true` if guess length is less than wordLength |
| `checkGuess` | `gameLogic.js` | Compares guess to target and returns array of `{ letter, status }` objects |

---

## Tools

- **Framework:** Vitest v4.1.9
- **Test file:** `src/gameLogic.test.js`
- **Run command:** `npm test`
