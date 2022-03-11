import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';

@Component({
  selector: 'app-textboxDrag',
  styleUrls: ['./textboxDrag.component.css'],
  template: `<textarea cdkDrag cdkDragBoundary="#canvas" [id]="props.id" [style]="props.style"
   [placeholder]="props.placeholder" [rows]="props.rows" [class]="props.class"
    [cols]="props.cols"
    (cdkDragEnded)="onDragEnded($event)"
    [cdkDragDisabled]="!props.draggable"
    [ngStyle]="{
      position: 'sticky',
      left: mousePositionLeft + 'px',
      top: mousePositionTop + 'px'
  }" >{{props.value}}</textarea>`
})
export class TextboxDragComponent implements IComponent {
  canvas: ElementRef;
  props: IProperty = {
    key: '',
    id: '',
    value: '',
    class: '',
    style: 'resize: none;',
    typeObj: 'textboxDrag',
    type: 'textbox',
    placeholder: 'Type your text here...',
    rows: 3,
    cols: 20,
    draggable: true,
    selected : false,
    hidden: false,
  mouseDragPositionX:0,
    mouseDragPositionY:0,
  };

  @Input() canvasPositionX: any;
  @Input() canvasPositionY: any;
  @Input() mousePositionX2: any;
  @Input() mousePositionY2: any;
  @Input() whatComponent2: any;
  canvasPositionLeft = 0;
  canvasPositionTop = 0;
  mousePositionLeft = 0;
  mousePositionTop = 0;
  percentageX = 0;
  percentageY = 0;


  ngOnInit(): void {
    this.canvasPositionLeft = this.canvasPositionX;
    this.canvasPositionTop = this.canvasPositionY;
    this.mousePositionLeft = this.mousePositionX2;
    this.mousePositionTop = this.mousePositionY2;
    this.percentageX = ((this.mousePositionX2 - this.canvasPositionLeft) / 1280) * 100;
    this.percentageY = ((this.mousePositionY2 - this.canvasPositionTop) / 720) * 100;
    this.props.mouseDragPositionX = this.percentageX;
    this.props.mouseDragPositionY = this.percentageY;
    this.props.style='resize:none;position:absolute;left:'+this.percentageX+'%;top:'+this.percentageY+'%;';
  }
  ngAfterViewInit()
  {
    setTimeout(() => {

    }, 1);

  }

  onDragEnded($event: CdkDragEnd) {
    this.props.mouseDragPositionX =
    (( $event.source.getFreeDragPosition().x+ this.mousePositionLeft - this.canvasPositionLeft) / 1280)
    * 100;
    this.props.mouseDragPositionY =
    (( $event.source.getFreeDragPosition().y+ this.mousePositionTop - this.canvasPositionTop) / 720)
    * 100;
  }

  constructor(canvas: ElementRef) {
    this.canvas = canvas;
    let date = Date.now();
    this.props.key = date.toString();
    this.props.id = 'textbox' + date.toString();
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
    let tmpHtmlCode = '<textarea';
    if (this.props.id.trim().length > 0) {
      tmpHtmlCode += ' id="' + this.props.id + '"';
    }

    if (this.props.class.trim().length > 0) {
      tmpHtmlCode += ' class="' + this.props.class + '"';
    }

    if (this.props.style.trim().length > 0) {
      tmpHtmlCode += ' style="' + this.props.style + '"';
    }

    if (this.props.placeholder != undefined) {
      tmpHtmlCode += ' placeholder="' + this.props.placeholder + '"';
    }

    if(this.props.rows != undefined){
      tmpHtmlCode += ' rows="' + this.props.rows + '"';
    }

    if(this.props.cols != undefined){
      tmpHtmlCode += ' cols="' + this.props.cols + '"';
    }

    tmpHtmlCode += '>' + this.props.value + '</textarea>';

    return tmpHtmlCode;
  }
}
