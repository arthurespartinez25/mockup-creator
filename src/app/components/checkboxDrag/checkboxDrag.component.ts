import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';

@Component({
  selector: 'app-checkboxDrag',
  templateUrl: './checkboxDrag.component.html',
  styleUrls: ['./checkboxDrag.component.css']
})
export class CheckboxDragComponent implements OnInit, IComponent {
  canvas: ElementRef;
  props: IProperty = {
    key: '',
    id: '',
    value: 'Checkbox',
    class: 'form-check-input',
    style: 'cursor: pointer;',
    typeObj: 'checkboxDrag',
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
    tmpHtmlCode += ' class="form-check" id="' + this.props.id + '">';
    tmpHtmlCode +="\n" + ' <input class="' +  this.props.class + '" type="' +  this.props.type + '" style="' + this.props.style + '" id="flexCheckDefault">';
    tmpHtmlCode +="\n" + ' <label class="form-check-label" for="flexCheckDefault"> ' + this.props.value + ' </label>';
    tmpHtmlCode +="\n" + ' </div>';
    

    return tmpHtmlCode;
  }

  ngOnInit(): void {
  }

}
