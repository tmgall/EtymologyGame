
export const getFormattedDate = () => {
    const today = new Date();
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayOfWeek = dayNames[today.getDay()];
    const dayOfMonth = today.getDate();
    const month = monthNames[today.getMonth()];
    return dayOfWeek + ", " + month + " " + dayOfMonth;
}

export const getPuzzleNumber = () => {
    const today = new Date();
    const launchDate = new Date("March 18, 2025 00:00:00");
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    return Math.floor((today.getTime() - launchDate.getTime()) / millisecondsPerDay) + 1;
}