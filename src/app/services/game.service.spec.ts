import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GameService', () => {
  let service: GameService;
  let http: HttpClientTestingModule;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(GameService);
    http = TestBed.inject(HttpClientTestingModule);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
