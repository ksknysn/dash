import { TestBed } from '@angular/core/testing';

import { TwoDimChartService } from './two-dim-chart.service';

describe('TwoDimChartService', () => {
  let service: TwoDimChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TwoDimChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
