import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementsComponent } from './elements.component';

describe('ElementsComponent', () => {
  let component: ElementsComponent;
  let fixture: ComponentFixture<ElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
