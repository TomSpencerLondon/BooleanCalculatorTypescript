import { parseBoolean } from "../src/boolean-calculator";

describe("Boolean Calculator", () => {
  it.each([
    ["TRUE", true],
    ["NOT TRUE", false],
    ["FALSE", false],
    ["NOT FALSE", true],
    ["TRUE AND TRUE", true],
    ["TRUE AND FALSE", false],
    ["FALSE AND TRUE", false],
    ["FALSE AND FALSE", false],
    ["NOT TRUE AND TRUE", false],
    ["NOT TRUE AND FALSE", false],
    ["NOT FALSE AND TRUE", true],
    ["NOT FALSE AND FALSE", false],
    ["TRUE AND NOT TRUE", false],
    ["TRUE AND NOT FALSE", true],
    ["FALSE AND NOT TRUE", false],
    ["FALSE AND NOT FALSE", false],
    ["NOT TRUE AND NOT TRUE", false],
    ["NOT TRUE AND NOT FALSE", false],
    ["NOT FALSE AND NOT TRUE", false],
    ["NOT FALSE AND NOT FALSE", true],
    ["TRUE OR TRUE", true],
    ["TRUE OR FALSE", true],
    ["FALSE OR TRUE", true],
    ["FALSE OR FALSE", false],
    ["NOT TRUE OR TRUE", true],
    ["NOT TRUE OR FALSE", false],
    ["NOT FALSE OR TRUE", true],
    ["NOT FALSE OR FALSE", true],
    ["TRUE OR NOT TRUE", true],
    ["TRUE OR NOT FALSE", true],
    ["FALSE OR NOT TRUE", false],
    ["FALSE OR NOT FALSE", true],
    ["NOT TRUE OR NOT TRUE", false],
    ["NOT TRUE OR NOT FALSE", true],
    ["NOT FALSE OR NOT TRUE", true],
    ["NOT FALSE OR NOT FALSE", true],
    ["TRUE AND FALSE OR TRUE", true],
    ["TRUE OR TRUE OR TRUE AND FALSE", true],
    ["TRUE OR FALSE AND NOT FALSE", true],
    ["(TRUE)", true],
    ["((TRUE))", true],
    ["((TRUE AND FALSE) OR TRUE)", true],
    ["(TRUE OR (TRUE OR ((NOT TRUE) AND FALSE)))", true],
    ["NOT (TRUE AND TRUE)", false],
  ])("returns correct output for input", (input: string, output: boolean) => {
    expect(parseBoolean(input)).toEqual(output);
  });
});
