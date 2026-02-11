# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Lexicon — an etymology-based daily word guessing game. Players guess words from clues based on their etymological roots (e.g., "far vision" → "television"). React/TypeScript SPA deployed on Vercel at lexicongame.net. No backend; all data persisted in browser IndexedDB.

## Commands

- `npm run dev` — start dev server (localhost:5173)
- `npm run build` — TypeScript check + Vite production build (`tsc -b && vite build`)
- `npm run lint` — ESLint
- `npm run preview` — preview production build locally
- No test framework is configured

## Architecture

**Entry point**: `src/main.tsx` sets up React Router. Routes: `/` (today's puzzle), `/archive` (calendar), `/archive/:puzzleNumber` (past puzzles), plus support pages.

**Core game flow** (`src/components/Puzzle.tsx`): Loads word from `WORD_LIST[puzzleNumber - 1]`, manages guess input via physical and on-screen keyboard, validates against answer (case-insensitive). Near-misses use Levenshtein distance (≤3 edits) to show a "close guess" modal.

**Word data** (`src/assets/WordList.tsx`): Master list of `WordData` objects with `clue`, `answer`, `roots[]` (each with `english`, `languageName`, `languageWord`), `definition`, `explanation`, and `partOfSpeech`.

**Hint system**: Three progressive levels — reveal one etymological root, reveal modern definition, reveal answer. Revealing the answer resets the player's streak.

**Persistence** (`src/util/db.ts`): IndexedDB database "LexiconDB" with "puzzles" store. Tracks per-puzzle state: hints used, completion status, streak at time of solve. Schema changes require incrementing `DB_VERSION` and updating the `onupgradeneeded` handler.

**Puzzle numbering** (`src/util/Date.tsx`): Sequential from launch date (Nov 17, 2025). Difficulty cycles weekly: Mon/Tue = Easy, Wed–Fri = Medium, Sat/Sun = Hard.

**Theming** (`src/context/ThemeContext.tsx` + `src/styles.css`): Light/dark via `data-theme` attribute on `<html>`. CSS variables (`--paper`, `--ink`, etc.) drive all colors. Preference stored in localStorage.

## Adding a New Puzzle

Add an entry to `WORD_LIST` in `src/assets/WordList.tsx`. Puzzles are served in array order, one per day from launch date.
