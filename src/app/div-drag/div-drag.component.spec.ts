import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivDragComponent } from './div-drag.component';

describe('DivDragComponent', () => {
  let component: DivDragComponent;
  let fixture: ComponentFixture<DivDragComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivDragComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DivDragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
