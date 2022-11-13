import { Tokeniser } from './tokeniser';
import Parser from './parser';

export const evaluateExpression = (formula: string) => {
  const tokeniser = new Tokeniser();
  const tokens = tokeniser.tokenise(formula);
  const parser = new Parser(tokens);
  try {
    return parser.evaluate();
  }
  catch(err) {
    throw 'Invalid';
  }
}

export const isValidExpression = (expression: string) => {
  const tokeniser = new Tokeniser();
  const tokens = tokeniser.tokenise(expression);

  const parser = new Parser(tokens);
  try {
    parser.parse();
    return true;
  }
  catch(err) {
    return false;
  }
}
