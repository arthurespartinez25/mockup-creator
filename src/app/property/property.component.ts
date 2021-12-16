import { Component, Input, OnInit } from '@angular/core';
import { IComponent } from '../interfaces/icomponent';
import { IProperty } from '../interfaces/iproperty';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css'],
})
export class PropertyComponent implements OnInit {
  props: IProperty;
  componentList: IComponent[] = [];
  selectedcomp: IComponent;
  defaultProps: IProperty = {
    key: '',
    id: '',
    value: '',
    class: '',
    style: '',
    typeObj: '',
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

  @Input() get compList() {
    return this.componentList;
  }
  set compList(value: IComponent[]) {
    this.componentList = value;
  }

  @Input() get selectedIdx() {
    return this.selectedcomp;
  }
  set selectedIdx(value: IComponent) {
    this.selectedcomp = value;
  }

  constructor() {
    this.props = this.property;
    this.componentList = this.compList;
    this.selectedcomp = this.selectedIdx;
  }

  deleteComponent() {
    let componentIndex = this.componentList.indexOf(this.selectedcomp);
    if (componentIndex !== -1) {
      this.componentList.splice(componentIndex, 1);
      this.props = this.defaultProps;
    }
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

  contentChangeHandler(event: any) {
    this.props.content = event.target.value;
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
  link1ChangeHandler(event: any) {
    this.props.link1 = event.target.value;
  }
  link2ChangeHandler(event: any) {
    this.props.link2 = event.target.value;
  }
  link3ChangeHandler(event: any) {
    this.props.link3 = event.target.value;
  }
  checkedChangeHandler(event: any) {
    this.props.checked = event.target.value;
  }
}
