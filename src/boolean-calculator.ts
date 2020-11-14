export const parseBoolean = (input: string): boolean => {
  if (input === "FALSE" || input === "NOT TRUE") {
    return false;
  }
  return true;
};
