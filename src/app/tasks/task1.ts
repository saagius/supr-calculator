import tests from './tests';
import {
  isValidExpression
} from '../utils';

tests.forEach(expression => {
  const expressionIsValid = isValidExpression(expression);
  console.log(`${expression} is ${expressionIsValid ? 'valid' : 'invalid'}`);
});
