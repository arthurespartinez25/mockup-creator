import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarDragComponent } from './navbarDrag.component';

describe('NavbarDragComponent', () => {
  let component: NavbarDragComponent;
  let fixture: ComponentFixture<NavbarDragComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarDragComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarDragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
