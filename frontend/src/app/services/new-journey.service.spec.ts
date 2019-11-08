import { TestBed } from '@angular/core/testing';

import { NewJourneyService } from './new-journey.service';

describe('NewJourneyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewJourneyService = TestBed.get(NewJourneyService);
    expect(service).toBeTruthy();
  });
});
