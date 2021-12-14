import { DragDrop } from '@angular/cdk/drag-drop';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() updateDataEvent2= new EventEmitter<any>();
  @Output() updateDataEventX= new EventEmitter<any>();

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
  removeElement(remove:IComponent):void {

  }
  passData(item: any){
    //console.warn(item);
    this.updateDataEvent2.emit(item);
  }
  passDataY(item: any){
    //console.warn(item);
    this.updateDataEventX.emit(item);
  }
}
