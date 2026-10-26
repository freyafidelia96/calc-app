export default function calculate(expression: string): number {
  const calculation = expression.replaceAll("x", "*");

  // Validate the expression
  const validExpression = /^-?\d+(?:\.\d+)?(?:[+\-*/]-?\d+(?:\.\d+)?)*$/.test(
    calculation,
  );

  if (!validExpression) {
    return Number.NaN;
  }

  // Extract numbers and operators
  const tokens = calculation.match(/(?<=^|[+\-*/])-?\d+(?:\.\d+)?|[+\-*/]/g);

  if (!tokens) {
    return Number.NaN;
  }

  const terms = [Number(tokens[0])];

  // Resolve multiplication and division first
  for (let i = 1; i < tokens.length; i += 2) {
    const operator = tokens[i];
    const operand = Number(tokens[i + 1]);

    switch (operator) {
      case "*":
        terms.push(terms.pop()! * operand);
        break;

      case "/":
        terms.push(terms.pop()! / operand);
        break;

      case "+":
        terms.push(operand);
        break;

      case "-":
        terms.push(-operand);
        break;
    }
  }

  // Resolve addition and subtraction
  const result = terms.reduce((sum, term) => sum + term, 0);

  if (!Number.isFinite(result)) {
    return result;
  }

  // Remove floating-point artifacts
  const rounded = Number(result.toPrecision(12));

  return rounded;
}
