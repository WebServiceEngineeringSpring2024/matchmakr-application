import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';

import { currentUserViewGuard } from './current-user-view.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('currentUserViewGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => currentUserViewGuard(...guardParameters));
  beforeEach(() => {
    localStorage.setItem("e", "test@biz.co");
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
  });
  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});