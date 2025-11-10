export interface Stats {
    hintsStats: number[];
}

export const STATS_KEY = "stats";

export const updateStats = (hintsUsed: number) => {
    const previousStats = getStats();
    previousStats.hintsStats[hintsUsed] = (previousStats.hintsStats[hintsUsed] || 0) + 1;
    localStorage.setItem(STATS_KEY, JSON.stringify(previousStats));
}

export const getStats = (): Stats => {
    const stats = localStorage.getItem(STATS_KEY);
    if (stats === null) {
        return {
            hintsStats: Array(4).fill(0)
        }
    } else {
        const parsed = JSON.parse(stats);
        return {
            hintsStats: parsed.hintsStats.length === 4 ? parsed.hintsStats : Array(4).fill(0)
        };
    }
}