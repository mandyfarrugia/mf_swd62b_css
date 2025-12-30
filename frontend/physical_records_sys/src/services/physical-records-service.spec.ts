import { TestBed } from '@angular/core/testing';

import { PhysicalRecordsService } from '../services/physical-records-service';

describe('PhysicalRecordsService', () => {
  let service: PhysicalRecordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhysicalRecordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
