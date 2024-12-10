import { TestBed } from '@angular/core/testing';

import { ScatterChartService } from './scatter-chart.service';

describe('ScatterChartService', () => {
  let service: ScatterChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScatterChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
