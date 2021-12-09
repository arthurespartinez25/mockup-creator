import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements IComponent {
  canvas: ElementRef<any>;
  props: IProperty = {
    key: '',
    id: '',
    value: 'Nav',
    class: '',
    style: `color: white;
    padding: 10px;
    background-color: #12355B;
    font-size: 20px`,
    typeObj: 'nav',
    type: '',
  };

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
    let htmlCode = `<nav`;

    if (this.props.id.trim().length > 0) {
      htmlCode += ' id="' + this.props.id + '"';
    }

    if (this.props.class.trim().length > 0) {
      htmlCode += ' class="' + this.props.class + '"';
    }

    if (this.props.style.trim().length > 0) {
      htmlCode += ' style="' + this.props.style + '"';
    }

    htmlCode += '>' + this.props.value + '</nav>';

    return htmlCode;
  }
}
