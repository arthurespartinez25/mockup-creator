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
  @Input() xCounter: any;
  @Input() whatComponent:any;
  @Output() updateDataEvent2= new EventEmitter<any>();
  @Output() updateDataEventX= new EventEmitter<any>();

  xmouse = 0;
  ymouse = 0;
  xcanvas = 0;
  ycanvas = 0;
  xCounterstrike = 0;
  canvasWW = 0;
  jude=false;
  whatComponent2 = "";


  /*
  @Input() get wrapperCSS(): CSSStyleSheet {
    return this.wrapperStylesheet;
  }

  set wrapperCSS(wrapperDocument: CSSStyleSheet) {
    if (wrapperDocument) {
    this.sendWrapperStyleSheet(this.wrapperStylesheet);
    }
  }
  */

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
    //this.drag.createDrag(this.ref).withBoundaryElement(this.canvas);
    this.xmouse = this.mousePositionX;
    this.ymouse = this.mousePositionY;
    this.xcanvas = this.canvasLeft;
    this.ycanvas = this.canvasTop;
    this.xCounterstrike = this.xCounter;
    this.canvasWW = this.canvasW;
    this.whatComponent2 = this.whatComponent;
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
