export const handleCalculatedDuration = (
  startDate: string,
  endDate: string
): number => {
  const date1: Date = new Date(startDate);
  const date2: Date = new Date(endDate);
  // Check if dates are valid
  if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
    throw new Error("Invalid date format. Please provide valid date strings.");
  }
  const diffTime: number = Math.abs(date2.getTime() - date1.getTime());
  const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));

  return diffWeeks;
};
