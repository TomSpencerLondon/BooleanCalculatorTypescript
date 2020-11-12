import { parseBoolean } from "../src/boolean-calculator";

describe("Boolean Calculator", () => {
  it.each([
    ["NOT FALSE", true],
    ["TRUE OR FALSE AND NOT FALSE", true],
    ["(TRUE OR TRUE OR TRUE) AND FALSE", false],
    ["NOT (TRUE AND TRUE)", false],
    ["(TRUE AND FALSE AND TRUE) OR NOT TRUE", false],
  ])("returns correct output for input", (input: string, output: boolean) => {
    expect(parseBoolean(input)).toEqual(output);
  });
});
