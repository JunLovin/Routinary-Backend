export const tryParseJSON = (str: string): any | null => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
}
