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

const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p';

/**
 * Build a TMDB image URL.
 *
 * @param path - The image path returned by TMDB (may be null).
 * @param size - The TMDB size segment, e.g. `w300` or `original`.
 * @returns The full image URL, or null when there is no image.
 */
export const tmdbImage = (
  path: string | null | undefined,
  size: string
): string | null => (path ? `${TMDB_IMAGE_URL}/${size}${path}` : null);

/**
 * Format a runtime in minutes as `1h 45m`.
 *
 * @param totalMinutes - The runtime in minutes.
 * @returns The formatted runtime, or null when unknown.
 */
export const formatRuntime = (
  totalMinutes: number | null | undefined
): string | null => {
  if (!totalMinutes || totalMinutes < 0) {
    return null;
  }

  const {hours, minutes} = convertMinutesToHours(totalMinutes);
  return hours ? `${hours}h ${minutes}m` : `${minutes}m`;
};
