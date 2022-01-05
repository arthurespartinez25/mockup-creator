import { DragDrop } from '@angular/cdk/drag-drop';
import { Icu } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { IComponent } from '../interfaces/icomponent';
import { IProperty } from '../interfaces/iproperty';
import { Output, EventEmitter } from '@angular/core';

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
  @Input() cssSignal: any;

  @Output() cssWrapper = new EventEmitter<CSSStyleSheet>();

  sendWrapperStyleSheet(wrapperDocument: CSSStyleSheet) {
    this.cssWrapper.emit(wrapperDocument);
  }

  wrapperStylesheet = document.styleSheets[0];
  wrapperStylesheet2 = document.styleSheets[0];
  

  xmouse = 0;
  ymouse = 0;


  @Input() get wrapperCSS(): CSSStyleSheet {
    return this.wrapperStylesheet;
  }

  set wrapperCSS(wrapperDocument: CSSStyleSheet) {
    if (wrapperDocument) {
    this.sendWrapperStyleSheet(this.wrapperStylesheet);
    }
  }

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
    this.cssWrapper.emit(this.wrapperStylesheet);
    console.log("below is the wrapper styleSheet\n");
    console.log(this.wrapperStylesheet);
  }
  removeElement(remove: IComponent): void {}
}
