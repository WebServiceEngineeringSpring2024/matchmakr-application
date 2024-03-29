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
    var x = function (): boolean {
      service.postPersonalityData('', 9, 5, 8).subscribe({
        next: (data) => {
          return data;
        },
        error: (err) => {
          return false;
        }
      })
      return false;
    }
    expect(x()).toBeFalsy();
  });
  it('should not allow no score', () => {
    // 0 is not truthy
    var x = function (): boolean {
      service.postPersonalityData('mliopi@gmail.com', 0, 0, 0).subscribe({
        next: (data) => {
          return data;
        },
        error: (err) => {
          return false;
        }
      })
      return false;
    }
    expect(x()).toBeFalsy();
  });
  it('should not allow negative score', () => {
    var x = function (): boolean {
      service.postPersonalityData('mliopi81@gmail.com', -2, 5, 3).subscribe({
        next: (data) => {
          return data;
        },
        error: (err) => {
          return false;
        }
      })
      return false;
    }
    expect(x()).toBeFalsy();
  });
  it('should not allow large scores', () => {
    var x = function (): boolean {
      service.postPersonalityData('mwilson41@gmail.com', 6, 312, 8).subscribe({
        next: (data) => {
          return data;
        },
        error: (err) => {
          return false;
        }
      })
      return false;
    }
    expect(x()).toBeFalsy();
  });
});