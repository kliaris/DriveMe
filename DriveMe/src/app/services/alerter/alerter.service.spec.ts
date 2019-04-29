import { TestBed } from '@angular/core/testing';

import { AlerterService } from './alerter.service';

describe('AlerterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlerterService = TestBed.get(AlerterService);
    expect(service).toBeTruthy();
  });
});
