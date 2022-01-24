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
    class: 'lead',
    style: 'color: red;',
    typeObj: 'paragraphDrag',
    type: '',
    draggable: true,
    selected : false,
  };

  @Output() updateDataEvent = new EventEmitter<any>();
  @Output() updateDataEventY = new EventEmitter<any>();
  @Input() xcanvas: any;
  @Input() ycanvas: any;
  @Input() xmouse: any;
  @Input() ymouse: any;
  @Input() whatComponent2: string;
  mousePositionXV2 = 310;
  mousePositionYV2 = 110;
  theX = 0;
  theY = 0;
  dagaX = 0;
  dagaY = 0;
  onetimeBool = true;
  percentageX = 0;
  percentageY = 0;

  ngOnInit(): void {
    this.theX = this.xcanvas;
    this.theY = this.ycanvas;
    this.dagaX = this.xmouse;
    this.dagaY = this.ymouse;
    this.percentageX = ((this.xmouse - this.theX) / 1280) * 100;
    this.percentageY = ((this.ymouse - this.theY) / 720) * 100;

    switch (this.whatComponent2) {
      case 'HPP1':
        this.props.style = `width:200px;
        color: white;
        font-size: 10px;position:absolute;left:84%;top:1.0416666666666665%;`;
        this.props.value = `All customers are required to use face masks and be fully vaccinated.`;
        break;
      case 'HPP2':
        this.props.style = `color: black;
        font-family: Georgia,  serif;
        width: 240px;
        font-size: 15px;
        letter-spacing: 0.1em;
        text-decoration: none;`;
        this.props.value = `Monday to Friday:`;
        break;
      case 'HPP3':
        this.props.style = `color: black;
        font-family: Georgia,  serif;
        width: 240px;
        font-size: 15px;
        letter-spacing: 0.1em;
        text-decoration: none;`;
        this.props.value = `Saturday to Sunday:`;
        break;
      case 'HPP4':
        this.props.style = `color: black;
        font-family: Georgia,  serif;
        width: 240px;
        font-size: 15px;
        letter-spacing: 0.1em;
        text-decoration: none;`;
        this.props.value = `For Reservations:`;
        break;
      case 'HPP5':
        this.props.style = `color: black;
        font-family: Georgia,  serif;
        width: 240px;
        font-size: 20px;
        letter-spacing: 0.1em;
        text-decoration: none;`;
        this.props.value = `12:00pm - 10:00pm`;
        break;
      case 'HPP6':
        this.props.style = `color: black;
        font-family: Georgia,  serif;
        width: 240px;
        font-size: 20px;
        letter-spacing: 0.1em;
        text-decoration: none;`;
        this.props.value = `2:00pm to 12:00am`;
        break;
      case 'HPP7':
        this.props.style = `color: black;
        font-family: Georgia,  serif;
        width: 240px;
        font-size: 20px;
        letter-spacing: 0.1em;
        text-decoration: none;`;
        this.props.value = `341-987-69`;
        break;
      case 'HPP8':
        this.props.style = `width:200px;
        color: white;
        font-size: 10px;`;
        this.props.value = `All customers are required to use face masks and be fully vaccinated.`;
        break;

      default:
        this.props.style =
          'color:red;position:absolute;left:' +
          this.percentageX +
          '%;top:' +
          this.percentageY +
          '%;';
        break;
    }
  }

  onDragEnded($event: CdkDragEnd) {
    this.mousePositionXV2 = $event.source.getFreeDragPosition().x;
    this.mousePositionYV2 = $event.source.getFreeDragPosition().y;
    this.updateDataEvent.emit(
      ((this.mousePositionXV2 + this.dagaX - this.theX) / 1280) * 100
    );
    this.updateDataEventY.emit(
      ((this.mousePositionYV2 + this.dagaY - this.theY) / 720) * 100
    );
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
      tmpHtmlCode += ' style="' + this.props.style + '"';
    }

    tmpHtmlCode += '>' + this.props.value + '</p>';

    return tmpHtmlCode;
  }
}
