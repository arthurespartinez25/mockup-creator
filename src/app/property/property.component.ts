import { Component, Input, OnInit } from '@angular/core';
import { IProperty } from '../interfaces/iproperty';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
})
export class PropertyComponent implements OnInit {
  props: IProperty;

  @Input() get property(): IProperty {
    return this.props;
  }

  set property(value: IProperty) {
    if (value) {
      this.props = value;
    }
  }

  constructor() {
    this.props = this.property;
  }

  ngOnInit(): void {}

  idChangeHandler(event: any) {
    this.props.id = event.target.value;
  }

  valueChangeHandler(event: any) {
    this.props.value = event.target.value;
  }

  typeChangeHandler(event: any) {
    this.props.type = event.target.value;
  }

  styleChangeHandler(event: any) {
    this.props.style = event.target.value;
  }

  classChangeHandler(event: any) {
    this.props.class = event.target.value;
  }

  contentChangeHandler(event: any){
    this.props.content = event.target.value;
  }
}
