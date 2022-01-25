import { CdkDragEnd } from '@angular/cdk/drag-drop';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';

@Component({
  selector: 'app-navbarDrag',
  templateUrl: './navbarDrag.component.html',
  styleUrls: ['./navbarDrag.component.css'],
})
export class NavbarDragComponent implements OnInit, IComponent {
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
    draggable: true,
    selected : false,
    hidden: false,
  };

  @Input() canvasWW: any;
  @Output() updateDataEvent = new EventEmitter<any>();
  @Output() updateDataEventY = new EventEmitter<any>();
  @Input() xcanvas: any;
  @Input() ycanvas: any;
  @Input() xmouse: any;
  @Input() ymouse: any;
  @Input() whatComponent2: any;
  mousePositionXV2 = 310;
  mousePositionYV2 = 110;
  theX = 0;
  theY = 0;
  dagaX = 0;
  dagaY = 0;
  onetimeBool = true;
  theCanvasWidth = 0;
  percentageX = 0;
  percentageY = 0;

  ngOnInit(): void {
    //this.drag.createDrag(this.ref).withBoundaryElement(this.canvas);
    this.theX = this.xcanvas;
    this.theY = this.ycanvas;
    this.theCanvasWidth = this.canvasWW;
    this.dagaX = this.xmouse;
    this.dagaY = this.ymouse;
    this.percentageX = ((this.xmouse - this.theX) / 1280) * 100;
    this.percentageY = ((this.ymouse - this.theY) / 720) * 100;
    if (this.percentageX < 0){
      this.percentageX = 0;
    }
    if (this.percentageY < 0){
      this.percentageY = 0;
    }
    if (this.whatComponent2 == 'searchNavbar') {
      this.props.value = 'AWS';
      this.props.style =
        'width: 100%; color: white;padding: 10px;background-color: #12355B;font-size: 20px;left:' +
        this.percentageX +
        '%;top:' +
        this.percentageY +
        '%;';
    } else if (this.whatComponent2 == 'HPNav1') {
      this.props.style = `width: 100%; 
      height: 100px;
      color: white;
      padding: 10px;
      background-color: #000;
      font-size: 20px;
      border-bottom: 1px solid  white;
      position:absolute;left:`+this.percentageX+`%;top:`+this.percentageY+`%;`;
      this.props.value = '';
    } else if (this.whatComponent2 == 'HPNav2') {
      this.props.style = `width: 100%; 
      color: white;
      padding: 10px;
      background-color: #000;
      font-size: 10px;
      border-bottom: 1px dotted  white;
      position:absolute;left:`+this.percentageX+`%;top:`+this.percentageY+`%;`;
      this.props.value = `50% OFF  OUR A LA CARTE MENU IN FEBRUARY!`;
    } else if (this.whatComponent2 == 'HPNav3') {
      this.props.style = `width: 100%; 
      height: 140px;
      color: white;
      padding: 10px;
      background-color: #000;
      font-size: 20px;
      border-bottom: 1px solid  white;
      position:absolute;left:`+this.percentageX+`%;top:`+this.percentageY+`%;`;
      this.props.value = ``;
    } else {
      this.props.style =
        'position:absolute;width:' +
        this.theCanvasWidth +
        'color: white;padding: 10px;background-color: #12355B;font-size: 20px;left:0%;top:' +
        this.percentageY +
        '%;';
    }
  }

  onDragEnded($event: any) {
    this.mousePositionXV2 = $event.source.getFreeDragPosition().x;
    this.mousePositionYV2 = $event.source.getFreeDragPosition().y;

    this.updateDataEvent.emit(0);
    this.updateDataEventY.emit(
      ((this.mousePositionYV2 + this.dagaY - this.theY) / 720) * 100
    );
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
