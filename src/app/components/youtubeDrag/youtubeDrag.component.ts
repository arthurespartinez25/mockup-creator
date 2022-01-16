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

  updateSrc2 = (rawr) => {
    // let regexPosition = /https(.+?)"/;
    // let link:any = null;
    // link = rawr.match(regexPosition);
    // //link = link!.slice(0, -1);
    // link[0] = link[0].slice(0, -1); 
    // this.props.value = link[0];
    // this.url = this.sanitizer.bypassSecurityTrustResourceUrl(link[0]);
    // console.log(this.url);
    this.updateSrc();
    document.getElementById('btn')?.click;
  }
    props: IProperty = {
      key: '',
      id: '',
      value: 'https://www.youtube.com/embed/DrLYL9F3WV4?autoplay=1',
      class: '',
      style: '',
      typeObj: 'youtubeDrag',
      type: '',
      linkSend: this.updateSrc2,
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
    console.log(this.dagaX+"     "+this.dagaY);
    if(this.whatComponent2=="sampleImage")
    {
      this.props.value = "https://dlcdnrog.asus.com/rog/media/1610273282904.jpg";
      this.props.style='position:absolute;left:'+(this.dagaX-this.theX)+'px;top:'+(this.dagaY-this.theY)+'px;';
    }
    else
    {
      this.props.value = 'https://www.youtube.com/embed/qY7rpWA-D4w?autoplay=1';
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.props.value);
      this.props.style='position:absolute;left:'+(this.dagaX-this.theX)+'px;top:'+(this.dagaY-this.theY)+'px;width:300px;height: 200px;';
    }
  }

  onDragEnded($event: CdkDragEnd){
    this.mousePositionXV2 = $event.source.getFreeDragPosition().x;
    this.mousePositionYV2 = $event.source.getFreeDragPosition().y;
    this.updateDataEvent.emit(this.mousePositionXV2 + this.dagaX - this.theX);
    this.updateDataEventY.emit(this.mousePositionYV2 + this.dagaY - this.theY);
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
      '" style="' + this.props.style + '" src = " ' + this.props.value +
      ' title="YouTube video player" frameborder="0" allow="autoplay"  allowfullscreen dnd-droppable-iframe'+ '"> </iframe>';
      
      return tmpHtmlCode;
    }

    updateSrc()
    {
       let regexPosition = /https(.+?)"/;
       let link:any = null;
       link = this.props.value.match(regexPosition);
       //link = link!.slice(0, -1);
       link[0] = link[0].slice(0, -1); 
       this.props.value = link[0];
       console.log(link);
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.props.value);
    }
    // updateSrc2(value)
    // {
    //   let regexPosition = /https(.+?)"/;
    //   let link:any = null;
    //   link = value.match(regexPosition);
    //   //link = link!.slice(0, -1);
    //   link[0] = link[0].slice(0, -1); 
    //   console.log(link[0])
    //   //this.props.value = link[0];
    //   console.log(link);
    //   this.url = this.sanitizer.bypassSecurityTrustResourceUrl(link[0]);
    // }
    

    
}
