import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { evaluateExpression, isValidExpression } from '../../utils';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-suprcalculator',
  templateUrl: './suprcalculator.component.html',
  styleUrls: ['./suprcalculator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SuprCalculatorComponent {
  result = '0';
  expression = '';

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {
  }

  reset() {
    this.result = '0';
    this.expression = '';
  }

  evaluateExpression() {
    const expressionIsValid = isValidExpression(this.expression);

    if(expressionIsValid) {
      this.result = evaluateExpression(this.expression).toString();
    }
    else {
      this.result = 'NaN';
    }
  }

  addToExpression($event: any) {
    console.log($event.target.innerHTML);
    this.expression += $event.target.innerHTML;
  }

  triggerRandomAndAddToExpression() {
    this.apiService.getRandomNumber()
        .subscribe((randomNumber => {
          this.expression += randomNumber.toString();
          this.cdr.markForCheck();
        }));
  }
}
