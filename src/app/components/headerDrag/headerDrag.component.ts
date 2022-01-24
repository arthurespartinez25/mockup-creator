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
  };

  @Input() get property(): IProperty {
    return this.props;
  }

  set property(value: IProperty) {
    if (value) {
      this.props = value;
    }
  }

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
  percentageX = 0;
  percentageY = 0;

  ngOnInit(): void {
    this.theX = this.xcanvas;
    this.theY = this.ycanvas;
    this.dagaX = this.xmouse;
    this.dagaY = this.ymouse;
    this.percentageX = ((this.xmouse - this.theX) / 1280) * 100;
    this.percentageY = ((this.ymouse - this.theY) / 720) * 100;
    if (this.whatComponent2 == 'loginHeader') {
      this.props.value = 'Welcome!';
      this.props.style =
        'text-transform:uppercase;color:black;position:absolute;left:' +
        this.percentageX +
        '%;top:' +
        this.percentageY +
        '%;';
    } else if (this.whatComponent2 == 'searchHeader') {
      this.props.value = 'error message to reflect here';
      this.props.style =
        'color:red;position:absolute;font-size: medium;left:' +
        this.percentageX +
        '%;top:' +
        this.percentageY +
        '%;';
    } else {
      this.props.style =
        'color:red;position:absolute;left:' +
        this.percentageX +
        '%;top:' +
        this.percentageY +
        '%;';
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
      tmpHtmlCode += ' style="' + this.props.style + '"';
    }

    tmpHtmlCode += '>' + this.props.value + '</h1>';

    return tmpHtmlCode;
  }
}
