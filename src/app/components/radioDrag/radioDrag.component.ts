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
    name: 'defaultName',
    checked: 'false',
    draggable: true,
    selected : false,
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


  ngOnInit(): void {
    this.canvasPositionLeft = this.canvasPositionX;
    this.canvasPositionTop = this.canvasPositionY;
    this.mousePositionLeft = this.mousePositionX2;
    this.mousePositionTop = this.mousePositionY2;
    this.percentageX = ((this.mousePositionX2 - this.canvasPositionLeft));
    this.percentageY = ((this.mousePositionY2 - this.canvasPositionTop));
    this.props.mouseDragPositionX = this.percentageX;
    this.props.mouseDragPositionY = this.percentageY;
    this.props.style='text-decoration: none;position:sticky;left:'+this.percentageX+'px;top:'+this.percentageY+'px;';
   
  }
  

  onDragEnded($event: CdkDragEnd) {
    this.props.mouseDragPositionX =
    (( $event.source.getFreeDragPosition().x+ this.mousePositionLeft - this.canvasPositionLeft));
    this.props.mouseDragPositionY =
    (( $event.source.getFreeDragPosition().y+ this.mousePositionTop - this.canvasPositionTop));
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

    let tmpHtmlCode = '<div class="form-check"'+ ' style="' + this.props.style +'"> \n <input';
   
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
      tmpHtmlCode += ' style="' + jude + '"';
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
