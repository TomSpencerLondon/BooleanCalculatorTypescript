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

export const parseBooleanExpression = (expression: string): boolean => {
  return helper(expression, 0, expression.length);
}

export const helper = (expression: string, low: number, high: number): boolean => {
  if (low === high){
    return expression.charAt(low) != "f";
  }

  const operator = expression.charAt(low);
  let count = 0;
  let result: boolean = (operator === "|") ? false : true;

  let previous: number = low + 2;
  for (let i = low + 1; i <= high; i++){
    let c = expression.charAt(i);
    if (c === "("){
      count++;
    }else if (c === ")"){
      count--;
    }

    if((count === 1 && c === ",") || (count === 0 && c === ")")){
      let next: boolean = helper(expression, previous, i - 1);
      previous = i + 1;
      if (operator === "|"){
        result = result || next;
      }else if (operator === "&") {
        result = result && next;
      }else {
        result = !next;
      }
    }
  }
  return result;
}
