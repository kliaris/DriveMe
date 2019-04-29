import { TestBed } from '@angular/core/testing';

import { FbLoginService } from './fb-login.service';

describe('FbLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FbLoginService = TestBed.get(FbLoginService);
    expect(service).toBeTruthy();
  });
});
