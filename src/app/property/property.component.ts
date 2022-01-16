import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
  style2 = '';
  

  @Input() get property(): IProperty {
    
    return this.props;
  }

  set property(value: IProperty) {
    if (value) {
      this.props = value;
      this.style2 = this.props.style;
      let regexPosition = /position(.+?);/;
      let regexPosition2 = /top(.+?);/;
      let regexPosition3 = /left(.+?);/;
      this.style2 = this.style2.replace(regexPosition, '');
      this.style2 = this.style2.replace(regexPosition2, '');
      this.style2 = this.style2.replace(regexPosition3, '');
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

  ngOnInit(): void {
    this.style2 = this.props.style;
  }

  idChangeHandler(event: any) {
    this.props.id = event.target.value;
  }

  valueChangeHandler(event: any) {
    this.props.value = event.target.value;
    if (event.code === "Enter" && this.props.typeObj =="youtubeDrag") {  //checks whether the pressed key is "Enter"
      if (this.props.linkSend) {
        const { linkSend } = this.props;
        linkSend(this.props.value);
      }
  }
  }

  typeChangeHandler(event: any) {
    this.props.type = event.target.value;
  }

  styleChangeHandler(event: any) {
    let x = event.target.value;
    //this.props.style = event.target.value;

    let regexPosition = /position(.+?);/;
    let regexPosition2 = /top(.+?);/;
    let regexPosition3 = /left(.+?);/;
    let position = 'position:sticky;';
    let position2 = this.props.style.match(regexPosition2);
    let position3 = this.props.style.match(regexPosition3);
    this.props.style = event.target.value+position+position2![0]+position3![0];
    
    
  }
  @ViewChild('taID') styleText!: ElementRef;
  styleChangeHandler2(event: any) {
    let regexPosition = /position(.+?);/;
    let regexPosition2 = /top(.+?);/;
    let regexPosition3 = /left(.+?);/;
    this.style2 = this.style2.replace(regexPosition, '');
    this.style2 = this.style2.replace(regexPosition2, '');
    this.style2 = this.style2.replace(regexPosition3, '');
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
  linksChangeHandler(event: any) {
    this.props.links = event.target.value;
  }
  linkValueChangeHandler(event: any) {
    this.props.linkValue = event.target.value;
  }
  checkedChangeHandler(event: any) {
    this.props.checked = event.target.value;
  }
  /* CODE BELOW IS FOR TABLE ELEMENT */

  tblRowsChangeHandler(event: any) {
    this.props.tblRows = event.target.value;

    if (this.props.updateCallback) {
      const { updateCallback } = this.props;
      updateCallback(this.props.tblRows, this.props.tblCols);
    }
  }
  tblColsChangeHandler(event: any) {
    this.props.tblCols = event.target.value;
    if (this.props.updateCallback) {
      const { updateCallback } = this.props;
      updateCallback(this.props.tblRows, this.props.tblCols);
    }
  }
  /* END OF CODE FOR TABLE ELEMENT */
}
