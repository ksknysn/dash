import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByEmployeeTypeComponent } from './by-employee-type.component';

describe('ByEmployeeTypeComponent', () => {
  let component: ByEmployeeTypeComponent;
  let fixture: ComponentFixture<ByEmployeeTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ByEmployeeTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ByEmployeeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
