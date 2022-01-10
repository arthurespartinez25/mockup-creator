import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';

@Component({
  selector: 'app-headerDrag',
  templateUrl: './headerDrag.component.html',
  styleUrls: ['./headerDrag.component.css']
})
export class HeaderDragComponent implements OnInit, IComponent {
  canvas: ElementRef;
  props: IProperty = {
    key: '',
    id: '',
    value: 'H1 HEADING',
    class: 'h1',
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

  ngOnInit(): void {
  }

}
