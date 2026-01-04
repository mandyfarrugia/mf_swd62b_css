import { TestBed } from '@angular/core/testing';

import { FormatsService } from './formats-service';

describe('FormatsService', () => {
  let service: FormatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
