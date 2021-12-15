import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, ComponentRef, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';

@Component({
  selector: 'app-button',
  template: `<button cdkDrag cdkDragBoundary="#canvas"
  (cdkDragEnded)="onDragEnded($event)" [id]="props.id" [style]="props.style"  [ngStyle]="{
    'position': 'absolute',
    'left': theX + 'px',
    'top': theY + 'px'
  }" [type]="props.type">
    {{ props.value }}
  </button>`,
})

export class ButtonComponent implements IComponent {
 
  
  canvas: ElementRef;
  props: IProperty = {
    key: '',
    id: '',
    value: 'Button',
    class: '',
    style: 'position:absolute;left:0px;top:0px;',
    typeObj: 'button',
    type: 'button',
  };
  //(cdkDragEnded)="onDragEnded($event)"
  @Output() updateDataEvent= new EventEmitter<any>();
  @Output() updateDataEventY= new EventEmitter<any>();
  @Input() xcanvas: any;
  @Input() ycanvas: any;
  mousePositionXV2 = 310;
  mousePositionYV2= 110;
  theX = 0;
  theY = 0;

  onDragEnded($event: any){
    this.mousePositionXV2 = $event.source.getFreeDragPosition().x;
    this.mousePositionYV2 = $event.source.getFreeDragPosition().y;
    
    this.updateDataEvent.emit(this.mousePositionXV2);
    this.updateDataEventY.emit(this.mousePositionYV2);
  }

  constructor(canvas: ElementRef) {
    this.canvas = canvas;
    let date = Date.now();
    this.props.key = date.toString();
    this.props.id = 'button' + date.toString();
  }

  @Input() get property(): IProperty {
    return this.props;
  }

  set property(value: IProperty) {
    if (value) {
      this.props = value;
    }
  }

  get htmlCode(): string {
    let tmpHtmlCode = '<button';
    if (this.props.id.trim().length > 0) {
      tmpHtmlCode += ' id="' + this.props.id + '"';
    }

    if (this.props.type.trim().length > 0) {
      tmpHtmlCode += ' type="' + this.props.type + '"';
    }

    if (this.props.class.trim().length > 0) {
      tmpHtmlCode += ' class="' + this.props.class + '"';
    }

    if (this.props.style.trim().length > 0) {
      tmpHtmlCode += ' style="' + this.props.style + '"';
    }

    tmpHtmlCode += '>' + this.props.value + '</button>';

    return tmpHtmlCode;
  }

  ngOnInit(): void {
    //this.drag.createDrag(this.ref).withBoundaryElement(this.canvas);
    this.theX = this.xcanvas;
    this.theY = this.ycanvas;
  }
}
