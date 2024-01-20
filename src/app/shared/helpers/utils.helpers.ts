/**
 * Convert minutes to hours and remaining minutes.
 *
 * @param totalMinutes - The total number of minutes to convert.
 * @returns An object containing the hours and remaining minutes.
 */
export const convertMinutesToHours = (
  totalMinutes: number
): {hours: number; minutes: number} => {
  if (totalMinutes < 0) {
    throw new Error('Input must be a non-negative number.');
  }

  const hours: number = Math.floor(totalMinutes / 60);
  const remainingMinutes: number = totalMinutes % 60;

  return {hours, minutes: remainingMinutes};
};
