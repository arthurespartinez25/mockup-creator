import { DragDrop } from '@angular/cdk/drag-drop';
import { Icu } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { throwError } from 'rxjs';
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
  @Input() canvasLeft: any;
  @Input() canvasTop: any;
  @Input() canvasW: any;
  @Input() whatComponent:any;

  mousePositionX2 = 0;
  mousePositionY2 = 0;
  canvasPositionX = 0;
  canvasPositionY = 0;
  canvasWidth2 = 0;
  whatComponent2 = "";


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
  stylish ={};
  ngOnInit(): void {
    this.mousePositionX2 = this.mousePositionX;
    console.log(this.mousePositionX2)
    this.mousePositionY2 = this.mousePositionY;
    this.canvasPositionX = this.canvasLeft;
    this.canvasPositionY = this.canvasTop;
    this.canvasWidth2 = this.canvasW;
    this.whatComponent2 = this.whatComponent;
  }
  removeElement(remove:IComponent):void {

  }
}
