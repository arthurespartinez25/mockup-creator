import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';

@Component({
  selector: 'app-headerDrag',
  templateUrl: './headerDrag.component.html',
  styleUrls: ['./headerDrag.component.css']
})
export class HeaderDragComponent implements OnInit, IComponent {
  canvas: ElementRef;
  props: IProperty = {
    key: '',
    id: '',
    value: 'H1 HEADING',
    class: 'h1',
    style: 'color:red;',
    typeObj: 'headerDrag',
    type: '',
  };

  @Input() get property(): IProperty {
    return this.props;
  }

  set property(value: IProperty) {
    if (value) {
      this.props = value;
    }
  }

  @Output() updateDataEvent= new EventEmitter<any>();
  @Output() updateDataEventY= new EventEmitter<any>();
  @Input() xcanvas: any;
  @Input() ycanvas: any;
  @Input() xmouse: any;
  @Input() ymouse: any;
  @Input() whatComponent2:any;
  mousePositionXV2 = 310;
  mousePositionYV2= 110;
  theX = 0;
  theY = 0;
  dagaX = 0;
  dagaY = 0;
  onetimeBool = true;

  ngOnInit(): void {
    console.log(this.whatComponent2);
    this.theX = this.xcanvas;
    this.theY = this.ycanvas;
    this.dagaX = this.xmouse;
    this.dagaY = this.ymouse;
    if(this.whatComponent2=="loginHeader")
    {
      this.props.value = "Login123";
      this.props.style='color:blue;position:absolute;left:'+(this.dagaX-this.theX)+'px;top:'+(this.dagaY-this.theY)+'px;';
    }
    else if(this.whatComponent2=="registerHeader") {
      this.props.value = "Registration Form";
      this.props.style='color:blue;position:absolute;left:'+(this.dagaX-this.theX)+'px;top:'+(this.dagaY-this.theY)+'px;';
    }
    else
    {
      this.props.style='color:red;position:absolute;left:'+(this.dagaX-this.theX)+'px;top:'+(this.dagaY-this.theY)+'px;';
    }
    
  }

  onDragEnded($event: CdkDragEnd){
    this.mousePositionXV2 = $event.source.getFreeDragPosition().x;
    this.mousePositionYV2 = $event.source.getFreeDragPosition().y;
    this.updateDataEvent.emit(this.mousePositionXV2 + this.dagaX - this.theX);
    this.updateDataEventY.emit(this.mousePositionYV2 + this.dagaY - this.theY);
  }

  ngAfterViewInit(){}

  constructor(canvas: ElementRef) { 
    this.canvas = canvas;
    let date = Date.now();
    this.props.key = date.toString();
    this.props.id = 'header' + date.toString();
  }
  get htmlCode(): string {
    let tmpHtmlCode = '<p';
    if (this.props.id.trim().length > 0) {
      tmpHtmlCode += ' id="' + this.props.id + '"';
    }

    if (this.props.class.trim().length > 0) {
      tmpHtmlCode += ' class="' + this.props.class + '"';
    }

    if (this.props.style.trim().length > 0) {
      tmpHtmlCode += ' style="' + this.props.style + '"';
    }

    tmpHtmlCode += '>' + this.props.value + '</p>';

    return tmpHtmlCode;
  }

 
}
