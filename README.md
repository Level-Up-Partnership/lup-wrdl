# WRDL — Wordle Clone

## 1. Project Overview

WRDL is a React-based Wordle-style game supporting variable word lengths (3–6 letters) and dictionary validation via an external API.

---

## 2. Scope Reference

This project strictly follows the approved Scope Lock Document.

### In-Scope Features

1. Game Board + Flow State
2. Combined Input System (Physical + On-Screen Keyboard)
3. Wordle-style Guess Evaluation
4. Difficulty Selection (3–6 Letters)
5. Win/Loss Conditions
6. External Dictionary Validation

---

## 3. New Skills

### React Component & State Architecture

* Manages game state (board, guesses, status)
* Uses component-based structure

### Automated Testing

* Tests cover:

  * Guess validation
  * Evaluation logic
  * Win/loss conditions

---

## 4. Tech Stack

* React
* JavaScript
* HTML / CSS
* External Dictionary API
* GitHub Pages

---

## 5. How to Run

### Local

```bash
npm install
npm start
```

### Tests

```bash
npm test
```

---

## 6. Game Rules

* Choose word length (3–6)
* 6 attempts to guess
* Feedback:

  * Green = correct position
  * Yellow = correct letter, wrong position
  * Gray = not in word

---

## 7. Core Logic Note

The guess evaluation uses a two-pass system:

1. Identify correct-position letters
2. Identify remaining valid letters

This ensures correct handling of duplicate letters.

---

## 8. Out of Scope

* No accounts
* No database
* No streak tracking
* No leaderboards
* No daily puzzle system

---
