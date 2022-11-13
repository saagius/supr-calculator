import TokenType from './tokenType';
import { Token } from './tokeniser';

export default class Parser {
	tokens: Token[] = [];
	cursor = 0;

	constructor(tokens: Token[]) {
		this.tokens = tokens;
	}

	resetCursor() {
		this.cursor = 0;
	}

	at() {
		const currentCursor = this.tokens[this.cursor];
		return currentCursor;
	}

	eatToken(tokenType: TokenType) {
		if(this.at().type === tokenType) {
			this.cursor++;
			return;
		}

		throw Error(`Expected a token to be of type: ${tokenType} instead received a ${this.at().type}`);
	}

	parse() {
		this.resetCursor();
		return this.parseLowPriorityExpression();
	}

	parseLowPriorityExpression() {
		let left: any = this.parseMultiplyAndDivisions();

		while (
			this.at().type == TokenType.PLUS
			|| this.at().type == TokenType.MINUS
			) {
			const operator = this.at().value;
			const tokenType = this.at().type;
			this.eatToken(tokenType);
			let right = this.parseLowPriorityExpression();

			left = {
				type: 'BinaryExpression',
				left,
				operator,
				right
			}
		}

		return left;
	}

	parseMultiplyAndDivisions() {
		let left: any = this.parseHighPriorityExpression();

		while (this.at().type == TokenType.MULTIPLY || this.at().type == TokenType.DIVISION) {
			const operator = this.at().value;
			const tokenType = this.at().type;
			this.eatToken(tokenType);
			const right = this.parseLowPriorityExpression();

			left = {
				type: 'BinaryExpression',
				left,
				operator,
				right
			}
		}

		return left;
	}

	parseHighPriorityExpression() {
		if (this.at().type == TokenType.INTEGER) {
			const literal = {
				type: "Literal",
				value: this.at().value
			};
			this.eatToken(this.at().type);
			return literal;
		}

		if (this.at().type == TokenType.OPEN_PARENTHESIS) {
			this.eatToken(TokenType.OPEN_PARENTHESIS);
			const expr = this.parseLowPriorityExpression();
			this.eatToken(TokenType.CLOSE_PARENTHESIS);
			return expr;
		}

		let left: any;

		while (
			this.at().type == TokenType.PLUS
			|| this.at().type == TokenType.MINUS) {
			const operator = this.at().value;
			const tokenType = this.at().type;
			this.eatToken(tokenType);
			let right = this.parseLowPriorityExpression();

			left = {
				type: 'UnaryExpression',
				left: right,
				operator
			}
		}

		if(left) {
			return left;
		}

		while (
			this.at().type == TokenType.SIN
			|| this.at().type == TokenType.COS
			|| this.at().type == TokenType.TAN
			) {
			const tokenType = this.at().type;
			const expressionTokens = this.getCurrentOperationTokens();
			expressionTokens.push({
				type: TokenType.EOF,
				value: 'EOF'
			});

			const tokensToEat = expressionTokens.length + 2 // Open Parenthesis + Close Parenthesis;

			this.cursor += tokensToEat;

			left = {
				type: 'CallExpression',
				callee: {
					name: tokenType
				},
				arguments: new Parser(expressionTokens).parse()
			}
		}

		if(left) {
			return left;
		}

		throw new Error(`Expected a parenthesis or an integer token but instead received: ${ JSON.stringify(this.at()) }`);
	}

	getCurrentOperationTokens() {
		let amountOfOpenParenthesis = 0;
		let amountOfCloseParenthesis = 0;
		let operationTokens = [];
		let indexOfFirstOpenParenthesis = 0;

		const rightFromCursor = this.tokens.filter((value, index) => index >= this.cursor);

		for (let tokenIndex = 1; tokenIndex < rightFromCursor.length; tokenIndex++) {
			if(rightFromCursor[tokenIndex].type == TokenType.OPEN_PARENTHESIS) {
				amountOfOpenParenthesis++;

				if(amountOfOpenParenthesis == 1) {
					indexOfFirstOpenParenthesis = tokenIndex;
				}
			}

			if(tokenIndex > indexOfFirstOpenParenthesis) {
				operationTokens.push(rightFromCursor[tokenIndex]);
			}

			if(rightFromCursor[tokenIndex].type == TokenType.CLOSE_PARENTHESIS) {
				amountOfCloseParenthesis++;
			}

			if(amountOfOpenParenthesis == amountOfCloseParenthesis) {
				operationTokens.pop();
				break;
			}
		}

		return operationTokens;
	}

	evaluate()  {
		this.resetCursor();
		return this.evaluateLowPriorityExpression();
	}

	evaluateLowPriorityExpression() {
		let left: any = this.evaluateMultiplyAndDivisions();

		while (
			this.at().type == TokenType.PLUS
			|| this.at().type == TokenType.MINUS
			) {
			const tokenType = this.at().type;
			this.eatToken(tokenType);
			let right = this.evaluateLowPriorityExpression();

			if(tokenType == TokenType.PLUS) {
				left = left + right;
			}
			else {
				left = left - right;
			}
		}

		return left;
	}

	evaluateMultiplyAndDivisions() {
		let left: any = this.evaluateHighPriorityExpression();

		while (this.at().type == TokenType.MULTIPLY || this.at().type == TokenType.DIVISION) {
			const tokenType = this.at().type;
			this.eatToken(tokenType);
			const right = this.evaluateLowPriorityExpression();

			if(tokenType == TokenType.MULTIPLY) {
				left = left * right;
			}
			else {
				left = left / right;
			}
		}

		return left;
	}

	evaluateHighPriorityExpression() {
		if (this.at().type == TokenType.INTEGER) {
			const value = this.at().value;
			this.eatToken(this.at().type);
			return value;
		}

		if (this.at().type == TokenType.OPEN_PARENTHESIS) {
			this.eatToken(TokenType.OPEN_PARENTHESIS);
			const value = this.evaluateLowPriorityExpression();
			this.eatToken(TokenType.CLOSE_PARENTHESIS);
			return value;
		}

		let left: any;

		while (
			this.at().type == TokenType.PLUS
			|| this.at().type == TokenType.MINUS) {
			const tokenType = this.at().type;
			this.eatToken(tokenType);
			let right = this.evaluateLowPriorityExpression();

			if(tokenType == TokenType.PLUS) {
				left = right;
			}
			else {
				left = -right;
			}
		}

		if(left) {
			return left;
		}

		while (
			this.at().type == TokenType.SIN
			|| this.at().type == TokenType.COS
			|| this.at().type == TokenType.TAN
			) {
			const tokenType = this.at().type;
			const expressionTokens = this.getCurrentOperationTokens();
			expressionTokens.push({
				type: TokenType.EOF,
				value: 'EOF'
			});

			const tokensToEat = expressionTokens.length + 2 // Open Parenthesis + Close Parenthesis;

			this.cursor += tokensToEat;

			let func: any;

			if(tokenType == TokenType.SIN) {
				func = Math.sin;
			}
			else if(tokenType == TokenType.COS) {
				func = Math.cos;
			}
			else if(tokenType == TokenType.TAN) {
				func = Math.tan;
			}

			left = func.apply(null, [new Parser(expressionTokens).evaluate()]);
		}

		if(left) {
			return left;
		}

		throw new Error(`Expected a parenthesis or an integer token but instead received: ${ JSON.stringify(this.at()) }`);
	}
}
