# 🟩 WRDL

A React-based Wordle clone that isn't locked into 5 letters: pick a word length from 3 to 6 and go.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [How It Works](#how-it-works)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [New Skills Demonstrated](#new-skills-demonstrated)
- [Out of Scope](#out-of-scope)

---

## Overview

WRDL is a Wordle-style word guessing game built in React. The player picks a word length between 3 and 6 letters, then has 6 attempts to guess a randomly selected word, with tile and keyboard feedback showing which letters are correct, present, or absent.

This project follows an approved [Scope Lock Document](./WRDL_Scope_Lock_Document__APPROVED_.docx), so the feature list below is locked and any changes go through review.

## Features

| Feature | Description |
|---|---|
| **Functioning Game board** | Uses component state to manage board, current & submitted guesses, and game status |
| **Combined input** | Play with your physical keyboard or the on-screen keyboard |
| **Wordle-style feedback** | Two-pass letter check correctly handles duplicate letters |
| **Variable difficulty** | Choose a word length from 3 to 6 letters before each game |
| **Win/loss states** | Dedicated Victory and Defeat screens with the completed board |
| **Dictionary validation** | Guesses are checked against an external dictionary API before being accepted |

| Quality-of-Life Additions | Description |
|---|---|
| **Session persistence** | An in-progress game survives a page refresh via `localStorage` |
| **No repeat words** | Previously used words are tracked so the same word won't reappear in a session |

## Tech Stack

- **Framework:** React (functional components + hooks)
- **Language:** JavaScript, HTML, CSS
- **Testing:** [Vitest](https://vitest.dev/)
- **APIs:** [Free Dictionary API](https://dictionaryapi.dev/) for word validation, [Random Word API](https://random-word-api.herokuapp.com/) for word generation
- **Hosting:** GitHub Pages

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) and npm installed

### Installation

```bash
git clone https://github.com/StendaH/wrdl.git
cd wrdl
npm install
```

### Run locally

```bash
npm start
```

### Run the test suite

```bash
npm test
```

## How It Works

Each submitted guess is scored using a **two-pass algorithm** in `gameLogic.js`:

1. **Pass 1 (exact matches):** every letter in the correct position is marked `correct` and "claimed" from the target word.
2. **Pass 2 (remaining letters):** any letter left over is checked against what's left of the target. If it's still there, it's marked `present`; otherwise it's `absent`.

Doing it in two passes (rather than one) is what makes duplicate letters behave correctly: a repeated letter in your guess can only be credited as many times as it actually appears in the target word.

## Project Structure

```
src/
├── components/
│   ├── MainMenu.jsx      # Difficulty select + play button
│   ├── GameBoard.jsx     # Active game screen (board + keyboard)
│   ├── Board.jsx         # 6-row guess grid
│   ├── Row.jsx           # Single guess row
│   ├── Tile.jsx          # Single letter tile
│   ├── Keyboard.jsx      # On-screen QWERTY keyboard
│   ├── Victory.jsx       # Win screen
│   └── Defeat.jsx        # Loss screen
├── gameLogic.js          # Pure game logic (guess checking, validation)
├── gameLogic.test.js     # Vitest unit tests for gameLogic.js
├── App.jsx               # Top-level state + screen routing
└── App.css               # Global styles
```

## Testing

WRDL has a full Vitest suite covering the game logic in `gameLogic.js`. See **[TESTING.md](./TESTING.md)** for the full breakdown of test cases, coverage, and how to run them.

## New Skills Demonstrated

| Skill | How it's used |
|---|---|
| **React component & state architecture** | Manages board, guesses, and game status through component state rather than one monolithic file |
| **Automated testing** | Vitest suite verifying guess evaluation and validation logic, including duplicate-letter edge cases |

## Out of Scope

To keep this build focused, the following are intentionally **not** included:

- User accounts / login
- A database or backend
- Streak tracking or statistics
- Leaderboards
- A daily puzzle / calendar-based word
- Sound effects

---

*Part of the [Summer Coding Bet 2026](./Summer_Coding_Bet_Agreement.docx)*
