export function replaceLastOccurrence(
  inputString: string,
  oldSubstring: string,
  newSubstring: string,
): string {
  // Find the last occurrence of the old substring
  const lastIndex: number = inputString.lastIndexOf(oldSubstring);

  // Check if the substring was found
  if (lastIndex !== -1) {
    // Replace the last occurrence with the new substring
    const result: string =
      inputString.substring(0, lastIndex) +
      newSubstring +
      inputString.substring(lastIndex + oldSubstring.length);
    return result;
  } else {
    // If the substring was not found, return the original string
    return inputString;
  }
}

export function c(inputString: string): string {
  if (typeof inputString !== "string") return inputString;
  const ignore_words = ["and", "or", "a", "an", "of"];
  const words = inputString.split(" ");

  const capitalizedWords = words.map((word) => {
    if (word.length > 0 && !ignore_words.includes(word.toLowerCase())) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    } else {
      return word; // Handle empty strings if needed
    }
  });

  return capitalizedWords.join(" ");
}
