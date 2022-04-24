import { CdkDragEnd } from '@angular/cdk/drag-drop';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';

@Component({
  selector: 'app-headerDrag',
  templateUrl: './headerDrag.component.html',
  styleUrls: ['./headerDrag.component.css'],
})
export class HeaderDragComponent implements OnInit, IComponent {
  canvas: ElementRef;
  props: IProperty = {
    key: '',
    id: '',
    value: 'Text Here',
    class: '',
    style: '',
    typeObj: 'headerDrag',
    type: '',
    draggable: true,
    selected : false,
    hidden: false,
    mouseDragPositionX:0,
    mouseDragPositionY:0,
    finalStyle: '',
    isSavedComponent: false
  };

  @Input() get property(): IProperty {
    return this.props;
  }

  set property(value: IProperty) {
    if (value) {
      this.props = value;
    }
  }

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
    if(this.props.isSavedComponent){
      this.mousePositionLeft = (this.props.mouseDragPositionX/100)*1280;
      this.mousePositionTop = (this.props.mouseDragPositionY/100)*720;
    }
    if(!this.props.isSavedComponent){
      this.canvasPositionLeft = this.canvasPositionX;
      this.canvasPositionTop = this.canvasPositionY;
      this.mousePositionLeft = this.mousePositionX2;
      this.mousePositionTop = this.mousePositionY2;
      this.percentageX = ((this.mousePositionX2 - this.canvasPositionLeft) / 1280) * 100;
      this.percentageY = ((this.mousePositionY2 - this.canvasPositionTop) / 720) * 100;
      this.props.mouseDragPositionX = this.percentageX;
      this.props.mouseDragPositionY = this.percentageY;
      if (this.whatComponent2 == 'loginHeader') {
        this.props.value = 'Welcome!';
        this.props.style =
          'text-transform:uppercase;color:black;position:absolute;left:' +
          this.percentageX +
          '%;top:' +
          this.percentageY +
          '%;';
        this.props.finalStyle = this.props.style;
      } else if (this.whatComponent2 == 'searchHeader') {
        this.props.value = 'error message to reflect here';
        this.props.style =
          'color:red;position:absolute;font-size: medium;left:' +
          this.percentageX +
          '%;top:' +
          this.percentageY +
          '%;';
        this.props.finalStyle = this.props.style;
      } else {
        this.props.style =
          'width:150px;color:red;position:absolute;left:' +
          this.percentageX +
          '%;top:' +
          this.percentageY +
          '%;';
        this.props.finalStyle=this.props.style;
      }
    }
  }
  onDragEnded($event: CdkDragEnd) {
    this.props.finalStyle=this.props.style;
    let regexPosition = /;top(.+?);/g;
    let regexPosition2 = /;left(.+?);/g;
    this.props.mouseDragPositionX =
    (( $event.source.getFreeDragPosition().x+ this.mousePositionLeft - this.canvasPositionLeft) / 1280) 
    * 100;
    this.props.mouseDragPositionY =
    (( $event.source.getFreeDragPosition().y+ this.mousePositionTop - this.canvasPositionTop) / 720) 
    * 100;
    this.props.finalStyle=this.props.finalStyle.replace(regexPosition, ';top:'+this.props.mouseDragPositionY+'%;');
    this.props.finalStyle=this.props.finalStyle.replace(regexPosition2, ';left:'+this.props.mouseDragPositionX+'%;');
  }

  constructor(canvas: ElementRef) {
    this.canvas = canvas;
    let date = Date.now();
    this.props.key = date.toString();
    this.props.id = 'header' + date.toString();
  }
  get htmlCode(): string {
    let tmpHtmlCode = '<h1';
    if (this.props.id.trim().length > 0) {
      tmpHtmlCode += ' id="' + this.props.id + '"';
    }

    if (this.props.class.trim().length > 0) {
      tmpHtmlCode += ' class="' + this.props.class + '"';
    }

    if (this.props.style.trim().length > 0) {
      tmpHtmlCode += ' style="' + this.props.finalStyle +'"';
    }

    tmpHtmlCode += '>' + this.props.value + '</h1>';

    return tmpHtmlCode;
  }
}
