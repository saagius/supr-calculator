const formatExpression = (expression) => {
  return expression
    .replaceAll('sin', 'Math.sin')
    .replaceAll('cos', 'Math.cos')
    .replaceAll('tan', 'Math.tan');
}

const evaluateExpression = (expression) => {
  const formattedExpression = formatExpression(expression);

  try {
    return Function(`'use strict'; return (${ formattedExpression })`)()
  }
  catch(err) {
    throw 'Invalid';
  }
}

const isValidExpression = (expression) => {
  try {
    evaluateExpression(expression);
    return true;
  }
  catch(err) {
    return false;
  }
}

module.exports = {
  isValidExpression,
  evaluateExpression
}
