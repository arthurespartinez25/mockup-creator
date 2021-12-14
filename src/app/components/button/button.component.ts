import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, ComponentRef, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';

@Component({
  selector: 'app-button',
  template: `<button cdkDrag cdkDragBoundary="#canvas"
  (cdkDragEnded)="onDragEnded($event)"  [id]="props.id" [style]="props.style" [type]="props.type">
    {{ props.value }}
  </button>{{mousePositionXV2}}`,
})

export class ButtonComponent implements IComponent {
  @Output() x1 = new EventEmitter<number>();
  @Output() y1 = new EventEmitter<number>();
  canvas: ElementRef;
  props: IProperty = {
    key: '',
    id: '',
    value: 'Button',
    class: '',
    style: '',
    typeObj: 'button',
    type: 'button',
  };

  mousePositionXV2 = 110;
  mousePositionYV2= 110;

  
  

  onDragEnded($event: any){
    //const { offsetLeft, offsetTop } = event.source.element.nativeElement;
    //const { x, y } = event.distance;
    this.mousePositionXV2 = $event.source.getFreeDragPosition().x;
    this.mousePositionYV2 = $event.source.getFreeDragPosition().y;
    this.x1.emit(this.mousePositionXV2);
    this.y1.emit(this.mousePositionYV2);
}
  getX(){
    return this.mousePositionXV2;
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
    let tmpHtmlCode = '<button';
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

    tmpHtmlCode += '>' + this.props.value + '</button>';

    return tmpHtmlCode;
  }
}
