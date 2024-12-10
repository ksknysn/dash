import { TestBed } from '@angular/core/testing';

import { PieCleanChartService } from './pie-clean-chart.service';

describe('PieCleanChartService', () => {
  let service: PieCleanChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PieCleanChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
