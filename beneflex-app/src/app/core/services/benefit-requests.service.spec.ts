import { TestBed } from '@angular/core/testing';

import { BenefitRequestsService } from './benefit-requests.service';

describe('BenefitRequestsService', () => {
  let service: BenefitRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BenefitRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
