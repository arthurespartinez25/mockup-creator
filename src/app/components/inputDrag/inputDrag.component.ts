import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';

@Component({
  selector: 'app-inputDrag',
  templateUrl: './inputDrag.component.html',
  styleUrls: ['./inputDrag.component.css']
})
export class InputDragComponent implements OnInit, IComponent {
  canvas: ElementRef;
  props: IProperty = {
    key: '',
    id: '',
    value: '',
    placeholder: 'Input field',
    class: 'form-control',
    style: 'width:200px;',
    typeObj: 'inputDrag',
    type: 'text',
  };

  constructor(canvas: ElementRef) {
    this.canvas = canvas;
    let date = Date.now();
    this.props.key = date.toString();
    this.props.id = 'input' + date.toString();
   }

  @Input() get property(): IProperty {
    return this.props;
  }

  set property(value: IProperty) {
    if (value) {
      this.props = value;
    }
  }

  set textInput(val:string){
    this.props.value = val;
  }

  get htmlCode(): string {
    let tmpHtmlCode = '<input';
    if (this.props.id.trim().length > 0) {
      tmpHtmlCode += ' id="' + this.props.id + '"';
    }

    if (this.props.type.trim().length > 0) {
      tmpHtmlCode += ' type="' + this.props.type + '"';
    }

    if (this.props.class.trim().length > 0) {
      tmpHtmlCode += ' class="' + this.props.class + '"';
    }

    if (this.props.value.trim().length > 0) {
      tmpHtmlCode += ' value="' + this.props.value + '"';
    }

    if (this.props.style.trim().length > 0) {
      tmpHtmlCode += ' style="' + this.props.style + '"';
    }

    tmpHtmlCode += ' placeholder="' + this.props.placeholder + '">';

    return tmpHtmlCode;
  }

  ngOnInit(): void {
  }

}
