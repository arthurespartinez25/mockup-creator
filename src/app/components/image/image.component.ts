import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})

export class ImageComponent implements OnInit, IComponent {
  canvas: ElementRef;
    props: IProperty = {
      key: '',
      id: '',
      value: 'https://mdbootstrap.com/img/new/standard/city/047.jpg',
      class: 'img-rounded',
      style: 'max-width: 600px;height: 200px;position:absolute;left:0px;top:0px;',
      typeObj: 'img',
      type: '',
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
