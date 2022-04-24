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
  selector: 'app-paragraphDrag',
  templateUrl: './paragraphDrag.component.html',
  styleUrls: ['./paragraphDrag.component.css'],
})
export class ParagraphDragComponent implements OnInit, IComponent {
  canvas: ElementRef;
  props: IProperty = {
    key: '',
    id: '',
    value: 'Paragraph',
    class: '',
    style: 'color: red;',
    typeObj: 'paragraphDrag',
    type: '',
    draggable: true,
    selected : false,
    hidden: false,
    mouseDragPositionX:0,
    mouseDragPositionY:0,
    finalStyle: '',
    isSavedComponent: false
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

      switch (this.whatComponent2) {
        case 'HPP1':
          this.props.style = 'width:200px;color: white;font-size: 10px;position:absolute;left:' +
          this.percentageX +
          '%;top:' +
          this.percentageY
          +'%;';
          this.props.value = `All customers are required to use face masks and be fully vaccinated.`;
          this.props.finalStyle = this.props.style;
          break;
        case 'HPP2':
          this.props.style = `color: black;
          font-family: Georgia,  serif;
          width: 240px;
          font-size: 15px;
          letter-spacing: 0.1em;
          text-decoration: none;`
          +'position:absolute;left:' +
          this.percentageX +
          '%;top:' +
          this.percentageY
          +'%;';
          this.props.value = `Monday to Friday:`;
          this.props.finalStyle = this.props.style;
          break;
        case 'HPP3':
          this.props.style = `color: black;
          font-family: Georgia,  serif;
          width: 240px;
          font-size: 15px;
          letter-spacing: 0.1em;
          text-decoration: none;`
          +'position:absolute;left:' +
          this.percentageX +
          '%;top:' +
          this.percentageY
          +'%;';
          this.props.value = `Saturday to Sunday:`;
          this.props.finalStyle = this.props.style;
          break;
        case 'HPP4':
          this.props.style = `color: black;
          font-family: Georgia,  serif;
          width: 240px;
          font-size: 15px;
          letter-spacing: 0.1em;
          text-decoration: none;`
          +'position:absolute;left:' +
          this.percentageX +
          '%;top:' +
          this.percentageY
          +'%;';
          this.props.value = `For Reservations:`;
          this.props.finalStyle = this.props.style;
          break;
        case 'HPP5':
          this.props.style = `color: black;
          font-family: Georgia,  serif;
          width: 240px;
          font-size: 20px;
          letter-spacing: 0.1em;
          text-decoration: none;`
          +'position:absolute;left:' +
          this.percentageX +
          '%;top:' +
          this.percentageY
          +'%;';
          this.props.value = `12:00pm - 10:00pm`;
          this.props.finalStyle = this.props.style;
          break;
        case 'HPP6':
          this.props.style = `color: black;
          font-family: Georgia,  serif;
          width: 240px;
          font-size: 20px;
          letter-spacing: 0.1em;
          text-decoration: none;`
          +'position:absolute;left:' +
          this.percentageX +
          '%;top:' +
          this.percentageY
          +'%;';
          this.props.value = `2:00pm to 12:00am`;
          this.props.finalStyle = this.props.style;
          break;
        case 'HPP7':
          this.props.style = `color: black;
          font-family: Georgia,  serif;
          width: 240px;
          font-size: 20px;
          letter-spacing: 0.1em;
          text-decoration: none;`
          +'position:absolute;left:' +
          this.percentageX +
          '%;top:' +
          this.percentageY
          +'%;';
          this.props.value = `341-987-69`;
          this.props.finalStyle = this.props.style;
          break;
        case 'HPP8':
          this.props.style = `width:200px;
          color: white;
          font-size: 10px;`
          +'position:absolute;left:' +
          this.percentageX +
          '%;top:' +
          this.percentageY
          +'%;';
          this.props.value = `All customers are required to use face masks and be fully vaccinated.`;
          this.props.finalStyle = this.props.style;
          break;

        default:
          this.props.style =
            'font-size:1rem;color:red;position:absolute;left:' +
            this.percentageX +
            '%;top:' +
            this.percentageY +
            '%;';
          this.props.finalStyle=this.props.style;
          break;
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
    this.props.id = 'paragraph' + date.toString();
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
    let tmpHtmlCode = '<p';
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
      tmpHtmlCode += ' style="' + this.props.finalStyle + '"';
    }

    tmpHtmlCode += '>' + this.props.value + '</p>';

    return tmpHtmlCode;
  }
}
