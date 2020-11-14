export const parseBoolean = (input: string): boolean => {
  if (input === "TRUE") {
    return true;
  } else if (input === "FALSE") {
    return false;
  }
  const array: string[] = input.split(" ");

  if (array[0] === "NOT") {
    return !parseBoolean(array.slice(1).join(" "));
  }

  //
  // const ast: any = {};
  // const currentBranch: any = ast;
  //
  // for (let i = 0; i < array.length; i++) {
  //   if (array[i] === "AND") {
  //     currentBranch["AND"] = {
  //       left: array[i - 1],
  //       right: array[i + 1],
  //     };
  //   }
  // }
};
