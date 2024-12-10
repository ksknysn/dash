import { TestBed } from '@angular/core/testing';

import { TextMeasurementService } from './text-measurement.service';

describe('TextMeasurementService', () => {
  let service: TextMeasurementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextMeasurementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
