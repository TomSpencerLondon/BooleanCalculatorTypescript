export const parseBoolean = (expression: string): boolean => {
  return parseBooleanHelper(expression).value;
};

const parseBooleanHelper = (
  expression: string
): { value: boolean; ast: any } => {
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
        const parseBooleanHelperBrackets = parseBooleanHelper(
          expression.substring(0, expression.indexOf("(")) +
            parseBooleanHelper(
              expression.substring(expression.indexOf("(") + 1, i)
            ).value +
            expression.substring(i + 1, expression.length)
        );
        return {
          value: parseBooleanHelperBrackets.value,
          ast: parseBooleanHelperBrackets.ast,
        };
      }
    }
  }
  return parseWithoutBrackets(expression.toUpperCase());
};

const parseWithoutBrackets = (
  expression: string
): { value: boolean; ast: any } => {
  if (expression === "TRUE") {
    return { value: true, ast: "TRUE" };
  } else if (expression === "FALSE") {
    return { value: false, ast: "FALSE" };
  }
  const tokens: string[] = expression.split(" ");

  if (tokens.length === 2 && tokens[0] === "NOT") {
    const temp: any = parseBooleanHelper(tokens.slice(1).join(" "));
    return { value: !temp.value, ast: { NOT: temp.ast } };
  }

  if (tokens.some((token) => token === "OR")) {
    const index = tokens.indexOf("OR");
    const parseBoolean1: any = parseBooleanHelper(
      tokens.slice(0, index).join(" ")
    );
    const parseBoolean2: any = parseBooleanHelper(
      tokens.slice(index + 1).join(" ")
    );
    return {
      value: parseBoolean1.value || parseBoolean2.value,
      ast: {
        OR: {
          left: parseBoolean1.ast,
          right: parseBoolean2.ast,
        },
      },
    };
  }

  if (tokens.some((token) => token === "AND")) {
    const index = tokens.indexOf("AND");
    const parseBoolean3: any = parseBooleanHelper(
      tokens.slice(0, index).join(" ")
    );
    const parseBoolean4: any = parseBooleanHelper(
      tokens.slice(index + 1).join(" ")
    );
    return {
      value: parseBoolean3.value && parseBoolean4.value,
      ast: {
        AND: {
          left: parseBoolean3.ast,
          right: parseBoolean4.ast,
        },
      },
    };
  }
};
