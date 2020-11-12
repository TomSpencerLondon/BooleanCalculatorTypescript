import {calculate, parseBoolean} from "../src/boolean-calculator";

describe("Boolean Calculator", () => {
  it("returns true for TRUE string", () => {
    expect(calculate("TRUE")).toEqual(true);
  });

  it("returns false for FALSE string", () => {
    expect(calculate("FALSE")).toEqual(false);
  });

  it("returns false for NOT TRUE string", () => {
    expect(calculate("NOT TRUE")).toEqual(false);
  });

  it.each([
    ["NOT FALSE", true],
    ["TRUE OR FALSE AND NOT FALSE", true],
    ["(TRUE OR TRUE OR TRUE) AND FALSE", false],
    ["NOT (TRUE AND TRUE)", false],
  ])("returns correct output for input", (input: string, output: boolean) => {
    expect(parseBoolean(input)).toEqual(output);
  });
});
