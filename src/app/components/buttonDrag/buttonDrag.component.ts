import { Target } from '@angular/compiler';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';
import { IMouse } from '../../interfaces/imouse';

@Component({
  selector: 'app-buttonDrag',
  template: `<button cdkDrag cdkDragBoundary="#canvas" [id]="props.id" [style]="props.style" [type]="props.type"
  (mousedown)="rawr()">
    {{ props.value }}
  </button>`,
})

export class ButtonDragComponent implements IComponent  {
  canvas: ElementRef;
  props: IProperty = {
    key: '',
    id: '',
    value: 'ButtonX',
    class: '',
    style: '',
    typeObj: 'buttonDrag',
    type: 'button',
  };

  constructor(canvas: ElementRef) {
    this.canvas = canvas;
    let date = Date.now();
    this.props.key = date.toString();
    this.props.id = 'button' + date.toString();
  }
  rawr(){

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

