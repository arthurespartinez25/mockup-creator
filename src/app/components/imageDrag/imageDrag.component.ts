import { Component, ElementRef, Input, OnInit } from '@angular/core';
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
      value: '',
      class: 'img-rounded',
      style: '',
      typeObj: 'imgDrag',
      type: '',
    };

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
      tmpHtmlCode += ' class="' + this.props.class + '" id="' + this.props.id + '" type="' +  this.props.type + '" style="' + this.props.style + '" src = "https://mdbootstrap.com/img/new/standard/city/047.jpg">' + this.props.value + ' </img>';
      
      return tmpHtmlCode;
    }

    ngOnInit(): void {
    }
}
