export const formattedDate = (date) => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "2-digit",
    year: "2-digit"
  });
};