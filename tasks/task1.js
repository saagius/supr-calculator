const tests = require('./tests');
const {
  isValidExpression
} = require('../utils');

tests.forEach(expression => {
  const expressionIsValid = isValidExpression(expression);
  console.log(`${expression} is ${expressionIsValid ? 'valid' : 'invalid'}`);
});
