import tests from './tests';
import {
  isValidExpression,
  evaluateExpression
} from '../utils';

tests.forEach(expression => {
  const expressionIsValid = isValidExpression(expression);
  console.log(`${expression} is ${expressionIsValid ? `valid and value is ${evaluateExpression(expression)}` : 'invalid'}`);
});
