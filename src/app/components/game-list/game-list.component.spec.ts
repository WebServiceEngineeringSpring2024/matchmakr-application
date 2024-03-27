import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameListComponent } from './game-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('GameListComponent', () => {
  let component: GameListComponent;
  let fixture: ComponentFixture<GameListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameListComponent, HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
