import { ElementRef } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';

@Component({
  selector: 'app-popupDrag',
  styleUrls: ['./popupDrag.component.css'],
  template: `<button cdkDrag cdkDragBoundary="#canvas" [cdkDragDisabled]="!props.draggable" [id]="props.id" [style]="props.style" [type]="props.type">
  {{ props.value }}
  </button>`
})
export class PopupDragComponent implements IComponent {

  canvas: ElementRef;
  props: IProperty = {
    key: '',
    id: '',
    value: 'Popup',
    class: '',
    style: '',
    typeObj: 'popupDrag',
    type: 'button',
    content: "Popup text here...",
    draggable: true,
    selected : false,
    finalStyle:''
  };

  constructor(canvas: ElementRef) {
    this.canvas = canvas;
    let date = Date.now();
    this.props.key = date.toString();
    this.props.id = 'popup' + date.toString();
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

    tmpHtmlCode += ' data-bs-toggle="' + "popover" + '"';

    if (this.props.content != undefined) {
      tmpHtmlCode += ' data-bs-content="' + this.props.content + '"';
    }

    tmpHtmlCode += '>' + this.props.value + '</button>';

    return tmpHtmlCode;
  }

}
