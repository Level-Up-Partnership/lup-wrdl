# 🧪 WRDL: Testing Documentation

Automated tests for WRDL's core game logic, written in **Vitest** and covering every exported function in `src/gameLogic.js`. This test suite satisfies **New Skill 2** ("Automated testing") from the [Scope Lock Document](./WRDL_Scope_Lock_Document__APPROVED_.docx).

> An earlier draft of this document referenced Cypress for end-to-end testing. That approach was superseded before any tests were written. Vitest was chosen instead, since the Scope Lock Document calls for automated testing of *game logic*, not UI interaction.

---

## Table of Contents

- [Test Suite Structure](#test-suite-structure)
- [Running the Tests](#running-the-tests)
- [Coverage Summary](#coverage-summary)
- [Test Cases for `isGuessTooShort`](#test-cases-for-isguesstooshort)
- [Test Cases for `checkGuess`](#test-cases-for-checkguess)
- [Functions Under Test](#functions-under-test)
- [Tools](#tools)

## Test Suite Structure

```
src/
├── gameLogic.js          # Pure logic functions under test
└── gameLogic.test.js     # All Vitest test cases
```

## Running the Tests

```bash
npm test
```

Vitest runs in watch mode by default and re-runs automatically on every file save. Press `q` to quit.

## Coverage Summary

| Function | Tests | What's covered |
|---|:---:|---|
| `isGuessTooShort` | 7 | Boundary checks across 3–6 letter word lengths |
| `checkGuess` | 35 | Correct / present / absent scoring, duplicate-letter handling, word lengths 3–6 |
| **Total** | **42** | |

## Test Cases for `isGuessTooShort`

Confirms a guess shorter than the target word length is rejected before submission, across every supported word length (3–6 letters).

| Ticket | Case | Expected |
|---|---|:---:|
| WRDL-39 | Guess is shorter than wordLength | `true` |
| WRDL-39 | Guess matches wordLength | `false` |
| WRDL-51 | Guess equals a 4-letter wordLength | `false` |
| WRDL-52 | Guess is one letter short of a 4-letter wordLength | `true` |
| WRDL-53 | Guess is one letter short of a 6-letter wordLength | `true` |
| WRDL-79 | Guess equals a 5-letter wordLength | `false` |
| WRDL-80 | Guess equals a 6-letter wordLength | `false` |

## Test Cases for `checkGuess`

The two-pass evaluation algorithm is tested across four categories: basic status assignment, duplicate-letter handling, word-length coverage (3–6 letters), and positional edge cases.

<details>
<summary><strong>Basic status assignment</strong> (correct / present / absent)</summary>

| Ticket | Case | Expected |
|---|---|---|
| WRDL-40 | Right letter, right position | All `correct` |
| WRDL-41 | Right letter, wrong position | All `present` |
| WRDL-42 | Letter not in target word | All `absent` |
| n/a | Mixed correct, present, and absent in one guess | Mixed statuses |
| WRDL-44 | Guess exactly matches target (win condition) | All `correct` |
| WRDL-45 | Guess shares no letters with target (loss condition) | All `absent` |

</details>

<details>
<summary><strong>Duplicate-letter handling</strong> (the core of the two-pass algorithm)</summary>

| Ticket | Case | Expected |
|---|---|---|
| WRDL-43 | Guess has a repeated letter, target has one instance | Only one tile credited |
| WRDL-48 | Second occurrence of a letter when target has only one instance | Second instance `absent` |
| WRDL-49 | Target has duplicates, guess has a single occurrence | Single letter `correct` |
| WRDL-63 | Guess has duplicate letters, target has none of them | All `absent` |
| WRDL-64 | Target has 2 instances of a letter, guess has 3 | Only 2 credited |
| WRDL-65 | Guess and target share a duplicate letter at the same two positions | Both `correct` |
| WRDL-66 | Same letter appears twice, one in the right spot and one not | One `correct`, one `present` |
| WRDL-68 | Target has a letter twice, guess has it once in the correct position | `correct` |
| WRDL-69 | A `correct` letter is never downgraded to `present` in pass 2 | Stays `correct` |
| WRDL-70 | 3-letter word where every letter is the same | All `correct` |
| WRDL-71 | Guess has two of a letter, target has one | One `correct`, one `absent` |
| WRDL-77 | Target has a letter at multiple positions | Earliest match credited |

</details>

<details>
<summary><strong>Word-length coverage</strong> (3, 5, and 6-letter words)</summary>

| Ticket | Case | Expected |
|---|---|---|
| WRDL-50 | 3-letter word evaluation | Correct mixed statuses |
| WRDL-50 | 6-letter word evaluation | Correct mixed statuses |
| WRDL-54 | All letters present but none in the correct position (3-letter) | All `present` |
| WRDL-55 | Mixed correct/present (6-letter) | Mixed statuses |
| WRDL-56 | Mixed correct/present, no absent letters (5-letter) | Mixed statuses |
| WRDL-75 | Every letter shuffled to the wrong position (6-letter) | All `present` |
| WRDL-76 | Alternating correct and absent (6-letter) | Mixed statuses |
| WRDL-78 | No repeated letters in guess vs. a target with repeats | Mixed statuses |

</details>

<details>
<summary><strong>Positional edge cases</strong> (single/isolated correct letters)</summary>

| Ticket | Case | Expected |
|---|---|---|
| WRDL-57 | Only the first letter is correct, rest absent | 1 `correct`, rest `absent` |
| WRDL-58 | Only the last two letters are correct, rest absent | 2 `correct`, rest `absent` |
| WRDL-59 | Only a middle letter is correct, rest absent | 1 `correct`, rest `absent` |
| WRDL-60 | A single correct letter surrounded by absent letters | 1 `correct`, rest `absent` |
| WRDL-61 | Same letter correct at both the start and end of the word | Both `correct` |
| WRDL-62 | Letters in completely reversed order | All `present` |
| WRDL-72 | Only the last letter correct (6-letter word) | 1 `correct`, rest `absent` |
| WRDL-73 | Only the first letter present (6-letter word) | 1 `present`, rest `absent` |
| WRDL-74 | Two correct letters in the middle (6-letter word) | 2 `correct`, rest mixed |

</details>

## Functions Under Test

| Function | File | What it does |
|---|---|---|
| `isGuessTooShort` | `gameLogic.js` | Returns `true` if guess length is less than `wordLength` |
| `checkGuess` | `gameLogic.js` | Compares a guess to the target word and returns an array of `{ letter, status }` objects using a two-pass algorithm |

## Tools

| Tool | Version |
|---|---|
| Framework | Vitest v4.1.9 |
| Test file | `src/gameLogic.test.js` |
| Run command | `npm test` |
