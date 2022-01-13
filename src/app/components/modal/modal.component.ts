import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements IComponent {
  canvas: ElementRef;
  props: IProperty = {
    key: '',
    id: '',
    value: 'Hi, I am your Modal',
    class: '',
    style: '',
    typeObj: 'modal',
    type: '',
  };

  @Output() updateDataEvent= new EventEmitter<any>();
  @Output() updateDataEventY= new EventEmitter<any>();
  @Input() xcanvas: any;
  @Input() ycanvas: any;
  mousePositionXV2 = 310;
  mousePositionYV2= 110;
  theX = 0;
  theY = 0;

  ngOnInit(): void {
    //this.drag.createDrag(this.ref).withBoundaryElement(this.canvas);
    this.theX = this.xcanvas;
    this.theY = this.ycanvas;
    
  }

  onDragEnded($event: any){
    this.mousePositionXV2 = $event.source.getFreeDragPosition().x;
    this.mousePositionYV2 = $event.source.getFreeDragPosition().y;
    
    this.updateDataEvent.emit(this.mousePositionXV2);
    this.updateDataEventY.emit(this.mousePositionYV2);
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
