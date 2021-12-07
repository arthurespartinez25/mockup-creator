import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit, IComponent {
  canvas: ElementRef;
  props: IProperty = {
    key: '',
    id: '',
    value: 'Checkbox',
    class: 'form-check-input',
    style: 'cursor: pointer;',
    typeObj: 'checkbox',
    type: 'checkbox',
  };


  constructor(canvas: ElementRef) {
    this.canvas = canvas;
    let date = Date.now();
    this.props.key = date.toString();
    this.props.id = 'checkbox' + date.toString();
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
    let tmpHtmlCode = '<div';

    return tmpHtmlCode;
  }

  ngOnInit(): void {
  }

}
