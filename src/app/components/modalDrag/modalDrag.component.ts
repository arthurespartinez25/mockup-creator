import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';

@Component({
  selector: 'app-modalDrag',
  templateUrl: './modalDrag.component.html',
  styleUrls: ['./modalDrag.component.css']
})
export class ModalDragComponent implements IComponent {
  canvas: ElementRef;
  props: IProperty = {
    key: '',
    id: '',
    value: 'Hi, I am your Modal',
    class: '',
    style: '',
    typeObj: 'modalDrag',
    type: '',
    draggable: true,
    selected : false,
    hidden: false,
    finalStyle:''
  };

  @Output() updateDataEvent = new EventEmitter<any>();
  @Output() updateDataEventY = new EventEmitter<any>();
  @Input() canvasPositionX: any;
  @Input() canvasPositionY: any;
  @Input() mousePositionX2: any;
  @Input() mousePositionY2: any;
  @Input() whatComponent2: any;
  mousePositionDropX = 310;
  mousePositionDropY = 110;
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
    this.props.style =
          'position:sticky;left:' +
          this.percentageX +
          '%;top:' +
          this.percentageY +
          '%;';
  }

  onDragEnded($event: CdkDragEnd) {
    this.mousePositionDropX = $event.source.getFreeDragPosition().x;
    this.mousePositionDropY = $event.source.getFreeDragPosition().y;
    this.updateDataEvent.emit(
      ((this.mousePositionDropX + this.mousePositionLeft - this.canvasPositionLeft) / 1280) * 100
    );
    this.updateDataEventY.emit(
      ((this.mousePositionDropY + this.mousePositionTop - this.canvasPositionTop) / 720) * 100
    );
  }

  constructor(canvas: ElementRef) {
    this.canvas = canvas;
    let date = Date.now();
    this.props.key = date.toString();
    this.props.id = 'modal' + date.toString();
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
    let tmpHtmlCode = '\n<!-- Start of Modal -->\n'
    + '<div>\n\t<div>\n\t\t<div'
    
    if (this.props.style.trim().length > 0) {
      tmpHtmlCode += ' style="' + this.props.style + '"';
    }

    tmpHtmlCode += '>' + '\n\t\t\t<div>\n\t\t\t\t' 
    + '<div>\n\t\t\t\t\t<h5>Header</h5>\n\t\t\t\t\t<button class="btn btn-close"></button>\n\t\t\t\t</div>'
    + '\n\t\t\t\t<div>\n\t\t\t\t\t<p';
    if (this.props.id.trim().length > 0) {
      tmpHtmlCode += ' id="' + this.props.id + '"';
    }

    if (this.props.type.trim().length > 0) {
      tmpHtmlCode += ' type="' + this.props.type + '"';
    }

    if (this.props.class.trim().length > 0) {
      tmpHtmlCode += ' class="' + this.props.class + '"';
    }

    tmpHtmlCode += '>' + this.props.value + '</p>\n\t\t\t\t</div>\n\t\t\t\t<div>' 
      + '\n\t\t\t\t\t<button class="btn-secondary">Close</button>\n\t\t\t\t</div>'
      + '\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n'
      + '<!-- End of Modal -->\n';

    return tmpHtmlCode;
  }
}
