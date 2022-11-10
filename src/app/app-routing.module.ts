import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { SuprCalculatorComponent } from './components/suprcalculator/suprcalculator.component';

const routes: Routes = [
  {
    path: 'calculator',
    component: CalculatorComponent,
    data: { title: 'Calculator' }
  },
  {
    path: 'supr-calculator',
    component: SuprCalculatorComponent,
    data: { title: 'Supr Calculator' }
  },
  {
    path: '',
    redirectTo: '/calculator',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/calculator',
    pathMatch: 'full'
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
