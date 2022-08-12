import { TestBed } from '@angular/core/testing';

import { MonthlyPremiumService } from './monthly-premium.service';

describe('MonthlyPremiumService', () => {
  let service: MonthlyPremiumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthlyPremiumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
