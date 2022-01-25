import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
    class: '',
    style: 'cursor: pointer;',
    typeObj: 'checkboxDrag',
    type: 'checkbox',
    checked: 'true',
    draggable: true,
    selected : false,
    hidden: false,
  };

  @Output() updateDataEvent= new EventEmitter<any>();
  @Output() updateDataEventY= new EventEmitter<any>();
  @Input() xcanvas: any;
  @Input() ycanvas: any;
  @Input() xmouse: any;
  @Input() ymouse: any;
  @Input() whatComponent2:any;
  mousePositionXV2 = 310;
  mousePositionYV2= 110;
  theX = 0;
  theY = 0;
  dagaX = 0;
  dagaY = 0;
  onetimeBool = true;
  percentageX = 0;
  percentageY = 0;

  ngOnInit(): void {
    this.theX = this.xcanvas;
    this.theY = this.ycanvas;
    this.dagaX = this.xmouse;
    this.dagaY = this.ymouse;
    this.percentageX = ((this.xmouse-this.theX)/1280)*100; 
    this.percentageY = ((this.ymouse-this.theY)/720)*100;
    if(this.whatComponent2=="LoginCheckbox")
    {
      this.props.value = "Remember Password";
      this.props.style='color:green;cursor: pointer;position:sticky;left:'+this.percentageX+'%;top:'+this.percentageY+'%;';
    
    }
    else
    {
      this.props.style='cursor:pointer;position:sticky;left:'+this.percentageX+'%;top:'+this.percentageY+'%;';
    }
  }
  


  onDragEnded($event: CdkDragEnd){
    this.mousePositionXV2 = $event.source.getFreeDragPosition().x;
    this.mousePositionYV2 = $event.source.getFreeDragPosition().y;
    this.updateDataEvent.emit(((this.mousePositionXV2 + this.dagaX - this.theX)/1280)*100);
    this.updateDataEventY.emit(((this.mousePositionYV2 + this.dagaY - this.theY)/720)*100);
    console.log(this.mousePositionXV2);
    console.log(this.mousePositionYV2);
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
      // let styleLeft = jude.match(/left(.+?);/g);
      // let styleTop = jude.match(/top(.+?);/g);
      // console.log(styleLeft);
      // console.log(jude);

      //let divStyle = '"style=position:absolute;left:'+this.dagaX+'px;top:'+this.dagaY+'px;"';

      jude = jude.replace(regexLeft,"");
      jude = jude.replace(regexTop,"");
      jude = jude.replace(regexPosition,"");
      //this.props.style = jude;
    let tmpHtmlCode = '<div';
    tmpHtmlCode += ' style="' + this.props.style +'">';
    if (this.props.checked == "true") {
      tmpHtmlCode +="\n" + ' <input id="'+ this.props.id + '" class="' +  this.props.class + '" type="' +  this.props.type + '" checked>';
    }
    else {
      tmpHtmlCode +="\n" + ' <input id="'+ this.props.id + '" class="' +  this.props.class + '" type="' +  this.props.type + '">';
    }
    tmpHtmlCode +="\n" + ' <label for="'+ this.props.id +'" style="'+ jude +'"> ' + this.props.value + ' </label>';
    tmpHtmlCode +="\n" + ' </div>';
    

    return tmpHtmlCode;
  }

 

}