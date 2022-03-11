import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeSegmentComponent } from './code-segment.component';

describe('CodeSegmentComponent', () => {
  let component: CodeSegmentComponent;
  let fixture: ComponentFixture<CodeSegmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeSegmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
