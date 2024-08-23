export const capitalize = (inputString: string) => {
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
};

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

type TrimmedFields<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

export function trimString<T>(data: T, fields: TrimmedFields<T>[]): T {
  const trimmedData = { ...data };

  fields.forEach((field) => {
    if (typeof trimmedData[field] === "string") {
      trimmedData[field] = (trimmedData[field] as string).trim() as any;
    }
  });

  return trimmedData;
}

export function formatDuration(duration: string): string {
  if (duration) {
    const [number, unit] = duration.split(" ");

    return `${number} ${unit}${number === "1" ? "" : "s"}`;
  }

  return "";
}

export function formatAsMoney(amount: number): string {
  if (!amount) return "";
  const formattedAmount = amount.toLocaleString("en-US", {
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });

  return `$${formattedAmount}`;
}
