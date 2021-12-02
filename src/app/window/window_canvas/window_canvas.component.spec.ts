import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowCanvasComponent } from './window_canvas.component';

describe('WindowCanvasComponent', () => {
  let component: WindowCanvasComponent;
  let fixture: ComponentFixture<WindowCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WindowCanvasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
