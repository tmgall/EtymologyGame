import { getAllPuzzles, getPuzzle, updatePuzzleField } from "./db";

export interface StreakData {
    lastSolved: string;
    streakAtLastSolved: number;
}

export const incrementStreak = async (puzzleNumber: number) => {
    const puzzle = await getPuzzle(puzzleNumber);
    if (puzzle) {
        if (puzzleNumber < 1) {
            await updatePuzzleField(puzzleNumber, 'streakAtTime', 1);
            await updatePuzzleField(puzzleNumber, 'bestStreak', 1);
        } else {
            const previousPuzzle = await getPuzzle(puzzleNumber - 1)
            const previousStreak = previousPuzzle ? previousPuzzle.streakAtTime : 0;
            const newStreak = previousStreak + 1;
            // need some way to get best streak even if the previous puzzle didn't have a best streak
            const previousBestStreak = puzzle.bestStreak;
            await updatePuzzleField(puzzleNumber, 'streakAtTime', newStreak);
            console.log("before");
            if (previousBestStreak < newStreak) {
                console.log("here");
                await updatePuzzleField(puzzleNumber, 'bestStreak', newStreak);
            }
        }
    }
}

export const resetStreak = async (puzzleNumber: number): Promise<void> => {
    const puzzle = await getPuzzle(puzzleNumber);
    if (puzzle) {
        await updatePuzzleField(puzzleNumber, 'streakAtTime', 0);
    }
}

export const getBestStreak = async (): Promise<number> => {
  const puzzles = await getAllPuzzles();
  if (puzzles.length === 0) return 0;
  const mostRecentPuzzleCompleted = Math.max(...puzzles.map(p => p.puzzleNumber));
  return puzzles.find(p => p.puzzleNumber === mostRecentPuzzleCompleted)?.bestStreak ?? 0;
}

export const getStreak = async (puzzleNumber: number): Promise<number> => {
    return (await getPuzzle(puzzleNumber))?.streakAtTime ?? 0;
}