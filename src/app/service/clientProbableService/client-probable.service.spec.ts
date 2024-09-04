import { TestBed } from '@angular/core/testing';

import { ClientProbableService } from './client-probable.service';

describe('ClientProbableService', () => {
  let service: ClientProbableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientProbableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
