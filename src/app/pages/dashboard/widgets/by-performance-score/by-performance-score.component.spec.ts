import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByPerformanceScoreComponent } from './by-performance-score.component';

describe('ByPerformanceScoreComponent', () => {
  let component: ByPerformanceScoreComponent;
  let fixture: ComponentFixture<ByPerformanceScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ByPerformanceScoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ByPerformanceScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
