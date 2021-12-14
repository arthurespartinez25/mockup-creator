import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})
export class RadioComponent implements OnInit,IComponent {
  canvas: ElementRef;
  compList: IComponent[]=[];
  props: IProperty = {
    key: '',
    id: '',
    value: 'RadioButton',
    class: 'form-check-input',
    style: '',
    typeObj: 'radio',
    type: 'radio',
    name: 'defaultName',
    checked: 'false',
  };

  ngOnInit(): void {
  }

  constructor(canvas: ElementRef) {
    this.canvas = canvas;
    let date = Date.now();
    this.props.key = date.toString();
    this.props.id = 'radio' + date.toString();
  }
  

  @Input() get property(): IProperty {
    return this.props;
  }

  set property(value: IProperty) {
    if (value) {
      this.props = value;
    }
  }
  
  @Input() get componentList(): IComponent[]{
    return this.compList;
  }

  set componentList(value: IComponent[]){
    this.compList = value;
  }

  isChecked(event : any) {
    for(let x=0; x <this.compList.length; x++){
      if(this.compList[x].props.typeObj == 'radio' || this.compList[x].props.typeObj == 'radioDrag'){
        if(this.compList[x].props.name == this.props.name){
          this.compList[x].props.checked = 'false';
          // console.log(this.compList[x].props.value + ":" + this.compList[x].props.checked);
          //this.compList[x].htmlCode;
        }
      }
    }

  if ( event.target.checked ) {
    this.props.checked = 'true';
  }

}


  get htmlCode(): string {
    let tmpHtmlCode = '<div class="form-check"> \n <input';
   
    if (this.props.class.trim().length > 0) {
      tmpHtmlCode += ' class="' + this.props.class + '"';
    }

    if (this.props.type.trim().length > 0) {
      tmpHtmlCode += ' type="' + this.props.type + '"';
    }

    if (this.props.name!=undefined){
      if(this.props.name.trim().length > 0){
        tmpHtmlCode += ' name="' + this.props.name + '"';
      }
    }

    if (this.props.id.trim().length > 0) {
      tmpHtmlCode += ' id="' + this.props.id + '"';
    }

    if (this.props.style.trim().length > 0) {
      tmpHtmlCode += ' style="' + this.props.style + '"';
    }

      if (this.props.checked == "true"){
      tmpHtmlCode += ' checked'
    }else{
     tmpHtmlCode=tmpHtmlCode.replace(' checked','');
    }

    //for label part
    tmpHtmlCode += '> \n <label class="form-check-label';
    if (this.props.id.trim().length > 0) {
      tmpHtmlCode += ' for="' + this.props.id + '"';
    }
    tmpHtmlCode += '>' + this.props.value + '</label>\n</div>';

    return tmpHtmlCode;
  }

}
