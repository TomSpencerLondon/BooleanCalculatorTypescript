export const parseBoolean = (input: string): boolean => {
  return parseBooleanHelper(input).value;
};

const parseBooleanHelper = (input: string): { value: boolean; ast: any } => {
  if (input === "TRUE") {
    return { value: true, ast: "TRUE" };
  } else if (input === "FALSE") {
    return { value: false, ast: "FALSE" };
  }
  const array: string[] = input.split(" ");

  if (array.length === 2 && array[0] === "NOT") {
    const temp: any = !parseBooleanHelper(array.slice(1).join(" "));

    return { value: !temp.value, ast: { NOT: temp.ast } };
  }

  if (array.some((el) => el === "OR")) {
    const index = array.indexOf("OR");
    const parseBoolean1 = parseBooleanHelper(array.slice(0, index).join(" "));
    const parseBoolean2 = parseBooleanHelper(array.slice(index + 1).join(" "));
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

  if (array.some((el) => el === "AND")) {
    const index = array.indexOf("AND");
    const parseBoolean3 = parseBooleanHelper(array.slice(0, index).join(" "));
    const parseBoolean4 = parseBooleanHelper(array.slice(index + 1).join(" "));
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
