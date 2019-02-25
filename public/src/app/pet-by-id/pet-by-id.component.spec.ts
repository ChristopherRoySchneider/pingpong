import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetByIdComponent } from './pet-by-id.component';

describe('PetByIdComponent', () => {
  let component: PetByIdComponent;
  let fixture: ComponentFixture<PetByIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetByIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
