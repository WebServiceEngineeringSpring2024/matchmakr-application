import { TestBed } from '@angular/core/testing';

import { PersonalityService } from './personality.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PersonalityService', () => {
  let service: PersonalityService;

  let http: HttpClientTestingModule;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(PersonalityService);

    http = TestBed.inject(HttpClientTestingModule);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should not allow no email', () => {
    service.postPersonalityData('', 9, 5, 8).subscribe((ok) => {
      expect(!ok);
    })
  });
  it('should not allow no score', () => {
    // 0 is not truthy
    service.postPersonalityData('mliopi@gmail.com', 0, 0, 0).subscribe((ok) => {
      expect(!ok);
    })
  });
  it('should not allow negative score', () => {
    service.postPersonalityData('mliopi81@gmail.com', -2, 5, 3).subscribe((ok) => {
      expect(!ok);
    })
  });
  it('should not allow large scores', () => {
    service.postPersonalityData('mwilson41@gmail.com', 6, 312, 8).subscribe((ok) => {
      expect(!ok);
    })
  });
});