# React - What It Is and How We Used It in WRDL

---

## What Is React?

Imagine you're building a house out of LEGO. Instead of building everything as one giant solid block, you build individual pieces - walls, windows, doors, a roof - and then snap them together. Each piece is self-contained. If you want to change the colour of the door, you only touch the door piece. Everything else stays the same.

**React is a tool for building web pages the same way.** Instead of writing one giant page, you build small, self-contained pieces called **components**, and snap them together to form the full app. Each component is responsible for one specific thing, and when that thing needs to change, only that component updates - not the entire page.

React was created by Facebook and is now one of the most widely used tools in web development.

---

## Why Not Just Write Regular HTML?

You could build a web page using plain HTML, CSS, and JavaScript - and for simple pages, that's perfectly fine. But imagine you're building something like WRDL, where:

- The game board needs to update every time the player types a letter
- The keyboard keys need to change colour after each guess
- The screen needs to switch between the menu, the game, the victory screen, and the defeat screen
- All of this needs to happen instantly, without reloading the page

With plain HTML and JavaScript, making all of that work without refreshing the page would require a lot of complex, messy code. React was specifically designed to make this kind of dynamic, interactive interface much easier to build and maintain.

---

## The Core Ideas of React

### 1. Components

A **component** is a self-contained building block of your app. It's a JavaScript function that returns a piece of the page - buttons, text, images, input fields, or even other components nested inside it.

In WRDL, every visual piece of the app is its own component:

| Component | What it is responsible for |
|---|---|
| `App` | The overall app - decides which screen to show |
| `MainMenu` | The difficulty selector and Play button |
| `GameBoard` | The board and keyboard together during a game |
| `Board` | The grid of 6 rows |
| `Row` | A single row of tiles |
| `Tile` | A single letter tile |
| `Keyboard` | The on-screen QWERTY keyboard |
| `Victory` | The screen shown when the player wins |
| `Defeat` | The screen shown when the player loses |

Each component only knows about its own job. `Tile` doesn't know what the secret word is. `Keyboard` doesn't know what row the player is on. This separation makes the code much easier to understand and change.

---

### 2. Props

**Props** (short for properties) are the way a parent component passes information down to a child component - like filling in a form before handing it to someone else to use.

Think of a component like a function that takes inputs (props) and produces a visual output. You define what information it needs, and the parent provides it when it uses that component.

In WRDL, the `Tile` component needs two pieces of information to do its job:

```jsx
<Tile letter="C" status="correct" />
```

- `letter` - which letter to display
- `status` - whether it's correct (green), present (yellow), absent (grey), or empty

The `Tile` component receives these as props and uses them to decide what to render and what colour to show. It doesn't care where the letter came from or what the rest of the board looks like - it just does its one job.

**Key rule about props:** props only flow downward - from parent to child, never the other way. A child component cannot change its own props. If a child needs to communicate something upward, it does so through a callback function passed down as a prop (more on this below).

---

### 3. State

**State** is information that a component remembers and that can change over time. When state changes, React automatically re-renders the component to reflect the new information - without reloading the page.

Think of state like a whiteboard that the component owns. Whenever something is erased and rewritten on the whiteboard, the component instantly updates what's shown on screen.

In WRDL, the `App` component holds all the important state:

| State variable | What it tracks |
|---|---|
| `screen` | Which screen is currently showing (menu, game, victory, defeat) |
| `word` | The secret word the player is trying to guess |
| `guesses` | All the guesses submitted so far, with their colour feedback |
| `currentGuess` | The letters the player has typed so far in the current guess |
| `gameStatus` | Whether the game is playing, won, or lost |
| `wordLength` | The word length the player selected (3, 4, 5, or 6) |
| `errorMessage` | The error shown when a guess is invalid |

Every time any of these change - for example, when the player types a letter, `currentGuess` updates - React re-renders the relevant parts of the screen automatically. The developer doesn't have to manually tell the page to update.

State is created using a React hook called `useState`:

```js
const [ currentGuess, setCurrentGuess ] = useState( "" )
```

This creates the state variable (`currentGuess`), a function to update it (`setCurrentGuess`), and sets its starting value (`""`). The only way to change state is through the setter function - never by directly modifying the variable.

---

### 4. Hooks

**Hooks** are special functions that give React components extra abilities. They always start with the word `use`. WRDL uses three of them:

**`useState`** - gives a component memory. Used to store and update any piece of information that can change.

```js
const [ wordLength, setWordLength ] = useState( null )
```

**`useEffect`** - runs a piece of code at specific moments, such as when the component first loads. In WRDL, it's used in two places:
- On app load, to check localStorage for a saved session and restore it
- To attach and remove the physical keyboard listener so the player can type guesses

```js
useEffect( () => {
    // This runs once when the app first loads
    const session = loadSession()
    if ( session && session.gameStatus === 'playing' ) {
        // Restore the saved game
    }
}, [] )
```

**`useCallback`** - prevents a function from being unnecessarily recreated on every render. In WRDL, `handleKey` is wrapped in `useCallback` because it's passed down to the keyboard event listener, and recreating it on every render would cause the listener to detach and reattach constantly.

---

### 5. JSX

**JSX** is the syntax React uses to describe what a component should look like. It looks almost exactly like HTML, but it lives inside JavaScript files and has a few key differences.

Instead of writing HTML in a separate file, you write JSX directly inside your component function and return it:

```jsx
function Tile( { letter, status } ) {
    return (
        <div className={ `tile ${ status }` }>
            { letter }
        </div>
    )
}
```

Key JSX rules:
- Use `className` instead of `class` (because `class` is a reserved word in JavaScript)
- Wrap everything in one parent element - a component can only return one root element
- Use curly braces `{ }` to insert JavaScript expressions inside JSX
- Self-closing tags must have a slash: `<Input />` not `<Input>`

---

### 6. The Component Tree

Components nest inside each other, forming a tree - just like folders inside folders on your computer. In WRDL, the tree looks like this:

```
App
├── MainMenu
├── GameBoard
│   ├── Board
│   │   └── Row (x6)
│   │       └── Tile (x3-6)
│   └── Keyboard
├── Victory
│   └── Board
└── Defeat
    └── Board
```

`App` sits at the top and decides which branch to show based on the current screen. State and props flow down from `App` through each level of the tree to the components that need them.

---

## How React Powers WRDL

Here is the full picture of how everything connects in WRDL:

**Starting a game:**
The player selects a word length in `MainMenu` and clicks Play. `MainMenu` fires the `onPlay` callback (a function passed down as a prop from `App`). `App` runs `startGame`, fetches a random word from the API, sets the `word` and `screen` state, and React automatically shows the `GameBoard`.

**Typing a guess:**
The player presses a key - either on the physical keyboard or the on-screen keyboard. Both fire `handleKey` in `App`. `handleKey` updates `currentGuess` state. React re-renders `GameBoard`, which re-renders `Board`, which re-renders the active `Row`, which re-renders each `Tile` - all in milliseconds.

**Submitting a guess:**
The player presses Enter. `handleKey` validates the guess against the dictionary API, runs `checkGuess` to determine which letters are correct/present/absent, and adds the result to the `guesses` array in state. React re-renders the board with the new colour feedback. The keyboard keys update their colours too, because `Keyboard` receives the full `guesses` array as a prop and computes each key's best status from it.

**Winning or losing:**
After each guess, `App` checks whether the player has won or run out of guesses. If so, it updates `gameStatus` state and after a brief delay, updates `screen` state to switch to the `Victory` or `Defeat` component.

**Returning to the menu:**
The player clicks Main Menu on the victory or defeat screen. The `onMainMenu` prop fires `goToMenu` in `App`, which resets all state and sets `screen` back to `"menu"`. React shows `MainMenu` again.

---

## Quick Reference

| Term | Plain English meaning |
|---|---|
| Component | A self-contained building block of the UI |
| Props | Information passed from a parent component to a child |
| State | Information a component remembers that can change over time |
| Hook | A special React function that gives components extra abilities |
| `useState` | A hook for storing and updating information |
| `useEffect` | A hook for running code at specific moments |
| `useCallback` | A hook for preventing a function from being recreated unnecessarily |
| JSX | The HTML-like syntax used to describe what a component looks like |
| Re-render | When React automatically updates the screen after state changes |
| Component tree | The nested structure of components that makes up the full app |
