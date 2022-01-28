import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';

@Component({
  selector: 'app-datepickerDrag',
  //templateUrl: './datepicker.component.html',
  styleUrls: ['./datepickerDrag.component.css'],
  template: `<input cdkDrag cdkDragBoundary="#canvas" [type]="props.type" [id]="props.id" 
  [value]="props.value" [class]="props.class" [style]="props.style" 
  (change)="dateValue($event)"
  (cdkDragEnded)="onDragEnded($event)" 
  [ngStyle]="{
    position: 'sticky',
    left: mousePositionLeft + 'px',
    top: mousePositionTop + 'px',
    'border-color' : props.selected == true ? 'red': (props.selected == false ? 'none': null),
    'border-style' : props.selected == true ? 'solid': (props.selected == false ? 'none': null),
    'border-width' : props.selected == true ? '1px': (props.selected == false ? '0px': null)
  }" >`
})
export class DatepickerDragComponent implements OnInit,IComponent {
  canvas: ElementRef;
  props: IProperty = {
    key: '',
    id: '',
    value: '2021-12-25',
    class: '',
    style: '',
    typeObj: 'datepickerDrag',
    type: 'date',
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
    let today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    this.props.value = yyyy + '-' + mm + '-' + dd;
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
    this.props.id = 'date' + date.toString();
  }


  @Input() get property(): IProperty {
    return this.props;
  }

  set property(value: IProperty) {
    if (value) {
      this.props = value;
    }
  }

  dateValue(val: any){
    this.props.value = val.target.value;
  }
  
  get htmlCode(): string {
    let tmpHtmlCode = '<input';
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

    if(this.props.value.trim().length > 0){
      tmpHtmlCode += ' value="' + this.props.value + '"';
    }

    //tmpHtmlCode += '>' + this.props.value + '</input>';
    tmpHtmlCode += '>';

    return tmpHtmlCode;
  }
}