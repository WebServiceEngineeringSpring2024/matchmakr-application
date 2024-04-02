import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    expect(spyOn(component, 'ViewProfile').withArgs("vsinclaire1").and.returnValue(true));
  })

  it('should alert if no users found from search', () => {
    expect(spyOn(component, 'Submit').withArgs('AAAAAAAAAAAAA').and.returnValue(false));
  })

  it('should update filteredUsers with those found in a valid search', () => {
    expect(spyOn(component, 'Submit').withArgs('vs').and.returnValue(true));
  })
});
