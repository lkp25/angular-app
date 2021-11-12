import { TestBed } from '@angular/core/testing';

import { DogcovidService } from './dogcovid.service';

describe('DogcovidService', () => {
  let service: DogcovidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DogcovidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
