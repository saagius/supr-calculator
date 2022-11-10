import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuprCalculatorComponent } from './suprcalculator.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [SuprCalculatorComponent],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule
	],
	exports: [SuprCalculatorComponent]
})
export class SuprCalculatorModule {
}
