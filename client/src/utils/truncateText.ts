/**
 * Truncates text to a specified length.
 * @param text The string to truncate.
 * @param limit The maximum number of characters allowed.
 * @param suffix Optional custom suffix (default is "...").
 * @returns The truncated string.
 */
const truncate = (text: string = '', limit: number, suffix: string = "..."): string => {
  return text.length > limit 
    ? text.slice(0, limit) + suffix 
    : text;
};

export default truncate
