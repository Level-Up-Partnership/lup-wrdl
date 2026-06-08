# Git Workflow Tutorial
### Pull Requests, Pushing, and Branching — A Practical Guide for WRDL

---

## What Is Git, Really?

Git is a **version control system** — it tracks every change you make to your code over time. Think of it like a save system in a video game, except every save has a message explaining what you did, and you can go back to any previous save at any time.

There are two places your code lives:

- **Local** — your PC or laptop. This is where you write code.
- **Remote** — GitHub. This is the "official" copy that lives in the cloud.

Git commands move code between these two places.

---

## Core Concepts

### Repository (Repo)
Your project folder tracked by Git. For WRDL, that's `lup-wrdl` on GitHub.

### Branch
A separate version of your code. Think of `main` as the clean, working version of your project. When you work on a new feature, you create a branch so you're not messing with `main` directly.

```
main ──────────────────────────────────────▶ (always stable)
         └── feature/game-board ──▶ (your work in progress)
```

### Commit
A saved snapshot of your changes. Every commit has a message describing what changed.

### Pull Request (PR)
A request to merge your branch into `main`. It's how your work officially gets reviewed and added to the project.

---

## The Full Workflow — Step by Step

### Step 1 — Always Start From Main

Before creating a new branch, make sure you're on `main` and it's up to date:

```bash
git checkout main
git pull origin main
```

`git checkout main` switches you to the main branch.
`git pull origin main` downloads any new changes from GitHub.

> **Why?** If you branch off outdated code, your feature branch will be missing recent changes — this causes conflicts later.

---

### Step 2 — Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

The `-b` flag creates a new branch and switches to it in one command.

**Naming conventions:**
| Type | Format | Example |
|---|---|---|
| New feature | `feature/description` | `feature/game-board` |
| Bug fix | `fix/description` | `fix/keyboard-input` |
| Documentation | `docs/description` | `docs/testing-plan` |

> **Tip:** Include the Jira ticket ID in your branch name when relevant — e.g. `feature/WRDL-5-game-board`

---

### Step 3 — Write Your Code

Do your work. Make changes, add files, break things, fix things. This is what the branch is for.

Check what files you've changed at any time with:
```bash
git status
```

---

### Step 4 — Stage Your Changes

Before committing, you need to **stage** the files you want to include:

```bash
git add .
```

The `.` means "stage everything that changed." You can also stage specific files:

```bash
git add src/App.jsx
```

> **Why stage?** It lets you control exactly what goes into each commit. Not everything you've changed needs to be in the same commit.

---

### Step 5 — Commit With a Message

```bash
git commit -m "WRDL-5 add game board component"
```

**Good commit messages:**
- Start with the Jira ticket ID
- Use present tense — "add", "fix", "update", not "added", "fixed"
- Be specific — say what changed and why, not just that something changed

| ❌ Bad | ✅ Good |
|---|---|
| `"stuff"` | `"WRDL-5 add game board grid layout"` |
| `"fixed it"` | `"WRDL-6 fix keyboard input not registering on mobile"` |
| `"changes"` | `"WRDL-7 update difficulty selector to support 3-6 letters"` |

---

### Step 6 — Push Your Branch to GitHub

```bash
git push -u origin feature/your-feature-name
```

The `-u` flag sets the upstream — it links your local branch to the remote one. You only need `-u` the first time. After that, just use:

```bash
git push
```

---

### Step 7 — Open a Pull Request on GitHub

1. Go to your repo on GitHub
2. You'll see a yellow banner: **"your-branch had recent pushes"** — click **Compare & pull request**
3. Give your PR a clear title (e.g. `WRDL-5 Game Board Component`)
4. Add a short description of what you built and any notes for the reviewer
5. Click **Create pull request**

---

### Step 8 — Merge the Pull Request

Once the PR is reviewed and approved:

1. Click **Merge pull request**
2. Click **Confirm merge**
3. Optionally delete the branch — GitHub will offer this after merging

---

### Step 9 — Clean Up Locally

After merging, switch back to main and pull the changes down:

```bash
git checkout main
git pull origin main
```

Optionally delete the local branch since it's been merged:

```bash
git branch -d feature/your-feature-name
```

---

## Quick Reference — Commands You'll Use Every Day

| What you want to do | Command |
|---|---|
| Check which branch you're on | `git status` |
| Switch to main | `git checkout main` |
| Pull latest changes | `git pull origin main` |
| Create a new branch | `git checkout -b feature/name` |
| Stage all changes | `git add .` |
| Commit with a message | `git commit -m "WRDL-X message"` |
| Push to GitHub (first time) | `git push -u origin feature/name` |
| Push to GitHub (after that) | `git push` |
| See commit history | `git log --oneline` |
| Stash uncommitted changes | `git stash` |
| Restore stashed changes | `git stash pop` |

---

## Common Beginner Mistakes

### Committing directly to main
Always work on a feature branch. `main` should only receive code through pull requests.

### Forgetting to pull before branching
If you branch off stale code, you'll be missing recent changes and create conflicts.

### Vague commit messages
Your commit history is your project diary. Future you — and Jess during review — will read it.

### Not pushing before switching machines
If you write code on your PC and don't push, your laptop won't have it. Always push before you stop for the day.

### Giant commits
Commit small and often. One logical change per commit. Don't save everything for one massive push at the end.

---

## The WRDL Workflow in Practice

Here's exactly what your session flow looks like for every new feature:

```bash
# Start of session
git checkout main
git pull origin main
git checkout -b feature/WRDL-5-game-board

# ... write code ...

# Save your work
git add .
git commit -m "WRDL-5 add GameBoard component with grid layout"
git push -u origin feature/WRDL-5-game-board

# Open pull request on GitHub, merge it, then clean up
git checkout main
git pull origin main
```

Repeat this loop for every feature on your Scope Lock Document.

---

*Part of the WRDL project — Summer Coding Bet 2026*
