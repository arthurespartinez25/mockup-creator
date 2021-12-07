import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';
import { IMouse } from '../../interfaces/imouse';

@Component({
  selector: 'app-buttonDrag',
  template: `<button [id]="props.id" [style]="props.style" [type]="props.type">
    {{ props.value }}
  </button>`,
})
export class ButtonDragComponent implements IComponent, OnInit  {
  canvas: ElementRef;
  
  @Input() mousePositionX: any;
  @Input() mousePositionY: any;

  mousePosition22X = 0;
  mousePosition22Y= 0;

  mouse: IMouse = {
    xmouse: 0,
    ymouse: 0,
  };
  

  constructor(canvas: ElementRef, mouse: IMouse) {
    this.canvas = canvas;
    let date = Date.now();
    this.props.key = date.toString();
    this.props.id = 'button' + date.toString();
    this.mouse = mouse;
  }

  ngOnInit(){
    this.mousePosition22X = this.mousePositionX;
    this.mousePosition22Y = this.mousePositionY;
  }

  @Input() get property(): IProperty {
    return this.props;
  }

  set property(value: IProperty) {
    if (value) {
      this.props = value;
    }
  }

  @Input() get daga(): IMouse {
    return this.mouse;
  }

  set daga(value: IMouse) {
    if (value) {
      this.mouse = value;
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
  
  props: IProperty = {
    key: '',
    id: '',
    value: this.mouse.xmouse.toString(),
    class: '',
    style: 'position:absolute;left:'+this.mouse.xmouse+'px; right:'+this.mouse.ymouse+'px',
    typeObj: 'button',
    type: 'button',
  };
  
}


