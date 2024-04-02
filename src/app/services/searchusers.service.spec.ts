import { TestBed } from '@angular/core/testing';

import { SearchusersService } from './searchusers.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SearchusersService', () => {
  let service: SearchusersService;

  let http: HttpClientTestingModule;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(SearchusersService);

    http = TestBed.inject(HttpClientTestingModule);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should pull user data', () => {
    
    service.getAllUsers().subscribe({
      next: (data) => {
        expect(data).toBeTruthy();
      },
      error: (err) => {
        expect(false).toBeTrue();
      }
    });
  })
});
