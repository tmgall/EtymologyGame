export interface Stats {
    hintsStats: number[];
}

export const STATS_KEY = "stats";

export const updateStats = (hintsUsed: number) => {
    const previousStats = localStorage.getItem(STATS_KEY);
    if (previousStats === null) {
        const hintsStats = Array(5).fill(0);
        hintsStats[hintsUsed] = 1;
        const newStats: Stats = {
            hintsStats: hintsStats
        }
        localStorage.setItem(STATS_KEY, JSON.stringify(newStats))
    } else {
        const parsedPreviousStats: Stats = JSON.parse(previousStats);
        const newHintsStats = [...parsedPreviousStats.hintsStats];
        newHintsStats[hintsUsed] = parsedPreviousStats.hintsStats[hintsUsed] + 1;
        const newStats: Stats = {
            hintsStats: newHintsStats
        }
        localStorage.setItem(STATS_KEY, JSON.stringify(newStats));
    }
}

export const getStats = (): Stats => {
    const stats = localStorage.getItem(STATS_KEY);
    if (stats === null) {
        return {
            hintsStats: Array(5).fill(0)
        }
    } else {
        return JSON.parse(stats);
    }
}