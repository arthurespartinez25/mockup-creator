import { DragDrop } from '@angular/cdk/drag-drop';
import { Target } from '@angular/compiler';
import { Component, ElementRef, Input, OnInit, Directive } from '@angular/core';
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

  @Input() mousePositionX: any;
  @Input() mousePositionY: any;

  xmouse = 0;
  ymouse = 0;
  
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
    //this.drag.createDrag(this.ref).withBoundaryElement(this.canvas);
    this.xmouse = this.mousePositionX;
    this.ymouse = this.mousePositionY;
  }
  element1 = document.getElementsByClassName('buttonDrag');
  
  ngAfterContentInit(){
    
  }
  
}
