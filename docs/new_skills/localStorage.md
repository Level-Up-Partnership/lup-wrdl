# localStorage - What It Is and How We Used It in WRDL

---

## What Is localStorage?

Imagine you're playing a board game and you have to suddenly leave the room. When you come back, you want everything to be exactly where you left it - the pieces, the score, whose turn it is. But if someone cleared the table while you were gone, you'd have to start over.

That's the problem localStorage solves for web apps.

**localStorage is a small storage space built into every web browser.** It lets a website save little pieces of information directly on your computer, so that information survives even if you close the tab, refresh the page, or shut down your browser entirely.

Think of it like a sticky note that the website leaves on your computer. The next time you visit, the website checks for its sticky note, reads what's written on it, and picks up right where it left off.

---

## How Is It Different From a Regular Variable?

When a web app runs, it keeps information in memory - things like "the player's current guess is CRANE" or "the game is on guess 3 of 6". But that memory is wiped the moment you close or refresh the tab. It only exists while the page is open.

localStorage is different because:

- It lives on your computer's hard drive, not in temporary memory
- It survives closing the browser
- It survives turning off your computer
- It stays there until it is deliberately cleared, or until the website removes it

---

## What Does localStorage Actually Look Like?

localStorage stores information as **key-value pairs** - like a two-column table where one column is the label (the key) and the other is the information (the value).

| Key | Value |
|---|---|
| `wrdl_session` | `{"word":"CRANE","guesses":[...],"wordLength":5,"gameStatus":"playing"}` |
| `wrdl_used_words` | `["CRANE","BLADE","SWIFT"]` |

The key is how the website finds its information later - like the label on a filing cabinet drawer. The value is everything stored inside that drawer.

You can inspect your own localStorage right now in any browser by opening Developer Tools (F12), clicking the Application tab, and looking under Local Storage.

---

## What Can and Can't Be Stored?

localStorage can only store **text** (called strings in programming). You can't store images, videos, or complex data structures directly.

However, there's a trick: you can convert almost anything into text using a format called **JSON** (JavaScript Object Notation). JSON is just a standardised way of writing structured information as text, so it can be saved and read back later perfectly.

For example, a list of words like `["CRANE", "BLADE", "SWIFT"]` gets converted to the text `'["CRANE","BLADE","SWIFT"]'` for storage, then converted back to a real list when it's read.

**Limits:**
- localStorage can store up to about 5MB of text per website - plenty for most apps
- It is specific to one browser on one device - your localStorage on Chrome at home is separate from your localStorage on Chrome at work
- It is not encrypted, so you should never store passwords or sensitive personal information in it

---

## The Four Things You Can Do With localStorage

There are only four operations, and they are very simple:

**Save something:**
```js
localStorage.setItem( 'wrdl_session', JSON.stringify( session ) )
```
This writes a value to localStorage under the given key. If a value already exists for that key, it gets overwritten.

**Read something:**
```js
const saved = localStorage.getItem( 'wrdl_session' )
```
This reads the value stored under the given key. If nothing is stored there, it returns `null`.

**Delete something:**
```js
localStorage.removeItem( 'wrdl_session' )
```
This deletes the entry for the given key.

**Check what's stored:**
```js
localStorage.getItem( 'wrdl_session' )
```
If this returns `null`, nothing is stored. If it returns a value, something is there.

---

## How We Used localStorage in WRDL

WRDL uses localStorage for two things:

### 1. Session Recovery

**The problem:** If you're mid-game and accidentally close the tab or refresh the page, you lose your progress entirely. The game forgets what word you were guessing and what guesses you'd already made.

**The solution:** Every time the player does something meaningful - types a valid guess, wins, or loses - WRDL saves a snapshot of the game to localStorage under the key `wrdl_session`. This snapshot includes:

- The secret word
- All the guesses made so far (including their colour feedback)
- The word length (3, 4, 5, or 6 letters)
- The game status (playing, won, or lost)

When the app loads, the very first thing it does is check localStorage for a saved session. If it finds one and the game was still in progress, it restores everything - the board, the guesses, the colours - and drops the player right back into their game as if nothing happened.

If the session was already won or lost, WRDL clears it and shows the main menu instead, since there's nothing to recover.

When the player deliberately goes back to the main menu by clicking the button, WRDL clears the session too - because they intentionally ended the game, so there's nothing to restore.

### 2. Used Word Tracking

**The problem:** WRDL fetches a random word from an external API every time a new game starts. Because it's random, there's a small chance the same word comes up twice, which would make for a boring and frustrating experience.

**The solution:** Every time a new word is fetched, WRDL adds it to a list stored in localStorage under the key `wrdl_used_words`. Before accepting a word, WRDL checks this list - if the word has been used before, it fetches again (up to 5 attempts).

The list is capped at 50 words. Once it hits 50, the oldest word drops off the end to make room for the new one - like a queue. This prevents the list from growing forever and using too much storage space.

---

## Why localStorage and Not Something Else?

There are other ways to store data - databases on a server, cookies, sessionStorage - but localStorage was the right choice for WRDL because:

- **It's simple.** Four operations, no setup, no account required.
- **It's free.** No server costs, no paid service - it runs entirely in the player's browser.
- **It's appropriate for the data.** Game progress is personal and device-specific. There's no need to sync it across devices or share it with a server.
- **It fits the project constraints.** WRDL is built with no paid services, so a free built-in browser feature is ideal.

---

## Quick Reference

| Term | Plain English meaning |
|---|---|
| localStorage | A small storage space in your browser for saving text |
| Key | The label used to find stored information |
| Value | The information stored under a key |
| JSON | A way of converting structured data into text so it can be stored |
| `setItem` | Save something to localStorage |
| `getItem` | Read something from localStorage |
| `removeItem` | Delete something from localStorage |
| Session | A snapshot of the current game state |
