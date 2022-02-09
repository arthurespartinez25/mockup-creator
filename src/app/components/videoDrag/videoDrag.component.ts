import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';

@Component({
  selector: 'app-videoDrag',
  templateUrl: './videoDrag.component.html',
  styleUrls: ['./videoDrag.component.css']
})
export class VideoDragComponent implements OnInit, IComponent {

  constructor(canvas: ElementRef, public sanitizer:DomSanitizer) {
    this.canvas = canvas;
    let date = Date.now();
    this.props.key = date.toString();
    this.props.id = 'video' + date.toString();
    
   }

   canvas: ElementRef;
   url: SafeResourceUrl;
 
   
     props: IProperty = {
       key: '',
       id: '',
       value: '',
       class: '',
       style: '',
       typeObj: 'videoDrag',
       type: '',
       url : '',
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
       this.props.mouseDragPositionX = this.percentageX;
       this.props.mouseDragPositionY = this.percentageY;
       this.props.value = 'https://www.w3schools.com/html/movie.mp4';
       this.props.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.props.value);;       
       this.props.style = '';
       this.props.type = 'video/mp4';
      //  this.props.style =
      //    'position:absolute;left:' +
      //    this.percentageX +
      //    '%;top:' +
      //    this.percentageY +
      //    '%;height:316px;width:686px;';
     
   }
 
   onDragEnded($event: CdkDragEnd) {
     this.props.mouseDragPositionX =
     (( $event.source.getFreeDragPosition().x+ this.mousePositionLeft - this.canvasPositionLeft) / 1280) 
     * 100;
     this.props.mouseDragPositionY =
     (( $event.source.getFreeDragPosition().y+ this.mousePositionTop - this.canvasPositionTop) / 720) 
     * 100;
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
      let tmpHtmlCode = '<video';
      tmpHtmlCode += ' class="' + this.props.class + '" id="' + this.props.id + '" type="' +  this.props.type + 
      '" style="' + this.props.style + '" src="' + this.props.url+ '></video>';
       return tmpHtmlCode;
     }

}
