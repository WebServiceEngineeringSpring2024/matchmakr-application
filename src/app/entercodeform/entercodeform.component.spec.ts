import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntercodeformComponent } from './entercodeform.component';

describe('EntercodeformComponent', () => {
  let component: EntercodeformComponent;
  let fixture: ComponentFixture<EntercodeformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntercodeformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntercodeformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
