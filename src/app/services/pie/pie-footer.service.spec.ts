import { TestBed } from '@angular/core/testing';

import { PieFooterService } from './pie-footer.service';

describe('PieFooterService', () => {
  let service: PieFooterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PieFooterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
