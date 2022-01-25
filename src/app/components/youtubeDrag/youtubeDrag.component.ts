import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';


@Component({
  selector: 'app-youtubeDrag',
  templateUrl: './youtubeDrag.component.html',
  styleUrls: ['./youtubeDrag.component.css']
})

export class YoutubeDragComponent implements OnInit, IComponent {
  constructor(canvas: ElementRef, public sanitizer:DomSanitizer) {
    this.canvas = canvas;
    let date = Date.now();
    this.props.key = date.toString();
    this.props.id = 'youtube' + date.toString();
    
   }

  canvas: ElementRef;
  url: SafeResourceUrl;

  
    props: IProperty = {
      key: '',
      id: '',
      value: 'https://www.youtube.com/embed/DrLYL9F3WV4?autoplay=1',
      class: '',
      style: '',
      typeObj: 'youtubeDrag',
      type: '',
      url : '',
      draggable: true,
      selected : false,
    };

    @Output() updateDataEvent = new EventEmitter<any>();
    @Output() updateDataEventY = new EventEmitter<any>();
    @Input() canvasPositionX: any;
    @Input() canvasPositionY: any;
    @Input() mousePositionX2: any;
    @Input() mousePositionY2: any;
    @Input() whatComponent2: any;
    mousePositionDropX = 310;
    mousePositionDropY = 110;
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
      this.percentageX = ((this.mousePositionX2 - this.canvasPositionLeft) / 1280) * 100;
      this.percentageY = ((this.mousePositionY2 - this.canvasPositionTop) / 720) * 100;
    
      this.props.value = 'https://www.youtube.com/embed/qY7rpWA-D4w?autoplay=1';
      this.props.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.props.value);
      this.props.style =
        'position:absolute;left:' +
        this.percentageX +
        '%;top:' +
        this.percentageY +
        '%;';
    
  }

  onDragEnded($event: CdkDragEnd) {
    this.mousePositionDropX = $event.source.getFreeDragPosition().x;
    this.mousePositionDropY = $event.source.getFreeDragPosition().y;
    this.updateDataEvent.emit(
      ((this.mousePositionDropX + this.mousePositionLeft - this.canvasPositionLeft) / 1280) * 100
    );
    this.updateDataEventY.emit(
      ((this.mousePositionDropY + this.mousePositionTop - this.canvasPositionTop) / 720) * 100
    );
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
      let tmpHtmlCode = '<iframe';
      tmpHtmlCode += ' class="' + this.props.class + '" id="' + this.props.id + '" type="' +  this.props.type + 
      '" style="' + this.props.style + '" src="' + this.props.value +'"'+
      ' title="YouTube video player" frameborder="0" allow="autoplay"  allowfullscreen dnd-droppable-iframe'+ '> </iframe>';
      
      return tmpHtmlCode;
    }

}
