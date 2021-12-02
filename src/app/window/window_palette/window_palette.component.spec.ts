import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowPaletteComponent } from './window_palette.component';

describe('WindowPaletteComponent', () => {
  let component: WindowPaletteComponent;
  let fixture: ComponentFixture<WindowPaletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WindowPaletteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowPaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
