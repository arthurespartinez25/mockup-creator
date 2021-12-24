import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';

@Component({
  selector: 'app-checkboxDrag',
  templateUrl: './checkboxDrag.component.html',
  styleUrls: ['./checkboxDrag.component.css']
})
export class CheckboxDragComponent implements OnInit, IComponent {
  canvas: ElementRef;
  props: IProperty = {
    key: '',
    id: '',
    value: 'Checkbox',
    class: 'form-check-input',
    style: 'cursor: pointer;',
    typeObj: 'checkboxDrag',
    type: 'checkbox',
    checked: 'true',
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
    this.theX = this.xcanvas;
    this.theY = this.ycanvas;
    this.dagaX = this.xmouse;
    this.dagaY = this.ymouse;
    this.props.style='cursor: pointer;position:sticky;left:'+(this.dagaX-this.theX)+';top:'+(this.dagaY-this.theY)+'px;';
  }

  onDragEnded($event: CdkDragEnd){
    this.mousePositionXV2 = $event.source.getFreeDragPosition().x;
    this.mousePositionYV2 = $event.source.getFreeDragPosition().y;
    this.updateDataEvent.emit(this.mousePositionXV2 + this.dagaX - this.theX);
    this.updateDataEventY.emit(this.mousePositionYV2 + this.dagaY - this.theY);
    console.log(this.mousePositionXV2);
    console.log(this.mousePositionYV2);
  }

  constructor(canvas: ElementRef) {
    this.canvas = canvas;
    let date = Date.now();
    this.props.key = date.toString();
    this.props.id = 'checkbox' + date.toString();
   }
   
   @Input() get property(): IProperty {
    return this.props;
  }

  set property(value: IProperty) {
    if (value) {
      this.props = value;
    }
  }

  isChecked(event) {
    if ( event.target.checked ) {
      this.props.checked = "true";
      console.log(this.props.checked);
    }
    else {
      this.props.checked = "false";
      console.log(this.props.checked);
    }
  }

  get htmlCode(): string {
    let tmpHtmlCode = '<div';
    tmpHtmlCode += ' class="form-check" id="' + this.props.id + '">';
    if (this.props.checked == "true") {
      tmpHtmlCode +="\n" + ' <input id="'+ this.props.id + ' class="' +  this.props.class + '" type="' +  this.props.type + '" style="' + this.props.style + '" id="flexCheckDefault" checked>';
    }
    else {
      tmpHtmlCode +="\n" + ' <input id="'+ this.props.id + ' class="' +  this.props.class + '" type="' +  this.props.type + '" style="' + this.props.style + '" id="flexCheckDefault">';
    }
    tmpHtmlCode +="\n" + ' <label class="form-check-label" for="flexCheckDefault"> ' + this.props.value + ' </label>';
    tmpHtmlCode +="\n" + ' </div>';
    

    return tmpHtmlCode;
  }

 

}
