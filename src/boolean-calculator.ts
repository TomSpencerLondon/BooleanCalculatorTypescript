export const calculate = (input: string): boolean => {
  const operations = input.split(" ");
  const result = operations.map((o) => o.trim());

  if (operations.length === 1){
    return new SimpleOperand(result[0]).toBoolean();
  }else {
    return new Operation(result[0], new SimpleOperand(result[1])).toBoolean()
  }
}

class SimpleOperand {
  private value: string;
  constructor(value: string) {
    this.value = value;
  }

  toBoolean(): boolean {
    if (this.value !== "TRUE" && this.value !== "FALSE"){
      throw new Error();
    }
    return this.value === "TRUE";
  }
};

class Operation {
  private value: string;
  private operand: SimpleOperand;
  constructor(value: string, operand: SimpleOperand) {
    this.value = value;
    this.operand = operand;
  }

  toBoolean(): boolean {
    if (this.value === "NOT"){
      return !this.operand.toBoolean();
    }
  }
};
