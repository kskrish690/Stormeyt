import { TestBed } from '@angular/core/testing';

import { Weatherservice } from './weatherservice';

describe('Weatherservice', () => {
  let service: Weatherservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Weatherservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
