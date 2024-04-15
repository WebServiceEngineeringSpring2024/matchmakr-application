import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { User } from '../../models/user';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListComponent, HttpClientTestingModule, BrowserAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate upon clicking a user', () => {
    component.users.push(new User(2, "vsinclare1", "", "", 0, 1), new User(1, "vsinclaire1", "", "", 1, 1))
    expect(component.ViewProfile('vsinclaire1')).toBeTrue();
  })

  it('should not navigate upon attempting to view profile of invalid user', () => {
    expect(component.ViewProfile('AAAAAAEAAAAEAAAAAA')).toBeFalse();
  })

  it('should alert if no users found from search', () => {
    expect(component.Submit('AAAEAAAAAAAAAEEEE')).toBeFalse();
  })

  it('should update filteredUsers with those found in a valid search', () => {
    component.users.push(new User(2, "vsinclare1", "", "", 0, 1), new User(1, "vsinclaire1", "", "", 1, 1))
    expect(component.Submit('vs')).toBeTrue();
  })
});
