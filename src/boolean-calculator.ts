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
  return parseWithoutBrackets(expression.toUpperCase());
};

const parseWithoutBrackets = (expression: string): boolean => {
  if (expression === "TRUE") {
    return true;
  } else if (expression === "FALSE") {
    return false;
  }
  const tokens: string[] = expression.split(" ");

  if (tokens.length === 2 && tokens[0] === "NOT") {
    return !parseBoolean(tokens.slice(1).join(" "));
  }

  if (tokens.some((token) => token === "OR")) {
    const index = tokens.indexOf("OR");
    return (
      parseBoolean(tokens.slice(0, index).join(" ")) ||
      parseBoolean(tokens.slice(index + 1).join(" "))
    );
  }

  if (tokens.some((token) => token === "AND")) {
    const index = tokens.indexOf("AND");
    return (
      parseBoolean(tokens.slice(0, index).join(" ")) &&
      parseBoolean(tokens.slice(index + 1).join(" "))
    );
  }
};
