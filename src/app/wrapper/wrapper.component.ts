import { DragDrop } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { IComponent } from '../interfaces/icomponent';
import { IProperty } from '../interfaces/iproperty';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css'],
})
export class WrapperComponent implements OnInit {
  child: IComponent;
  canvas: ElementRef;

  @Input() get childComp(): IComponent {
    return this.child;
  }

  set childComp(value: IComponent) {
    if (value) {
      this.child = value;
    }
  }

  @Input() get canvasRef(): ElementRef {
    return this.canvas;
  }

  set canvasRef(value: ElementRef) {
    this.canvas = value;
  }

  constructor(private ref: ElementRef, private drag: DragDrop) {}

  ngOnInit(): void {
    this.drag.createDrag(this.ref).withBoundaryElement(this.canvas);
  }
}
