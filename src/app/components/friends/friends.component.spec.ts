import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsComponent } from './friends.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Friendview } from '../../models/friendview';

describe('FriendsComponent', () => {
  let component: FriendsComponent;
  let fixture: ComponentFixture<FriendsComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendsComponent, HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should warn once before deleting friend', () => {
    const spy = spyOn(component, 'confirmPrompt').withArgs('bob').and.returnValue(false);
    component.deleteFriend(1111, 'bob');
    expect(spy).toHaveBeenCalledTimes(1);
  })

  it('should correctly sort friends by online status', () => {
    // arrange
    component.allFriends.push(new Friendview("r", false, 2), new Friendview("r", false, 4), new Friendview("r", true, 6), new Friendview("r", true, 10), new Friendview("r", false, 12));
    // act
    component.sortFriends();
    // assert
    let sorted = true;
    // online friends should all be online
    component.onlineFriends.forEach(element => {
      if (element.online != true) {
        sorted = false;
      }
    });
    // offline friend sshould all be offline
    component.offlineFriends.forEach(element => {
      if (element.online == true) {
        sorted = false;
      }
    })
    expect(sorted).toBeTrue();
  })

  it('should have loading messages initially', () => {
    expect(component.friendsMsg.includes('Loading') && component.requestsMsg.includes('Loading')).toBeTrue();
  })
});
