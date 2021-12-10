import { Component, ElementRef, Input, OnInit } from '@angular/core';
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
  };

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
