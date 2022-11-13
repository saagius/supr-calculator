import tests from './tests';
import { Tokeniser } from '../utils/tokeniser';
import Parser from '../utils/parser';

tests.forEach(expression => {
  const tokeniser = new Tokeniser();
  const tokens = tokeniser.tokenise(expression);

  const parser = new Parser(tokens);
  try {
    const value = parser.evaluate();
    console.log(`${expression} is equal to ${value}`);
  }
  catch (err) {
    console.log(`${expression} is invalid`);
  }
});
