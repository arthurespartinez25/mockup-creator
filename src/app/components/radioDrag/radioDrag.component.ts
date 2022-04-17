import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';

@Component({
  selector: 'app-radioDrag',
  templateUrl: './radioDrag.component.html',
  styleUrls: ['./radioDrag.component.css']
})
export class RadioDragComponent implements OnInit,IComponent {
  canvas: ElementRef;
  compList: IComponent[]=[];
  props: IProperty = {
    key: '',
    id: '',
    value: 'RadioButton',
    class: '',
    style: '',
    typeObj: 'radioDrag',
    type: 'radio',
    draggable: true,
    selected : false,
    hidden: false,
    mouseDragPositionX:0,
    mouseDragPositionY:0,
    name: 'defaultName',
    checked: 'false',
    finalStyle:'',
    isSavedComponent: false
  };

  @Input() canvasPositionX: any;
  @Input() canvasPositionY: any;
  @Input() mousePositionX2: any;
  @Input() mousePositionY2: any;
  @Input() whatComponent2: any;
  @Input() isLoaded: boolean;
  canvasPositionLeft = 0;
  canvasPositionTop = 0;
  mousePositionLeft = 0;
  mousePositionTop = 0;
  percentageX = 0;
  percentageY = 0;


  ngOnInit(): void {
    if(this.props.isSavedComponent){
      this.mousePositionLeft = (this.props.mouseDragPositionX/100)*1280;
      this.mousePositionTop = (this.props.mouseDragPositionY/100)*720;
    }
    if(!this.props.isSavedComponent){
      this.canvasPositionLeft = this.canvasPositionX;
      this.canvasPositionTop = this.canvasPositionY;
      this.mousePositionLeft = this.mousePositionX2;
      this.mousePositionTop = this.mousePositionY2;
      this.percentageX = ((this.mousePositionX2 - this.canvasPositionLeft) / 1280) * 100;
      this.percentageY = ((this.mousePositionY2 - this.canvasPositionTop) / 720) * 100;
      this.props.mouseDragPositionX = this.percentageX;
      this.props.mouseDragPositionY = this.percentageY;
      this.props.style='text-decoration: none;position:absolute;left:'+this.percentageX+'%;top:'+this.percentageY+'%;';
      this.props.finalStyle=this.props.style;
    }
  }
  

  onDragEnded($event: CdkDragEnd) {
    this.props.finalStyle=this.props.style;
    let regexPosition = /;top(.+?);/g;
    let regexPosition2 = /;left(.+?);/g;
    this.props.mouseDragPositionX =
    (( $event.source.getFreeDragPosition().x+ this.mousePositionLeft - this.canvasPositionLeft) / 1280) 
    * 100;
    this.props.mouseDragPositionY =
    (( $event.source.getFreeDragPosition().y+ this.mousePositionTop - this.canvasPositionTop) / 720) 
    * 100;
    this.props.finalStyle=this.props.finalStyle.replace(regexPosition, ';top:'+this.props.mouseDragPositionY+'%;');
    this.props.finalStyle=this.props.finalStyle.replace(regexPosition2, ';left:'+this.props.mouseDragPositionX+'%;');
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
           console.log(this.compList[x].props.value + ":" + this.compList[x].props.checked);
          //this.compList[x].htmlCode;
        }
      }
    }

  if ( event.target.checked ) {
    this.props.checked = 'true';
  }

}


  get htmlCode(): string {
    let dummyStyle = this.props.style;
      let regexLeft = /;left(.+?);/g;
      let regexTop = /;top(.+?);/g;
      let regexPosition = /position(.+?);/;

      dummyStyle = dummyStyle.replace(regexLeft,"");
      dummyStyle = dummyStyle.replace(regexTop,"");
      dummyStyle = dummyStyle.replace(regexPosition,"");

    let tmpHtmlCode = '<div class="form-check '+this.props.class+'"'+ ' style="' + this.props.finalStyle +'"> \n <input';

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
      tmpHtmlCode += ' style="' + dummyStyle + '"';
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
