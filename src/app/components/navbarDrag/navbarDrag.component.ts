import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';

@Component({
  selector: 'app-navbarDrag',
  templateUrl: './navbarDrag.component.html',
  styleUrls: ['./navbarDrag.component.css'],
})
export class NavbarDragComponent implements IComponent {
  canvas: ElementRef<any>;
  props: IProperty = {
    key: '',
    id: '',
    value: 'Nav',
    class: '',
    style: `color: white;
    padding: 10px;
    background-color: #12355B;
    font-size: 20px;`,
    typeObj: 'navDrag',
    type: '',
  };
  
  @Input() canvasWW: any;
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
  theCanvasWidth = 0;

  ngOnInit(): void {
    //this.drag.createDrag(this.ref).withBoundaryElement(this.canvas);
    this.theX = this.xcanvas;
    this.theY = this.ycanvas;
    this.theCanvasWidth = this.canvasWW;
    this.dagaX = this.xmouse;
    this.dagaY = this.ymouse;
    this.props.style='color: white;padding: 10px;background-color: #12355B;font-size: 20px;position:absolute;left:'
    +(this.dagaX-this.theX)+'px;top:'+(this.dagaY-this.theY)+'px;';
  }

  onDragEnded($event: any){
    this.mousePositionXV2 = $event.source.getFreeDragPosition().x;
    this.mousePositionYV2 = $event.source.getFreeDragPosition().y;
    
    this.updateDataEvent.emit(this.mousePositionXV2 + this.dagaX - this.theX);
    this.updateDataEventY.emit(this.mousePositionYV2 + this.dagaY - this.theY);
    console.log(this.theCanvasWidth);
  }

  constructor(canvas: ElementRef) {
    this.canvas = canvas;
    let date = Date.now();
    this.props.key = date.toString();
    this.props.id = 'nav' + date.toString();
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
    let htmlCode = `<nav`;

    if (this.props.id.trim().length > 0) {
      htmlCode += ' id="' + this.props.id + '"';
    }

    if (this.props.class.trim().length > 0) {
      htmlCode += ' class="' + this.props.class + '"';
    }

    if (this.props.style.trim().length > 0) {
      htmlCode += ' style="' + this.props.style + '"';
    }

    htmlCode += '>' + this.props.value + '</nav>';

    return htmlCode;
  }
}
