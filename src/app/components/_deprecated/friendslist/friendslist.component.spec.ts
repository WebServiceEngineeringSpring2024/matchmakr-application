import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendslistComponent } from './friendslist.component';

describe('FriendslistComponent', () => {
  let component: FriendslistComponent;
  let fixture: ComponentFixture<FriendslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendslistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FriendslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
