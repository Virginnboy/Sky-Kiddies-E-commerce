export const formattedTime = (time) => {
  const date = new Date(time);
  const now = new Date();

  // Remove the time portion so we compare only the dates
  const messageDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  // Calculate how many days ago the message was
  const differenceInTime = today - messageDate;
  const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24);

  // 1. Today → show the time
  if (differenceInDays === 0) {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  // 2. Yesterday → show "Yesterday"
  if (differenceInDays === 1) {
    return "Yesterday";
  }

  // 3. Within the last 6 days → show the day name
  if (differenceInDays >= 2 && differenceInDays <= 6) {
    return date.toLocaleDateString([], {
      weekday: "long"
    });
  }

  // 4. Older than 6 days → show DD/MM/YYYY
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
};

