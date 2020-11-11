import {calculate} from "../src/boolean-calculator";

describe("Boolean Calculator", () => {
  it("returns true for TRUE string", () => {
    expect(calculate("TRUE")).toEqual(true);
  })

  it("returns false for FALSE string", () => {
    expect(calculate("FALSE")).toEqual(false);
  })
})
