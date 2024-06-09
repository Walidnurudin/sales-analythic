export function getDayOfWeek(dateString) {
    const date = new Date(dateString);
    if (isNaN(date)) {
        throw new Error("Invalid date");
    }
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return daysOfWeek[date.getDay()];
}

export function addOneDaysToDate(dateString) {
    const date = new Date(dateString)
    date.setDate(date.getDate() + 1)
    date.setUTCHours(0, 0, 0, 0)
    return date
}