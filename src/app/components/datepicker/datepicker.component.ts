import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Event } from '@angular/router';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';

@Component({
  selector: 'app-datepicker',
  //templateUrl: './datepicker.component.html',
  //styleUrls: ['./datepicker.component.css']
  template: `<input cdkDrag cdkDragBoundary="#canvas" [type]="props.type" [id]="props.id" [value]="props.value" (change)="dateValue($event)">`
})
export class DatepickerComponent implements OnInit,IComponent {
  canvas: ElementRef;
  props: IProperty = {
    key: '',
    id: '',
    value: '2021-12-25',
    class: '',
    style: '',
    typeObj: 'datepicker',
    type: 'date',
  };

  constructor(canvas: ElementRef) {
    this.canvas = canvas;
    let date = Date.now();
    this.props.key = date.toString();
    this.props.id = 'date' + date.toString();
  }

  ngOnInit(): void {
  }

  @Input() get property(): IProperty {
    return this.props;
  }

  set property(value: IProperty) {
    if (value) {
      this.props = value;
    }
  }

  dateValue(val: any){
      this.props.value = val.target.value;
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

    if (this.props.style.trim().length > 0) {
      tmpHtmlCode += ' style="' + this.props.style + '"';
    }

    if(this.props.value.trim().length > 0){
      tmpHtmlCode += ' value="' + this.props.value + '"';
    }

    //tmpHtmlCode += '>' + this.props.value + '</input>';
    tmpHtmlCode += '>';

    return tmpHtmlCode;
  }
}