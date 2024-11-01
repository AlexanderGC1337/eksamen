export function formatDate(dateString: string): {
  day: string;
  month: string;
  year: number;
} {
  const date = new Date(dateString);

  const months: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Maj",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dec",
  ];

  return {
    day: date.getDate().toString(),
    month: months[date.getMonth()],
    year: date.getFullYear(),
  };
}
