import { ChangeDetectionStrategy, Component } from '@angular/core';
import { evaluateExpression, isValidExpression } from '../../utils';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculatorComponent {
  expressionIsValid = true;
  expression = '';
  expressionValue = '';

  validExpressions: any[] = [];

  saveValidExpression = () => {
    const lastValidExpression = this.validExpressions[this.validExpressions.length - 1];

    if(!lastValidExpression || lastValidExpression.expression.trim() !== this.expression.trim()) {
      this.validExpressions.push({
        expression: this.expression,
        value: this.expressionValue
      });

      if (this.validExpressions.length > 5) {
        this.validExpressions.shift();
      }
    }
  }

  validateAndEvaluateExpression() {
    this.expressionIsValid = isValidExpression(this.expression);

    if(this.expressionIsValid) {
      this.expressionValue = evaluateExpression(this.expression);
      this.saveValidExpression();
    }
  }
}
