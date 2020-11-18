export const parseBoolean = (input: string): boolean => {
  if (input.includes("(")) {
    let count = 0;
    for (let i = 0; i < input.length; i++) {
      const c = input.charAt(i);
      if (c === "(") {
        count++;
      } else if (c === ")") {
        count--;
      }

      if (count === 0 && c === ")") {
        return parseBoolean(
          input.substring(0, input.indexOf("(")) +
            parseBoolean(input.substring(input.indexOf("(") + 1, i)) +
            input.substring(i + 1, input.length)
        );
      }
    }
  }
  return parseWithoutBrackets(input);
};

export const parseWithoutBrackets = (input: string): boolean => {
  if (input === "TRUE" || input === "true") {
    return true;
  } else if (input === "FALSE" || input === "false") {
    return false;
  }
  const array: string[] = input.split(" ");

  if (array.length === 2 && array[0] === "NOT") {
    return !parseBoolean(array.slice(1).join(" "));
  }

  if (array.some((el) => el === "OR")) {
    const index = array.indexOf("OR");
    return (
      parseBoolean(array.slice(0, index).join(" ")) ||
      parseBoolean(array.slice(index + 1).join(" "))
    );
  }

  if (array.some((el) => el === "AND")) {
    const index = array.indexOf("AND");
    return (
      parseBoolean(array.slice(0, index).join(" ")) &&
      parseBoolean(array.slice(index + 1).join(" "))
    );
  }
};
