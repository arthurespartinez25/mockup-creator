import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';

@Component({
  selector: 'app-imageDrag',
  templateUrl: './imageDrag.component.html',
  styleUrls: ['./imageDrag.component.css']
})

export class ImageDragComponent implements OnInit, IComponent {
  canvas: ElementRef;
    props: IProperty = {
      key: '',
      id: '',
      value: 'https://mdbootstrap.com/img/new/standard/city/047.jpg',
      class: 'img-rounded',
      style: '',
      typeObj: 'imgDrag',
      type: '',
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

  ngOnInit(): void {
    this.theX = this.xcanvas;
    this.theY = this.ycanvas;
    this.dagaX = this.xmouse;
    this.dagaY = this.ymouse;
    if(this.whatComponent2=="sampleImage")
    {
      this.props.value = "https://dlcdnrog.asus.com/rog/media/1610273282904.jpg";
      this.props.style='position:absolute;left:'+(this.dagaX-this.theX)+'px;top:'+(this.dagaY-this.theY)+'px;';
    }
    else
    {
      this.props.value = "https://mdbootstrap.com/img/new/standard/city/047.jpg";
      this.props.style='max-width: 600px;height: 200px;position:absolute;left:'+(this.dagaX-this.theX)+'px;top:'+(this.dagaY-this.theY)+'px;';
    }
  }

  onDragEnded($event: CdkDragEnd){
    this.mousePositionXV2 = $event.source.getFreeDragPosition().x;
    this.mousePositionYV2 = $event.source.getFreeDragPosition().y;
    this.updateDataEvent.emit(this.mousePositionXV2 + this.dagaX - this.theX);
    this.updateDataEventY.emit(this.mousePositionYV2 + this.dagaY - this.theY);
  }

    constructor(canvas: ElementRef) {
      this.canvas = canvas;
      let date = Date.now();
      this.props.key = date.toString();
      this.props.id = 'img' + date.toString();
     }
     
     @Input() get property(): IProperty {
      return this.props;
    }
  
    set property(value: IProperty) {
      if (value) {
        this.props = value;
      }
    }
  
    get htmlCode(): string {
      let tmpHtmlCode = '<img';
      tmpHtmlCode += ' class="' + this.props.class + '" id="' + this.props.id + '" type="' +  this.props.type + 
      '" style="' + this.props.style + '" src = " ' + this.props.value + '"> </img>';
      
      return tmpHtmlCode;
    }

    
}
