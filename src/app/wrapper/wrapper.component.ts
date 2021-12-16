import { DragDrop } from '@angular/cdk/drag-drop';
import { Icu } from '@angular/compiler/src/i18n/i18n_ast';
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
  compList: IComponent[] = [];
  canvasWidth: string;

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
    this.canvasWidth = getComputedStyle(this.canvas.nativeElement).width;
  }

  @Input()get componentList(): IComponent[]{
    return this.compList;
  }

  set componentList(value: IComponent[]){
    this.compList = value;
  }

  constructor(private ref: ElementRef, private drag: DragDrop) {}

  ngOnInit(): void {
    //this.drag.createDrag(this.ref).withBoundaryElement(this.canvas);
    this.xmouse = this.mousePositionX;
    this.ymouse = this.mousePositionY;
  }
  removeElement(remove: IComponent): void {}
}
