import * as util from 'util';
import tests from './tests';
import {
  Tokeniser
} from '../utils/tokeniser';
import Parser from '../utils/parser';

tests.forEach(expression => {
  const tokeniser = new Tokeniser();
  const tokens = tokeniser.tokenise(expression);

  const parser = new Parser(tokens);
  try {
    const ast = parser.parse();
    // console.log(util.inspect(ast, {
    //   showHidden: false,
    //   depth: null,
    //   colors: true
    // }));
    console.log(`${expression} is valid`);
  }
  catch (err) {
    console.log(`${expression} is invalid`);
  }
});
