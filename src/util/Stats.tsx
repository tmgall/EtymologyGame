import { getAllPuzzles } from "./db";

export interface Stats {
    hintsStats: number[];
}

export const getStats = async (): Promise<Stats> => {
    const hintsStats = await getAllPuzzles().then((puzzles) => {
        return puzzles.reduce(
            (acc, p) => {
                if (p.puzzleCompleted) {
                    const hints = (p.originUsed ? 1 : 0) + (p.extraHintUsed ? 1 : 0) + (p.puzzleRevealed ? 1 : 0);
                    acc[hints]++;
                }
                return acc;
            },
            [0, 0, 0, 0]
        );
    });
    return { hintsStats: hintsStats };
}