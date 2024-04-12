import { TestBed } from '@angular/core/testing';

import { FriendsService } from './friends.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Friendview } from '../models/friendview';

describe('FriendsService', () => {
  let service: FriendsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [
      HttpClientTestingModule
    ]});
    service = TestBed.inject(FriendsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true form checkIfFriends if friends are found', () => {
    // 1004 and 1007 may be changed as needed
    service.checkIfFriends(1004, 1007).subscribe((value: Boolean) => {
      expect(value).toBeTrue();
    })
  })

  it('should return false form checkIfFriends if friends are not found', () => {
    // 1004 and 1007 may be changed as needed
    service.checkIfFriends(2, 4).subscribe((value: Boolean) => {
      expect(value).toBeFalse();
    })
  })

  it('should return a list of friends from getFriends', () => {
    service.getFriends(1007).subscribe((value: Friendview[]) => {
      expect(value?.length > 0).toBeTrue();
    })
  })

  // more as needed
});
