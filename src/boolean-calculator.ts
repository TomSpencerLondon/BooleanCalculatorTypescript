export const parseBoolean = (expression: string): boolean => {
  const strings = expression.split(" ");
  for (let i = 0; i < strings.length; i++) {
    if (strings[i] === "NOT") {
      strings[i] = "!";
    } else if (strings[i] === "AND") {
      strings[i] = "&";
    } else if (strings[i] === "OR") {
      strings[i] = "|";
    }
  }

  const evaluate = strings.join("");

  return helper(evaluate, 0, evaluate.length);
};

const helper = (expression: string, low: number, high: number): boolean => {
  if (low == high) {
    return expression.charAt(low) !== "!";
  }

  const operator = expression.charAt(low);
  let count = 0;
  let result: boolean = operator === "|" ? false : true;

  let previous: number = low + 2;

  for (let i = low; i <= high; i++) {
    const c = expression.charAt(i);
    if (c === "(") {
      count++;
    } else if (c === ")") {
      count--;
    }

    if ((count === 1 && c === ",") || (count === 0 && c === ")")) {
      const next: boolean = helper(expression, previous, i - 1);
      previous = i + 1;
      if (operator === "|") {
        result = result || next;
      } else if (operator === "&") {
        result = result && next;
      } else {
        result = !next;
      }
    }
  }
  return result;
};
