import { TestBed } from '@angular/core/testing';

import { ClearComponentsService } from './clear-components.service';

describe('ClearComponentsService', () => {
  let service: ClearComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClearComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
