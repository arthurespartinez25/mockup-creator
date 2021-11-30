import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UIWindowComponent } from './window.component';

describe('UIWindowComponent', () => {
  let component: UIWindowComponent;
  let fixture: ComponentFixture<UIWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UIWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UIWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
