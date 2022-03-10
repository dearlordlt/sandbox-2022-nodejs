/* class Calculator {
  constructor() {
    this.current = 0;
  }

  add(value) {
    this.current += value;
  }

  subtract(value) {
    this.current -= value;
  }

  multiply(value) {
    this.current *= value;
  }

  divide(value) {
    this.current /= value;
  }
}

const calc = new Calculator();
calc.add(10);
console.log(calc.current);

calc.subtract(5);
console.log(calc.current); */

class AddCommand {
  constructor(valueToAdd) {
    this.valueToAdd = valueToAdd;
  }

  execute(currentValue) {
    return currentValue + this.valueToAdd;
  }

  undo(currentValue) {
    return currentValue - this.valueToAdd;
  }
}

class SubtractCommand {
  constructor(valueToSubtract) {
    this.valueToSubtract = valueToSubtract;
  }

  execute(currentValue) {
    return currentValue - this.valueToSubtract;
  }

  undo(currentValue) {
    return currentValue + this.valueToSubtract;
  }
}

class Calculator {
  constructor() {
    this.current = 0;
    this.history = [];
  }

  executeCommand(command) {
    this.current = command.execute(this.current);
    this.history.push(command);
  }

  undo() {
    const command = this.history.pop();
    this.current = command.undo(this.current);
  }
}

const calc = new Calculator();

calc.executeCommand(new AddCommand(10));
calc.executeCommand(new SubtractCommand(5));
calc.executeCommand(new AddCommand(10));

calc.undo();

/* console.log(calc.current); */