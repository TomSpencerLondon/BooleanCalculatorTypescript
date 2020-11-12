import {calculate, parseBooleanExpression} from "../src/boolean-calculator";

describe("Boolean Calculator", () => {
  it("returns true for TRUE string", () => {
    expect(calculate("TRUE")).toEqual(true);
  })

  it("returns false for FALSE string", () => {
    expect(calculate("FALSE")).toEqual(false);
  })

  it("returns false for NOT TRUE string", () => {
    expect(calculate("NOT TRUE")).toEqual(false);
  })

  it.each([
    ["!(f)", true],
    ["|(f,t)", true],
    ["&(t,f)", false],
    ["|(&(t,f,t),!(t)", false],
  ])("returns correct output for input", (input: string, output: boolean) => {
    expect(parseBooleanExpression(input)).toEqual(output);
  });
})
