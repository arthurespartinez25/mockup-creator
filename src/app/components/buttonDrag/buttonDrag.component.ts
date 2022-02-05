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
  selector: 'app-buttonDrag',
  styleUrls: ['./buttonDrag.component.css'],  
  template: `<button
    cdkDrag
    cdkDragBoundary="#canvas"
    [cdkDragDisabled]="!props.draggable"
    (cdkDragEnded)="onDragEnded($event)"
    [id]="props.id"
    [style]="props.style"
    [ngStyle]="{
      position: 'sticky',
      left: mousePositionLeft + 'px',
      top: mousePositionTop + 'px',
      'border-color' : props.selected == true ? 'red': (props.selected == false ? 'none': null),
      'border-style' : props.selected == true ? 'solid': (props.selected == false ? 'none': null),
      'border-width' : props.selected == true ? '1px': (props.selected == false ? '0px': null)
    }"
    [type]="props.type"
  >
    {{ props.value }}
  </button>`,
})
export class ButtonDragComponent implements IComponent {
  canvas: ElementRef;
  props: IProperty = {
    key: '',
    id: '',
    value: 'Button',
    class: '',
    style: '',
    typeObj: 'buttonDrag',
    type: 'button',
    draggable: true,
    selected : false,
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
    this.percentageX = ((this.mousePositionX2 - this.canvasPositionLeft));
    this.percentageY = ((this.mousePositionY2 - this.canvasPositionTop));
    this.props.mouseDragPositionX = this.percentageX;
    this.props.mouseDragPositionY = this.percentageY;
    if (this.whatComponent2 == 'LoginButton') {
      this.props.value = 'Login';
      this.props.style =
        'position:absolute;left:' +
        this.percentageX +
        'px;top:' +
        this.percentageY +
        'px;' +
        'width: 20%;max-width: 270px;min-width: 220px; overflow-y: auto;background-color: white;color: black;border-radius: 10px;' +
        'padding: 10px 10px; border: none;font-weight: bolder; font-size: x-large; margin-bottom: 5px;border: solid 1px black; text-transform: uppercase;';
    } else if (this.whatComponent2 == 'SearchButton') {
      this.props.value = 'Search';
      this.props.style =
        'position:absolute;left:' +
        this.percentageX +
        'px;top:' +
        this.percentageY +
        'px;' +
        'background-color: blue;color: white;border-radius: 10px;' +
        'padding: 3px 5px; border: none; font-size: medium; margin-bottom: 5px;';
    } else if (this.whatComponent2 == 'ClearButton') {
      this.props.value = 'Clear';
      this.props.style =
        'position:absolute;left:' +
        this.percentageX +
        'px;top:' +
        this.percentageY +
        'px;' +
        'background-color: gray;color: white;border-radius: 10px;' +
        'padding: 3px 5px; border: none; font-size: medium; margin-bottom: 5px;';
    } else if (this.whatComponent2 == 'HomeButton') {
      this.props.value = 'Home';
      this.props.style =
        'position:absolute;left:' +
        this.percentageX +
        'px;top:' +
        this.percentageY +
        'px;' +
        'background-color: #ADD8E6;color: white;border-radius: 10px;' +
        'padding: 3px 5px; border: none; font-size: medium; margin-bottom: 5px;';
    } else if (this.whatComponent2 == 'ProfileButton') {
      this.props.value = 'Profile';
      this.props.style =
        'position:absolute;left:' +
        this.percentageX +
        'px;top:' +
        this.percentageY +
        'px;' +
        'background-color: #ADD8E6;color: white;border-radius: 10px;' +
        'padding: 3px 5px; border: none; font-size: medium; margin-bottom: 5px;';
    } else {
      this.props.value = 'Button';
      this.props.style =
        'position:absolute;left:' +
        this.percentageX +
        'px;top:' +
        this.percentageY +
        'px;';
    }
  }

  onDragEnded($event: CdkDragEnd) {
    this.props.mouseDragPositionX =
    (( $event.source.getFreeDragPosition().x+ this.mousePositionLeft - this.canvasPositionLeft));
    this.props.mouseDragPositionY =
    (( $event.source.getFreeDragPosition().y+ this.mousePositionTop - this.canvasPositionTop));
  }

  constructor(canvas: ElementRef) {
    this.canvas = canvas;
    let date = Date.now();
    this.props.key = date.toString();
    this.props.id = 'button' + date.toString();
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
    let tmpHtmlCode = '<div><button';
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

    tmpHtmlCode += '>' + this.props.value + '</button></div>';

    return tmpHtmlCode;
  }
}
