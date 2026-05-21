# WRDL — Testing Document

## Overview
This document outlines the test plan for WRDL, a React-based Wordle clone.
Tests are written in Cypress and cover all 6 in-scope features from the Scope Lock Document.

---

## Test Suite Structure

- cypress/e2e/
- 01_game_board.cy.js
- 02_input_system.cy.js
- 03_guess_checks.cy.js
- 04_difficulty_setting.cy.js
- 05_win_loss.cy.js
- 06_dictionary_validation.cy.js

---

## Feature 1 - Game Board & Flow State

| # | Test Case | Expected Result |
| --- | --- | --- |
| 1.1 | App loads in the browser | Game board renders on page load |
| 1.2 | A letter is enter | Board updates to display the letter |
| 1.3 | A guess is submitted | Board reflects the submitted guess in the correct row |

---

## Feature 2 - Combined Input System

| # | Test Case | Expect Result |
| --- | --- | --- |
| 2.1 | Player presses a letter on physical keyboard | Letter appears on the board |
| 2.2 | Player clicks a letter on the on-screen keyboard | Letter appears on the board |
| 2.3 | Player presses Backspace on physical keyboard | Last letter is removed | Last letter is removed |
| 2.4 | Player clicks Backspace on the on-screen keyboard | Last letter is removed |
| 2.5 | Player presses Enter on physical keyboard | Guess is submitted |
| 2.6 | Player clicks Enter on on-screen keyboard | Guess is submitted |

---

## Feature 3 - Wordle-Style Guess Checks

| # | Test Case | Expect Result |
| --- | --- | --- |
| 3.1 | Letter is in correct position | Tile shows green |
| 3.2 | Letter is in word but wrong position | Tile shows yellow |
| 3.3 | Letter is not in the word | Tile shows grey |
| 3.4 | Guess contains duplicate letters | Tiles reflect accurate feedback per letter |

---

## Feature 4 - Difficulty Setting

| # | Test Case | Expect Result |
| --- | --- | --- |
| 4.1 | Player selects 3-letter mode | Board adjusts to 3-letter layout |
| 4.2 | Player selects 4-letter mode | Board adjusts to 4-letter layout |
| 4.3 | Player selects 5-letter mode | Board adjusts to 5-letter layout |
| 4.4 | Player selects 6-letter mode | Board adjusts to 6-letter layout |

---

## Feature 5 - Win/Loss Conditions

| # | Test Case | Expect Result |
| --- | --- | --- |
| 5.1 | Player guesses the correct word | Win state is displayed |
| 5.2 | Player uses all attempts without guessing correctly | Loss state is displayed |
| 5.3 | Player wins mid-game | Game stops accepting input after win |
| 5.4 | Player loses | Game stops accepting input after loss |

---

## Feature 6 - Dictionary Validation

| # | Test Case | Expect Result |
| --- | --- | --- |
| 6.1 | Player submits a valid word | Guess is accepted |
| 6.2 | Player submits an invalid word | Guess is rejected with a message |
| 6.3 | Dictionary API fails | App does not crash |

---

## Tools

- **Framework:** Cypress v15
- **Browser:** Chrome
- **Dev Server:** Vite (http://localhost:5173)
