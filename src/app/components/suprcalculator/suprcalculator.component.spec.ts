import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SuprCalculatorComponent } from './suprcalculator.component';

describe('SuprCalculatorComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        SuprCalculatorComponent
      ],
    }).compileComponents();
  });

  it('should create the supr calculator', () => {
    const fixture = TestBed.createComponent(SuprCalculatorComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
