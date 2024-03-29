import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotformComponent } from './forgotform.component';

describe('ForgotformComponent', () => {
  let component: ForgotformComponent;
  let fixture: ComponentFixture<ForgotformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForgotformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
