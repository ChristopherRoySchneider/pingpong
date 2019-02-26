import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchByIdComponent } from './match-by-id.component';

describe('MatchByIdComponent', () => {
  let component: MatchByIdComponent;
  let fixture: ComponentFixture<MatchByIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchByIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
