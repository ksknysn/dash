import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BySalaryRangeComponent } from './by-salary-range.component';

describe('BySalaryRangeComponent', () => {
  let component: BySalaryRangeComponent;
  let fixture: ComponentFixture<BySalaryRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BySalaryRangeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BySalaryRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
