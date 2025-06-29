const LAUNCH_DATE = new Date("June 29, 2025 00:00:00");

export const getFormattedDate = (puzzleNumber: string) => {
    const puzzleDate = new Date(LAUNCH_DATE);
    puzzleDate.setDate(LAUNCH_DATE.getDate() + (Number(puzzleNumber) - 1));
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dayOfWeek = dayNames[puzzleDate.getDay()];
    const dayOfMonth = puzzleDate.getDate();
    const month = monthNames[puzzleDate.getMonth()];
    return dayOfWeek + ", " + month + " " + dayOfMonth;
}

export const getTodaysPuzzleNumber = () => {
    const today = new Date();
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    return Math.floor((today.getTime() - LAUNCH_DATE.getTime()) / millisecondsPerDay) + 1;
}