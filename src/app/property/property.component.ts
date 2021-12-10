import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComponent } from '../interfaces/icomponent';
import { IProperty } from '../interfaces/iproperty';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
})
export class PropertyComponent implements OnInit {
  props: IProperty;
  delete:boolean;

  @Input() get property(): IProperty {
    return this.props;
  }
  @Output() messageEvent = new EventEmitter<boolean>();

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

  placeholderChangeHandler(event: any) {
    this.props.placeholder = event.target.value;
  }

  rowsChangeHandler(event: any) {
    this.props.rows = event.target.value;
  }

  colsChangeHandler(event: any) {
    this.props.cols = event.target.value;
  }
  nameChangeHandler(event: any) {
    this.props.name = event.target.value;
  }

  
  removeElement() {
    this.delete = true;
    this.messageEvent.emit(this.delete);
  }
}
