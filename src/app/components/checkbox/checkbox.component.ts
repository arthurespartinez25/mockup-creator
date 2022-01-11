import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit, IComponent {
  val: string;
  canvas: ElementRef;
  props: IProperty = {
    key: '',
    id: '',
    value: 'Checkbox',
    class: 'form-check-input',
    style: '',
    typeObj: 'checkbox',
    type: 'checkbox',
    checked: 'true',
  };

  @Output() updateDataEvent= new EventEmitter<any>();
  @Output() updateDataEventY= new EventEmitter<any>();
  @Input() xcanvas: any;
  @Input() ycanvas: any;
  mousePositionXV2 = 310;
  mousePositionYV2= 110;
  theX = 0;
  theY = 0;

  ngOnInit(): void {
    //this.drag.createDrag(this.ref).withBoundaryElement(this.canvas);
    this.theX = this.xcanvas;
    this.theY = this.ycanvas;
  }

  onDragEnded($event: any){
    this.mousePositionXV2 = $event.source.getFreeDragPosition().x;
    this.mousePositionYV2 = $event.source.getFreeDragPosition().y;
    
    this.updateDataEvent.emit(this.mousePositionXV2);
    this.updateDataEventY.emit(this.mousePositionYV2);
  }

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
  
  isChecked(event) {
    if ( event.target.checked ) {
      this.props.checked = "true";
      console.log(this.props.checked);
    }
    else {
      this.props.checked = "false";
      console.log(this.props.checked);
    }
  }

  get htmlCode(): string {
    let jude = this.props.style;
      let regexLeft = /left(.+?);/;
      let regexTop = /top(.+?);/;
      let regexPosition = /position(.+?);/;
      let styleLeft = jude.match(/left(.+?);/g);
      let styleTop = jude.match(/top(.+?);/g);
      console.log(styleLeft);
      console.log(jude);

      //let divStyle = '"style=position:absolute;left:'+this.dagaX+'px;top:'+this.dagaY+'px;"';

      jude = jude.replace(regexLeft,"");
      jude = jude.replace(regexTop,"");
      jude = jude.replace(regexPosition,"");
    let tmpHtmlCode = '<div';
    tmpHtmlCode += ' class="form-check" id="' + this.props.id + '"style="' + this.props.style +'">';
    
    if (this.props.checked == "true") {
      tmpHtmlCode +="\n" + ' <input id="'+ this.props.id + ' class="' +  this.props.class + '" type="' +  this.props.type + '" style="' + jude + '" id="flexCheckDefault" checked>';
    }
    else {
      tmpHtmlCode +="\n" + ' <input id="'+ this.props.id + ' class="' +  this.props.class + '" type="' +  this.props.type + '" style="' + jude + '" id="flexCheckDefault">';
    }
    
    
    tmpHtmlCode +="\n" + ' <label class="form-check-label" for="flexCheckDefault"> ' + this.props.value + ' </label>';
    tmpHtmlCode +="\n" + ' </div>';
    

    return tmpHtmlCode;
  }


  

}