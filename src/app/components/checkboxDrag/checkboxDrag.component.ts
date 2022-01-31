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
    mouseDragPositionX:0,
    mouseDragPositionY:0,
  };

  @Input() canvasPositionX: any;
  @Input() canvasPositionY: any;
  @Input() mousePositionX2: any;
  @Input() mousePositionY2: any;
  @Input() whatComponent2: any;
  canvasPositionLeft = 0;
  canvasPositionTop = 0;
  mousePositionLeft = 0;
  mousePositionTop = 0;
  percentageX = 0;
  percentageY = 0;
  checked = this.props.checked;


  ngOnInit(): void {
    this.canvasPositionLeft = this.canvasPositionX;
    this.canvasPositionTop = this.canvasPositionY;
    this.mousePositionLeft = this.mousePositionX2;
    this.mousePositionTop = this.mousePositionY2;
    this.percentageX = ((this.mousePositionX2 - this.canvasPositionLeft) / 1280) * 100;
    this.percentageY = ((this.mousePositionY2 - this.canvasPositionTop) / 720) * 100;
    this.props.mouseDragPositionX = this.percentageX;
    this.props.mouseDragPositionY = this.percentageY;
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
  


  onDragEnded($event: CdkDragEnd) {
    this.props.mouseDragPositionX =
    (( $event.source.getFreeDragPosition().x+ this.mousePositionLeft - this.canvasPositionLeft) / 1280) 
    * 100;
    this.props.mouseDragPositionY =
    (( $event.source.getFreeDragPosition().y+ this.mousePositionTop - this.canvasPositionTop) / 720) 
    * 100;
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
      this.checked = value.checked;
    }
  }

  chkLowerCase = (str) => {
    console.log(str);
  }
  

  isChecked(event) {
    if ( event.target.checked ) {
      this.props.checked = "true";
    }
    else {
      this.props.checked = "false";
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