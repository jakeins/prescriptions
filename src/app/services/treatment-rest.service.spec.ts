import { TestBed } from '@angular/core/testing';

import { TreatmentRestService } from './treatment-rest.service';

describe('TreatmentsRestService', () => {
  let service: TreatmentRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreatmentRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
