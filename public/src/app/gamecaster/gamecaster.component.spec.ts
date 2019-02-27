import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamecasterComponent } from './gamecaster.component';

describe('GamecasterComponent', () => {
  let component: GamecasterComponent;
  let fixture: ComponentFixture<GamecasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamecasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamecasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
