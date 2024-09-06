export default function convertRelativeTimeToDate(date: Date): string {
  if (isNaN(date.getTime())) {
    return ""; // Handle invalid date
  }

  const now = new Date();
  const timeDifferenceInMilliseconds = now.getTime() - date.getTime();
  const seconds = Math.floor(timeDifferenceInMilliseconds / 1000);

  if (seconds < 10) {
    return "just now";
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  }

  const months = Math.floor(days / 30.44); // Average days per month
  if (months < 12) {
    return `${months} month${months !== 1 ? "s" : ""} ago`;
  }

  const years = Math.floor(months / 12);
  return `${years} year${years !== 1 ? "s" : ""} ago`;
}
