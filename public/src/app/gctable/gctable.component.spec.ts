import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GctableComponent } from './gctable.component';

describe('GctableComponent', () => {
  let component: GctableComponent;
  let fixture: ComponentFixture<GctableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GctableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GctableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
