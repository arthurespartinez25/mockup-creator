import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IPosition } from 'src/app/interfaces/iposition';
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
  @Input() pixelPosition: IPosition[] = [];

  @Output() updatePixelPositionEvent = new EventEmitter<IPosition[]>();

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
    let index = this.pixelPosition.map(object => object.key).indexOf(this.props.id);
    let prevMouseDragPosY = (this.props.mouseDragPositionY/100)*720;
    let prevMouseDragPosX = (this.props.mouseDragPositionX/100)*1280;
    if ((((this.props.mouseDragPositionY/100)*720) == this.pixelPosition[index].pos.pixelPositionY) && ((this.props.mouseDragPositionX/100) * 1280) == this.pixelPosition[index].pos.pixelPositionX) {
      //this function checks if the hide button has been clicked or not. If the mouseDragPosition pixel values and the corresponding pixelPosition values
      //in the pixelPosition array are equal to each other, then this means that the component has not yet been hidden. 
      this.pixelPosition[index].pos.pixelPositionX = 0;
      this.pixelPosition[index].pos.pixelPositionY = 0;
      prevMouseDragPosY = 0;
      prevMouseDragPosX = 0;
    }
    this.props.mouseDragPositionX =
    (( $event.source.getFreeDragPosition().x+ this.mousePositionLeft - this.canvasPositionLeft) / 1280) 
    * 100;
    this.props.mouseDragPositionY =
    (( $event.source.getFreeDragPosition().y+ this.mousePositionTop - this.canvasPositionTop) / 720) 
    * 100;
    //this section handles the changes in the X axis of the component, and stores them into the pixelPosition array accordingly
    if ((this.pixelPosition[index].pos.pixelPositionX! + (this.props.mouseDragPositionX/100)*1280) < this.pixelPosition[index].pos.pixelPositionX!) {
      this.pixelPosition[index].pos.pixelPositionX! -= prevMouseDragPosX;
      if (this.props.mouseDragPositionX >= 0) {
        this.pixelPosition[index].pos.pixelPositionX = this.pixelPosition[index].pos.pixelPositionX! - ((this.props.mouseDragPositionX/100)*1280);
      } else {
        this.pixelPosition[index].pos.pixelPositionX = this.pixelPosition[index].pos.pixelPositionX! + ((this.props.mouseDragPositionX/100)*1280);
      }
    } else {
      this.pixelPosition[index].pos.pixelPositionX! -= prevMouseDragPosX;
      this.pixelPosition[index].pos.pixelPositionX = this.pixelPosition[index].pos.pixelPositionX! + ((this.props.mouseDragPositionX/100)*1280);
    }
    //this section handles the changes in the Y axis of the component, and stores them into the pixelPosition array accordingly
    if ((this.pixelPosition[index].pos.pixelPositionY! + (this.props.mouseDragPositionY/100)*720) < this.pixelPosition[index].pos.pixelPositionY!) {
      this.pixelPosition[index].pos.pixelPositionY! -= prevMouseDragPosY;
      if (this.props.mouseDragPositionY >= 0) {
        this.pixelPosition[index].pos.pixelPositionY = this.pixelPosition[index].pos.pixelPositionY! - ((this.props.mouseDragPositionY/100)*720);
      } else {
        this.pixelPosition[index].pos.pixelPositionY = this.pixelPosition[index].pos.pixelPositionY! + ((this.props.mouseDragPositionY/100)*720);
      }
    } else {
      this.pixelPosition[index].pos.pixelPositionY! -= prevMouseDragPosY;
      this.pixelPosition[index].pos.pixelPositionY = this.pixelPosition[index].pos.pixelPositionY! + ((this.props.mouseDragPositionY/100)*720);
    }
    this.updatePixelPositionEvent.emit(this.pixelPosition);
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
      let dummyStyle = this.props.style;
      let regexLeft = /left(.+?);/;
      let regexTop = /top(.+?);/;
      let regexPosition = /position(.+?);/;
      dummyStyle = dummyStyle.replace(regexLeft,"");
      dummyStyle = dummyStyle.replace(regexTop,"");
      dummyStyle = dummyStyle.replace(regexPosition,"");
    let tmpHtmlCode = '<div';
    tmpHtmlCode += ' style="' + this.props.style +'">';
    if (this.props.checked == "true") {
      tmpHtmlCode +="\n" + ' <input id="'+ this.props.id + '" class="' +  this.props.class + '" type="' +  this.props.type + '" checked>';
    }
    else {
      tmpHtmlCode +="\n" + ' <input id="'+ this.props.id + '" class="' +  this.props.class + '" type="' +  this.props.type + '">';
    }
    tmpHtmlCode +="\n" + ' <label for="'+ this.props.id +'" style="'+ dummyStyle +'"> ' + this.props.value + ' </label>';
    tmpHtmlCode +="\n" + ' </div>';
    

    return tmpHtmlCode;
  }

 

}