import { TestBed } from '@angular/core/testing';

import { KucoinService } from './kucoin.service';

describe('KucoinService', () => {
  let service: KucoinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KucoinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
