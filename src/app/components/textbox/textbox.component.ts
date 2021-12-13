import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';

@Component({
  selector: 'app-textbox',
  template: `<textarea cdkDrag cdkDragBoundary="#canvas" [id]="props.id" [style]="props.style" [placeholder]="props.placeholder" [rows]="props.rows" [cols]="props.cols">{{props.value}}</textarea>`
})
export class TextboxComponent implements IComponent {
  canvas: ElementRef;
  props: IProperty = {
    key: '',
    id: '',
    value: '',
    class: '',
    style: '',
    typeObj: 'textbox',
    type: 'textbox',
    placeholder: 'Type your text here...',
    rows: 3,
    cols: 20
  };
  constructor(canvas: ElementRef) {
    this.canvas = canvas;
    let date = Date.now();
    this.props.key = date.toString();
    this.props.id = 'textbox' + date.toString();
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
    let tmpHtmlCode = '<textarea';
    if (this.props.id.trim().length > 0) {
      tmpHtmlCode += ' id="' + this.props.id + '"';
    }

    if (this.props.class.trim().length > 0) {
      tmpHtmlCode += ' class="' + this.props.class + '"';
    }

    if (this.props.style.trim().length > 0) {
      tmpHtmlCode += ' style="' + this.props.style + '"';
    }

    if (this.props.placeholder != undefined) {
      tmpHtmlCode += ' placeholder="' + this.props.placeholder + '"';
    }

    tmpHtmlCode += '>' + this.props.value + '</textarea>';

    return tmpHtmlCode;
  }
}
