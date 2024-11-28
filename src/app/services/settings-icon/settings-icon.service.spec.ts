import { TestBed } from '@angular/core/testing';

import { SettingsIconService } from './settings-icon.service';

describe('SettingsIconService', () => {
  let service: SettingsIconService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsIconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
