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
  ])("returns correct output for input", (input: string, output: boolean) => {
    expect(parseBoolean(input)).toEqual(output);
  });
});
