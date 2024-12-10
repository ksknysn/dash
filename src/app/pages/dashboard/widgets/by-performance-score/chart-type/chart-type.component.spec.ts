import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTypeComponent } from './chart-type.component';

describe('ChartTypeComponent', () => {
  let component: ChartTypeComponent;
  let fixture: ComponentFixture<ChartTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
