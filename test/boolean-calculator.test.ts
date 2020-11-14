import { parseBoolean } from "../src/boolean-calculator";

describe("Boolean Calculator", () => {
  it.each([
    ["TRUE", true],
    ["NOT TRUE", false],
    ["FALSE", false],
    ["NOT FALSE", true],
  ])("returns correct output for input", (input: string, output: boolean) => {
    expect(parseBoolean(input)).toEqual(output);
  });
});
