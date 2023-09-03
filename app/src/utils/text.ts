// Count words in a string:
export const countWords = (str?: string) => {
  return str?.split(/\s+/).filter((word) => word !== "").length;
};

// Count characters in a string:
export const countCharacters = (str?: string) => {
  return str?.length;
};
