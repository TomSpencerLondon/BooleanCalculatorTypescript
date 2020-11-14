export const parseBoolean = (input: string): boolean => {
  if (input === "TRUE") {
    return true;
  } else if (input === "FALSE") {
    return false;
  }
  const array: string[] = input.split(" ");

  if (array.length === 2 && array[0] === "NOT") {
    return !parseBoolean(array.slice(1).join(" "));
  }

  if (array.some((el) => el === "AND")) {
    const index = array.indexOf("AND");
    return (
      parseBoolean(array.slice(0, index).join(" ")) &&
      parseBoolean(array.slice(index + 1).join(" "))
    );
  }
};
