import { TestBed } from '@angular/core/testing';

import { DimensoesService } from './dimensoes.service';

describe('DimensoesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DimensoesService = TestBed.get(DimensoesService);
    expect(service).toBeTruthy();
  });
});
