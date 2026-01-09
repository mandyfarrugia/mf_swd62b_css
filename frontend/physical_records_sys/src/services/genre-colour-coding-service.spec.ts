import { TestBed } from '@angular/core/testing';

import { GenreColourCodingService } from './genre-colour-coding-service';

describe('GenreColourCodingService', () => {
  let service: GenreColourCodingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenreColourCodingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
