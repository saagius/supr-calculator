const tests = require('./tests');
const {
  isValidExpression,
  evaluateExpression
} = require('../utils');

tests.forEach(expression => {
  const expressionIsValid = isValidExpression(expression);
  console.log(`${expression} is ${expressionIsValid ? `valid and value is ${evaluateExpression(expression)}` : 'invalid'}`);
});
