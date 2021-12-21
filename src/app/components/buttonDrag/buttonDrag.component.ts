import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';

@Component({
  selector: 'app-buttonDrag',
  template: `<button cdkDrag cdkDragBoundary="#canvas"
  (cdkDragEnded)="onDragEnded($event)" [id]="props.id" [style]="props.style" 
  [ngStyle]="{
    'position': 'fixed',
    'left': dagaX + 'px',
    'top': dagaY + 'px'
  }" [type]="props.type">
    {{ props.value }}
  </button>`,
})

export class ButtonDragComponent implements IComponent {
  canvas: ElementRef;
  props: IProperty = {
    key: '',
    id: '',
    value: 'Button',
    class: '',
    style: '',
    typeObj: 'buttonDrag',
    type: 'button',
  };

  @Output() updateDataEvent= new EventEmitter<any>();
  @Output() updateDataEventY= new EventEmitter<any>();
  @Input() xcanvas: any;
  @Input() ycanvas: any;
  @Input() xmouse: any;
  @Input() ymouse: any;
  mousePositionXV2 = 310;
  mousePositionYV2= 110;
  theX = 0;
  theY = 0;
  dagaX = 0;
  dagaY = 0;
  onetimeBool = true;

  ngOnInit(): void {
    //this.drag.createDrag(this.ref).withBoundaryElement(this.canvas);
    this.theX = this.xcanvas;
    this.theY = this.ycanvas;
    this.props.style='position:absolute;left:'+this.xmouse+';top:'+this.ymouse+'px;';
    this.dagaX = this.xmouse;
    this.dagaY = this.ymouse;
  }

  onDragEnded($event: CdkDragEnd){
   /* const { offsetLeft, offsetTop } = event.source.element.nativeElement;
    const { x, y } = event.distance;
    this.mousePositionXV2 = offsetLeft + x;
    this.mousePositionYV2 = offsetTop + y;*/
    this.mousePositionXV2 = $event.source.getFreeDragPosition().x;
    this.mousePositionYV2 = $event.source.getFreeDragPosition().y;
    if(this.onetimeBool == true)
    {
      this.updateDataEvent.emit(this.mousePositionXV2);
      this.updateDataEventY.emit(this.mousePositionYV2);
      console.log(this.theX);
      this.onetimeBool = false;
    }
    else
    {
      this.updateDataEvent.emit(this.mousePositionXV2);
      this.updateDataEventY.emit(this.mousePositionYV2);
    }
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
  
}
