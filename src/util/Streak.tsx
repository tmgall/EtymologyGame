export interface StreakData {
    lastSolved: string;
    streakAtLastSolved: number;
} 

export const STREAK_KEY = "streak";
export const BEST_STREAK_KEY = "best-streak";

export const updateStreak = (shouldEndStreak: boolean, puzzleNumber: string) => {
    if (shouldEndStreak) {
        const newStreakData: StreakData = {
            lastSolved: puzzleNumber,
            streakAtLastSolved: 0
        };
        localStorage.setItem(STREAK_KEY, JSON.stringify(newStreakData));
    } else {
        const streakData = localStorage.getItem(STREAK_KEY);
        const prevStreak = streakData === null ? 0 : JSON.parse(streakData).streakAtLastSolved;
        const newStreakData: StreakData = {
            lastSolved: puzzleNumber,
            streakAtLastSolved: prevStreak + 1
        };
        const bestStreakString = localStorage.getItem(BEST_STREAK_KEY);
        const bestStreak = bestStreakString === null ? 0 : parseInt(bestStreakString);
        localStorage.setItem(BEST_STREAK_KEY, Math.max(bestStreak, prevStreak + 1).toString());
        localStorage.setItem(STREAK_KEY, JSON.stringify(newStreakData));
    }
}

export const getStreak = (puzzleNumber: string) => {
    const streakData = localStorage.getItem(STREAK_KEY);
    const parsedStreakData: StreakData | null = streakData !== null ? JSON.parse(streakData) : null;
    if (parsedStreakData === null) {
        return 0;
    }
    const mostRecentNumber = parsedStreakData.lastSolved;
    if (mostRecentNumber === puzzleNumber || mostRecentNumber === (parseInt(puzzleNumber) - 1).toString()) {
        return parsedStreakData.streakAtLastSolved
    }
    return 0;
}

export const getBestStreak = () => {
    const bestStreak = localStorage.getItem(BEST_STREAK_KEY);
    return bestStreak === null ? 0 : parseInt(bestStreak);
}
