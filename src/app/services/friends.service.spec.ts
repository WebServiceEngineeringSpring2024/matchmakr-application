import { TestBed } from '@angular/core/testing';

import { FriendsService } from './friends.service';

describe('FriendsService', () => {
  let service: FriendsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendsService);
  });

  it('update the tests plox', () => {
    expect(false).toBeTrue();
  });
});
