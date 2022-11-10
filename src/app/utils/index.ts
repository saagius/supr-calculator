const formatExpression = (expression: string) => {
  return expression
    .replaceAll('sin', 'Math.sin')
    .replaceAll('cos', 'Math.cos')
    .replaceAll('tan', 'Math.tan');
}

export const evaluateExpression = (expression: string) => {
  const formattedExpression = formatExpression(expression);

  try {
    return Function(`'use strict'; return (${ formattedExpression })`)()
  }
  catch(err) {
    throw 'Invalid';
  }
}

export const isValidExpression = (expression: string) => {
  try {
    evaluateExpression(expression);
    return true;
  }
  catch(err) {
    return false;
  }
}
