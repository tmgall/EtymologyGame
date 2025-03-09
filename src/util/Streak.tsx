export interface StreakData {
    lastSolved: string;
    streakAtLastSolved: number;
} 

export const STREAK_KEY = "streak";

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
