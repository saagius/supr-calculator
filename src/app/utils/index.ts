import Fparser from './formulaParser';

export const evaluateExpression = (formula: string) => {
  try {
    return Fparser.calc(formula);
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
