import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadChartTypeComponent } from './read-chart-type.component';

describe('ReadChartTypeComponent', () => {
  let component: ReadChartTypeComponent;
  let fixture: ComponentFixture<ReadChartTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadChartTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadChartTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
