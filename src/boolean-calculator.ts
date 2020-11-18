export const parseBoolean = (expression: string): boolean => {
  if (expression.includes("(")) {
    let count = 0;
    for (let i = 0; i < expression.length; i++) {
      const c = expression.charAt(i);
      if (c === "(") {
        count++;
      } else if (c === ")") {
        count--;
      }

      if (count === 0 && c === ")") {
        return parseBoolean(
          expression.substring(0, expression.indexOf("(")) +
            parseBoolean(expression.substring(expression.indexOf("(") + 1, i)) +
            expression.substring(i + 1, expression.length)
        );
      }
    }
  }
  return parseWithoutBrackets(expression);
};

const parseWithoutBrackets = (expression: string): boolean => {
  if (expression === "TRUE" || expression === "true") {
    return true;
  } else if (expression === "FALSE" || expression === "false") {
    return false;
  }
  const array: string[] = expression.split(" ");

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
