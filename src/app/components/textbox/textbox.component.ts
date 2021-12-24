import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';

@Component({
  selector: 'app-textbox',
  template: `<textarea cdkDrag cdkDragBoundary="#canvas" 
  [(ngModel)]="textInput" [id]="props.id" [style]="props.style" 
  [placeholder]="props.placeholder" [rows]="props.rows" 
  [cols]="props.cols" [value]="props.value"
  (cdkDragEnded)="onDragEnded($event)"
  ></textarea>`
})
export class TextboxComponent implements IComponent {
  canvas: ElementRef;
  props: IProperty = {
    key: '',
    id: '',
    value: '',
    class: '',
    style: 'position:absolute;left:0px;top:0px;',
    typeObj: 'textbox',
    type: 'textbox',
    placeholder: 'Type your text here...',
    rows: 3,
    cols: 20
  };

  @Output() updateDataEvent= new EventEmitter<any>();
  @Output() updateDataEventY= new EventEmitter<any>();
  @Input() xcanvas: any;
  @Input() ycanvas: any;
  mousePositionXV2 = 310;
  mousePositionYV2= 110;
  theX = 0;
  theY = 0;

  ngOnInit(): void {
    //this.drag.createDrag(this.ref).withBoundaryElement(this.canvas);
    this.theX = this.xcanvas;
    this.theY = this.ycanvas;
  }

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

  set textInput(val:string){
    this.props.value = val;
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

    if (this.props.rows != 0){
      tmpHtmlCode += ' rows="' + this.props.rows + '"';
    }

    if (this.props.cols != 0){
      tmpHtmlCode += ' cols="' + this.props.cols + '"';
    }

    tmpHtmlCode += '>' + this.props.value + '</textarea>';

    return tmpHtmlCode;
  }

  changeEvent(event: any){
    this.props.value = event.target.value;
  }
}
