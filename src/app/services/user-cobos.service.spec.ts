import { TestBed } from '@angular/core/testing';

import { UserCobosService } from './user-cobos.service';

describe('UserCobosService', () => {
  let service: UserCobosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserCobosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
