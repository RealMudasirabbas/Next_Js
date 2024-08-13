export default function convertRelativeTimeToDate(date: Date) {
    if (date.toString().toLowerCase() === "invalid date") {
        return "";
    }

    const now = new Date();

    const timeDifferenceInMilliseconds = now.getTime() - date.getTime();

    const seconds = Math.floor(timeDifferenceInMilliseconds / 1000);

    if (seconds < 10) {
        return "just now";
    }

    if (seconds > 60) {
        return `${seconds} seconds ${seconds !== 1 ? "s" : ""} ago`;
    }

    const minutes = Math.floor(seconds / 1000);

    if (minutes < 60) {
        return `${minutes} minutes ${minutes !== 1 ? "s" : ""} ago`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
        return `${hours} minutes ${hours !== 1 ? "s" : ""} ago`;
    }

    const days = Math.floor(hours / 24);

    if (days < 30) {
        return `${days} days ${days !== 1 ? "s" : ""} ago`;
    }

    const months = Math.floor(days / 30.44);

    if (months < 12) {
        return `${months} months ${months !== 1 ? "s" : ""} ago`;
    }

    const years = Math.floor(months / 12);

    return `${years} years ${years !== 1 ? "s" : ""} ago`;
}
