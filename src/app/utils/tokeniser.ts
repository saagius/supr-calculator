import TokenType from './tokenType';

export interface Token {
  type: TokenType;
  value: string | number;
}

export class Tokeniser {
  stream = '';
  cursor = 0;

  isNumeric(char = '') {
    return char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57;
  }

  getTrigonometricType(input: string): TokenType | null {
    switch (input.toUpperCase()) {
      case TokenType.SIN:
        return TokenType.SIN;
      case TokenType.COS:
        return TokenType.COS;
      case TokenType.TAN:
        return TokenType.TAN;
      default:
        return null;
    }
  }

  at() {
    return this.stream[this.cursor];
  }

  peak(start: number, amountOfChars: number) {
    return this.stream.substr(start, amountOfChars);
  }

  tokenise(input = '') {
    this.stream = input;
    this.cursor = 0;

    const tokens: Token[] = [];

    while(this.cursor < this.stream.length) {
      switch(this.at()) {
        case ' ':
        case '\n':
        case '\t':
          break;
        case '+':
          tokens.push({
            type: TokenType.PLUS,
            value: '+'
          });
          break;
        case '-':
          tokens.push({
            type: TokenType.MINUS,
            value: '-'
          });
          break;
        case '*':
          tokens.push({
            type: TokenType.MULTIPLY,
            value: '*'
          });
          break;
        case '/':
          tokens.push({
            type: TokenType.DIVISION,
            value: '+'
          });
          break;
        case '(':
          tokens.push({
            type: TokenType.OPEN_PARENTHESIS,
            value: '('
          });
          break;
        case ')':
          tokens.push({
            type: TokenType.CLOSE_PARENTHESIS,
            value: ')'
          });
          break;
        default:
          if(this.isNumeric(this.at())) {
            let strInteger = '';

            while(this.cursor < this.stream.length && this.isNumeric(this.at())) {
              strInteger += this.at();
              this.cursor++;
            }

            tokens.push({
              type: TokenType.INTEGER,
              value: parseInt(strInteger)
            });
            this.cursor--;
          }
          else {
            const peakedStream = this.peak(this.cursor, 3);
            const type = this.getTrigonometricType(peakedStream);

            if(type !== null) {
              tokens.push({
                type,
                value: type.toLowerCase()
              });
              this.cursor += 2;
            }
            else {
              throw new Error(`Expected a valid token at position ${ this.cursor }`);
            }
          }
          break;
      }
      this.cursor++;
    }

    tokens.push({
      type: TokenType.EOF,
      value: 'EOF'
    });
    return tokens;
  }
}
